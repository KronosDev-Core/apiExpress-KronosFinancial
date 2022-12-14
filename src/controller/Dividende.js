const Dividende = require('../schema/Dividende');
const { ObjectId } = require('mongoose').Types;

module.exports = {
  Create: (body, res) => {
    console.log(body);
    if (!body) {
      return { message: 'Form content can not be empty' };
    }

    Dividende.model
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
    ];

    Dividende.model
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
    ];

    Dividende.model
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

    Dividende.model
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

    Dividende.model
      .findByIdAndDelete(_id)
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(400).send({ message: err.message });
      });
  },
};
