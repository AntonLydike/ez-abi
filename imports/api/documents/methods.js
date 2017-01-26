// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Documents } from './documents.js';

Meteor.methods({
  'documents.insert'(title, color) {
    check(color, String);
    check(title, String);

    return Documents.insert({
      color,
      title,
      createdAt: new Date(),
    });
  },
});
