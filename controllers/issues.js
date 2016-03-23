var Issue = require('../models/issue');

exports.index = function*() {
  var issues = yield Issue.find();
  this.body = issues;
};

exports.create = function*() {
  var issue = yield Issue.create({title: 'new issue'})
  this.body = issues;
};
