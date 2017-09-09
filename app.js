var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var app = express();

// IMPORTA O MONGOOSE E O CONECTA COM O BD MONGODB
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rent_a_car');
var db = mongoose.connection;
// TRATAMENTO DE ERRO DE CONEXÃO
db.on('error', console.error.bind(console, 'Erro ao conectar no banco de dados.'));

// SCHEMAS DO MONGODB
db.once('open', function() {

  // SCHEMA DE RESERVAS
  Reserva = mongoose.model('Reserva', mongoose.Schema({
    local: Object,
    carro: String,
    dataInicio: Date,
    dataFim: Date,
    responsavel: String,
    cafe: Boolean,
    quantidadePessoas: Number,
    descricao: String,
    criadoEm: Date
  }));

});

app.use(cors());

// BODY PARSER CONVERTE OS DADOS EM JSON PARA RETORNO
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/reservas', function(req, res) {
  Reserva.find({}, function(error, reservas) {
    if(error) {
      res.json({ error: 'Não foi possivel retornar suas reservas' });
    } else {
      res.json(reservas);
    }
  });
});

app.get('/filiais', function(req, res) {
    res.json([
      {
        local: 'Florianópolis-SC',
        filial: 'Aeroporto Hercílio Luz'
      },
      {
        local: 'Curitiba-PR',
        filial: 'Rodoferroviária de Curitiba'
      },
      {
        local: 'Londrina',
        filial: 'Catuaí Shopping Center'
      },
      {
        local: 'Balneário Camboriú',
        filial: 'Avenida Atlântica'
      }
    ]);
});

app.get('/carros', function(req, res) {
    res.json([
      'Renault Logan',
      'Volkswagem Jetta',
      'Fiat Punto'
    ]);
});

app.post('/reservas', function(req, res) {
  new Reserva({
    local: req.body.local,
    carro: req.body.carro,
    dataInicio: req.body.dataInicio,
    dataFim: req.body.dataFim,
    responsavel: req.body.responsavel,
    cafe: req.body.cafe,
    quantidadePessoas: req.body.quantidadePessoas,
    descricao: req.body.descricao,
    criadoEm: new Date()
  }).save(function(error, reserva) {
    if(error) {
      res.json({ error: 'Não foi possivel salvar a reserva.'})
    } else {
      res.json(reserva)
    }
  });
});

app.listen(5000);
