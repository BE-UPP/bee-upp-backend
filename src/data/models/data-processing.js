const mongoose = require('../../infra/database');

const OperationSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },

  input: {
    type: [mongoose.Schema.Types.Mixed],
    required: true,
  },

  output: {
    type: [String],
    required: true,
  },

  body: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },

});

const DataProcessingSchema = new mongoose.Schema({
  version: {
    type: Number,
    required: [true, 'Version required'],
  },

  operations: {
    type: [OperationSchema],
    validate: V => Array.isArray(V) && V.length > 0,
    required: [true, 'Questions required'],
  },


});

const DataProcessingModel = mongoose.model('DataProcessingSchema', DataProcessingSchema);

module.exports = DataProcessingModel;
