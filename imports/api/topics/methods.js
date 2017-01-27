// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Documents } from '/imports/api/documents/documents.js';
import { Subjcts } from '/imports/api/classes/classes.js';

Meteor.methods({
  'topics.insert'(title, subject) {
    check(subject, String);
    check(title, String);

    if (Subjcts.findOne(subject) === undefined) {
      throw "You have to supply a valid subject"
    }

    return Documents.insert({
      color,
      title,
      createdAt: new Date(),
    });
  },
});
