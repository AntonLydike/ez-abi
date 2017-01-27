// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Topics } from '../topics.js';
import { check } from 'meteor/check';

Meteor.publish('topics.all', function () {
  return Topics.find();
});

Meteor.publish('topics.subject', function (title) {
  check(title, String);

  return Topics.find({title});
});
