// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Documents } from './documents.js';

Meteor.methods({
  'documents.insert'(title, topic_id) {
    check(topic_id, String);
    check(title, String);

    return Documents.insert({
      title,
      topic_id,
      createdAt: new Date(),
    });
  },
});
