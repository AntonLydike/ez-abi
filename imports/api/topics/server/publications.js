// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Topics } from '../topics.js';

Meteor.publish('topics.all', function () {
  return Topics.find();
});

Meteor.publish('topics.document', function () {
  return Topics.find();
});
