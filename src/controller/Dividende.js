const Dividende = require('../schema/Dividende');
const { ObjectId } = require('mongoose').Types;

var AGGREGATE = {
  match: (field, value) => {
    var res = {
      $match: {},
    };

    field.forEach((elem, index) => {
      res.$match[`${elem}`] = value[index];
    });

    return res;
  },
  lookup: (from, Lfield, Ffield = "_id", as = Lfield) => {
    return {
      $lookup: {
        from: from,
        localField: Lfield,
        foreignField: Ffield,
        as: as,
      },
    };
  },
  setAfterLookup: (table) => {
    var res = { $set: {} };
    res.$set[table] = {
      $arrayElemAt: [`$${table}`, 0],
    };
    return res;
  },
  sort: (field, value) => {
    var res = {
      $sort: {},
    };

    field.forEach((elem, index) => {
      res.$sort[`${elem}`] = value[index];
    });
    return res;
  },
  arrayElemAt: (field, index) => {
    return {
      $arrayElemAt: [field, index],
    };
  },
  toInt: (field) => {
    return { $toInt: field };
  },
  split: (value, delimiter) => {
    return {
      $split: [value, delimiter],
    };
  },
  set: (field, value) => {
    var res = {
      $set: {},
    };

    field.forEach((elem, index) => {
      res.$set[elem] = value[index];
    });
    return res;
  },
  addFields: (field, value) => {
    var res = {
      $addFields: {},
    };

    field.forEach((elem, index) => {
      res.$addFields[elem] = value[index];
    });
    return res;
  },
  graphLookup: (from, startWith, FField, TField, as) => {
    return {
      $graphLookup: {
        from: from,
        startWith: startWith,
        connectFromField: FField,
        connectToField: TField,
        as: as
      }
    };
  }
};

module.exports = {
  Create: (body, res) => {
    console.log(body);
    if (!body) {
      return { message: "Form content can not be empty" };
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
      return { message: "Form content can not be empty" };
    }

    var aggr = [
      AGGREGATE.match(["_id"], [ObjectId(_id)]),
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
      AGGREGATE.match([], []),
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
      return { message: "Form content can not be empty" };
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
      return { message: "Form content can not be empty" };
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

