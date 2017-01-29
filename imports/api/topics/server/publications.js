// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Topics } from '../topics.js';
import { check } from 'meteor/check';

Meteor.publish('topics.all', function () {
  return Topics.find();
});

Meteor.publish('topics.class', function (class_id) {
  check(class_id, String);

  return Topics.find({class_id});
});
