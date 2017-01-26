// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Paragraphs } from './paragraphs.js';

Meteor.methods({
  'documents.insert'(title, topic) {
    check(topic, String);
    check(title, String);

    return Links.insert({
      text,
      title,
      createdAt: new Date(),
    });
  },
});
