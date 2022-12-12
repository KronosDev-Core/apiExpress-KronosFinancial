const { Schema, model } = require('mongoose');

const BuySchema = new Schema(
  {
    Symbol: {
      type: String,
      required: !0,
    },
    Date_ExDiv: {
      type: Date,
      required: !0,
    },
    Date_Paiement: {
      type: Date,
      required: !0,
    },
    Dividende: {
      type: Number,
      required: !0,
    },
    Open: {
      type: Boolean,
      required: !0,
    },
    Stock_Price: {
      type: Number,
      required: !0,
    },
    Stock_Price_Date: {
      type: Date,
      required: !0,
    },
    Montant: {
      type: Number,
      required: !0,
    },
  },
  { strict: !0, versionKey: !1 },
);

module.exports = {
  schema: BuySchema,
  model: model('buy', BuySchema),
};
