var db = require('../config/db-config.js');

exports.buscaTodos = function(callback) {
  db.Reserva.find({}, function(error, reservas) {
    if(error) {
      callback({ error: 'Não foi possivel retornar suas reservas' });
    } else {
      callback(reservas);
    }
  });
};

exports.buscaPorId = function(id, callback) {
  db.Reserva.findById(id, function(error, reserva) {
    if(error) {
      callback({ error: 'Não foi possivel retornar a reserva' });
    } else {
      callback(reserva);
    }
  });
};

exports.salva = function(reserva, callback) {
  new db.Reserva({
    local: reserva.local,
    carro: reserva.carro,
    dataInicio: reserva.dataInicio,
    dataFim: reserva.dataFim,
    responsavel: reserva.responsavel,
    cafe: reserva.cafe,
    quantidadePessoas: reserva.quantidadePessoas,
    descricao: reserva.descricao,
    criadoEm: new Date()
  }).save(function(error, reserva) {
    if(error) {
      callback({ error: 'Não foi possivel salvar a reserva.'})
    } else {
      callback(reserva)
    }
  });
};

exports.atualiza = function(reservaObj, callback) {
  db.Reserva.findById(reservaObj._id, function(error, reserva) {
      reserva.local = reservaObj.local;
      reserva.carro = reservaObj.carro;
      reserva.dataInicio = reservaObj.dataInicio;
      reserva.dataFim = reservaObj.dataFim;
      reserva.responsavel = reservaObj.responsavel;
      reserva.cafe = reservaObj.cafe;
      reserva.quantidadePessoas = reservaObj.quantidadePessoas;
      reserva.descricao = reservaObj.descricao;
      reserva.save(function(error, reserva) {
        if(error) {
          callback({ error: 'Não foi possivel alterar a reserva.'});
        } else {
          callback(reserva);
        }
      });
    });
};

exports.deleta = function(id, callback) {
  db.Reserva.findById(id, function(error, reserva) {
    if(error) {
      callback({ error: 'Não foi possivel excluir a reserva' });
    } else {
      reserva.remove(function(error) {
        if(!error) {
            callback({ response: 'Reserva excluída com sucesso' });
        }
      })
    }
  });
};
