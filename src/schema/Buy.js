const { Schema, model } = require('mongoose');

const BuySchema = new Schema(
  {
    IdStockDividende: {
      type: Schema.Types.ObjectId,
      ref: 'dividende',
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
