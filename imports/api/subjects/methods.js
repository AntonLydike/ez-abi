// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Subjects } from './subjects.js';

Meteor.methods({
  'subjects.insert'(title, color) {
    check(color, String);
    check(title, String);

    return Subjects.insert({
      color,
      title,
      docCount: 0,
      subjCount: 0,
      createdAt: new Date(),
    });
  },
});
