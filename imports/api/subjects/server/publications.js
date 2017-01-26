// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Subjects } from '../subjects.js';

Meteor.publish('subjects.all', function () {
  return Subjects.find();
});
