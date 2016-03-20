var Schema = require('mongoose').Schema;

var IssueSchema = new Schema({
  title: { type: String, index: true },
  description: { type: String },
  createDate: { type: Date, default: Date.now },
  updateDate: { type: Date, default: Date.now }
});

/* global db */
module.exports = db.model('Issue', IssueSchema);
