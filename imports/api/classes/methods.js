// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Classes } from './classes.js';

Meteor.methods({
  'classes.insert'(title, color, short) {
    check(color, String);
    check(title, String);
    check(short, String);

    return Classes.insert({
      color,
      title,
      short,
      topic_count: 0,
      createdAt: new Date(),
    });
  },
});
