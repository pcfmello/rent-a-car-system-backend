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
    // Referencia o ID do local no schema Local
    local: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Local'
    },
    carro: Object,
    dataInicio: Date,
    dataFim: Date,
    responsavel: String,
    cafe: Boolean,
    quantidadePessoas: Number,
    descricao: String,
    criadoEm: Date
  }), 'Reservas');

  exports.Local = mongoose.model('Local', mongoose.Schema({
    nome: String,
    carros: Array,
    criadoEm: Date
  }), 'Locais');
});
