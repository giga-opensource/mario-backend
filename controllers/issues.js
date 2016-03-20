var issue = require('../models/issue');

exports.index = function(req, res, next) {
  issue.find(function(err, docs) {
    if (err) return next(err);
    res.send(docs);
  });
};

exports.create = function(req, res, next) {
  issue.create({name: 'new issue'}, function(err, doc) {
    if (err) return next(err);
    res.send(doc);
  });
};
