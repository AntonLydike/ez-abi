// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Documents } from '../documents.js';

Meteor.publish('documents.all', function () {
  return Documents.find();
});
