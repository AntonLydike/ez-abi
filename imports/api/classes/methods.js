// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Classes } from './classes.js';

Meteor.methods({
  'classes.insert'(title, color) {
    check(color, String);
    check(title, String);

    return Classes.insert({
      color,
      title,
      docCount: 0,
      subjCount: 0,
      createdAt: new Date(),
    });
  },
});
