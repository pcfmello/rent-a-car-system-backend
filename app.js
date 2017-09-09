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
    descricao: String
  }));

});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




app.get('/reservas', function(req, res) {
    res.json([
      {
        local : 'Centro',
        carro : 'Golf',
        dataInicio : '12/02/2012',
        dataFim : '15/12/2012',
        responsavel : 'Lucas',
        descricao : 'Alugado para passeio'

      },

      {
        local : 'Sul',
        carro : 'Logan',
        dataInicio : '25/05/2015',
        dataFim : '15/12/2018',
        responsavel : 'Paulo',
        descricao : 'Alugado para trabalho'

      },

      {
        local : 'Norte',
        carro : 'Pali Weekend',
        dataInicio : '09/11/2013',
        dataFim : '15/12/2015',
        responsavel : 'Naiara',
        descricao : 'Alugado para férias'
      }
    ])
});

app.get('/filiais', function(req, res) {
    res.json([
      {
        local: 'Florianópolis',
        filial: 'Capoeiras'
      },
      {
        local: 'Florianópolis',
        filial: 'Centro'
      },
      {
        local: 'Londrina',
        filial: 'Centro'
      },
      {
        local: 'Londrina',
        filial: 'Gleba Palhano'
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
  console.log(req.body);
  new Reserva({
    local: req.body.local,
    carro: req.body.carro,
    dataInicio: req.body.dataInicio,
    dataFim: req.body.dataFim,
    responsavel: req.body.responsavel,
    cafe: req.body.cafe,
    descricao: req.body.descricao
  }).save(function(error, reserva) {
    if(error) {
      res.json({ error: 'Não foi possivel salvar a reserva.'})
    } else {
      res.json(reserva)
    }
  });
});

app.listen(5000);
