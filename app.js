var express = require('express');
var cors = require('cors');
var app = express();

app.use(cors());

app.listen(5000);

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
