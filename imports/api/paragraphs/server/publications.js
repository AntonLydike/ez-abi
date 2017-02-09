// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Paragraphs } from '../paragraphs.js';

Meteor.publish('paragraphs.all', function () {
  return Paragraphs.find();
});

Meteor.publish('paragraphs.doc', function (doc_id) {
  check(doc_id, String);

  return Paragraphs.find({doc_id});
});
