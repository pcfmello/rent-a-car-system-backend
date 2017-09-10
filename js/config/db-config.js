// IMPORTA O MONGOOSE
var mongoose = require('mongoose');

// CONECTA COM O BD MONGODB USANDO MONGOOSE
mongoose.connect('mongodb://localhost/rent_a_car');
var db = mongoose.connection;

// TRATAMENTO DE ERRO DE CONEXÃO
db.on('error', console.error.bind(console, 'Erro ao conectar no banco de dados.'));

// SCHEMAS DO MONGODB
db.once('open', function() {
  // SCHEMA DE RESERVAS
  exports.Reserva = mongoose.model('Reserva', mongoose.Schema({
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
