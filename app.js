var app = require('./js/config/app-config.js');
var reservaController = require('./js/controllers/reservaController.js');
var localController = require('./js/controllers/localController.js');

// ROTA PARA OBTER A LISTA DE RESERVAS
app.get('/reservas', function(req, res) {
  reservaController.buscaTodos(function(reservaResponse) {
    res.json(reservaResponse);
  });
});

// ROTA PARA OBTER UMA RESERVA ATRAVÉS DO ID
app.get('/reservas/:id', function(req, res) {
  var id = req.param('id');
  reservaController.buscaPorId(id, function(reservaResponse) {
    res.json(reservaResponse);
  });
});

app.post('/reservas', function(req, res) {
  var reserva = req.body;
  reservaController.salva(reserva, function(reservaResponse) {
    res.json(reservaResponse);
  });
});

app.put('/reservas', function(req, res) {
  var reserva = req.body;
  reservaController.atualiza(reserva, function(reservaResponse) {
    res.json(reservaResponse);
  });
});

// ROTA PARA DELETAR UMA RESERVA ATRAVÉS DO ID
app.delete('/reservas/:id', function(req, res) {
  var id = req.param('id');
  reservaController.deleta(id, function(reservaResponse) {
    res.json(reservaResponse);
  });
});

app.get('/locais', function(req, res) {
  localController.buscaTodos(function(localResponse) {
    res.json(localResponse);
  });
});
