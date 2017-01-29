// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Classes } from '../classes.js';

Meteor.publish('classes.all', function () {
  return Classes.find();
});

Meteor.publish('classes.one', function (_id) {
  check(_id, String);

  return Classes.find();
});
