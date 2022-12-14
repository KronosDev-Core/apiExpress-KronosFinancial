const Buy = require('../schema/Buy');
const { ObjectId } = require('mongoose').Types;

module.exports = {
  Create: (body, res) => {
    console.log(body);
    if (!body) {
      return { message: 'Form content can not be empty' };
    }

    Buy.model
      .create(body)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  },
  GetOne: (_id, res) => {
    if (!_id) {
      return { message: 'Form content can not be empty' };
    }

    var aggr = [
      {
        $match: {
          _id: ObjectId(_id),
        },
      },
      {
        $graphLookup: {
          from: 'dividendes',
          startWith: '$IdStockDividende',
          connectFromField: 'IdStockDividende',
          connectToField: '_id',
          as: 'stock',
        },
      },
      {
        $set: {
          stock: {
            $arrayElemAt: ['$stock', 0],
          },
        },
      },
      {
        $set: {
          Symbol: '$stock.Symbol',
          Date_ExDiv: '$stock.Date_ExDiv',
          Date_Paiement: '$stock.Date_Paiement',
          Dividende: '$stock.Dividende',
          Status: '$stock.Status',
        },
      },
      {
        $unset: ['stock', 'IdStockDividende'],
      },
    ];

    Buy.model
      .aggregate(aggr)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  },
  GetAll: (res) => {
    var aggr = [
      {
        $match: {},
      },
      {
        $graphLookup: {
          from: 'dividendes',
          startWith: '$IdStockDividende',
          connectFromField: 'IdStockDividende',
          connectToField: '_id',
          as: 'stock',
        },
      },
      {
        $set: {
          stock: {
            $arrayElemAt: ['$stock', 0],
          },
        },
      },
      {
        $set: {
          Symbol: '$stock.Symbol',
          Date_ExDiv: '$stock.Date_ExDiv',
          Date_Paiement: '$stock.Date_Paiement',
          Dividende: '$stock.Dividende',
          Status: '$stock.Status',
        },
      },
      {
        $unset: ['stock', 'IdStockDividende'],
      },
    ];

    Buy.model
      .aggregate(aggr)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  },
  Update: (_id, body, res) => {
    if (!body) {
      return { message: 'Form content can not be empty' };
    }

    Buy.model
      .findByIdAndUpdate(_id, body, { new: true })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  },
  Delete: (_id, res) => {
    if (!_id) {
      return { message: 'Form content can not be empty' };
    }

    Buy.model
      .findByIdAndDelete(_id)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  },
};
