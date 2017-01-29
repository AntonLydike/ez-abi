// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Documents } from '../documents.js';

Meteor.publish('documents.all', function () {
  return Documents.find();
});

Meteor.publish('documents.topic', function (topic_id) {
  check(topic_id, String);

  return Documents.find({topic_id});
});
