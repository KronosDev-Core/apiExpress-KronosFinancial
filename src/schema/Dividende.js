const { Schema, model } = require('mongoose');

const DividendeSchema = new Schema(
  {
    Symbol: {
      type: String,
      required: true,
    },
    Secteur: {
      type: String,
      required: true,
    },
    Date_ExDiv: {
      type: Date,
      required: true,
    },
    Date_Paiement: {
      type: Date,
      required: true,
    },
    Div_Annuel: {
      type: Number,
      required: true,
    },
  },
  { strict: !0, versionKey: !1 },
);

module.exports = {
  schema: DividendeSchema,
  model: model('dividende', DividendeSchema),
};
