// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Paragraphs } from './paragraphs.js';
import { Documents } from '/imports/api/documents/documents.js';

Meteor.methods({
  'paragraphs.insert'(title, text, doc) {
    check(text, String);
    check(title, String);
    check(doc, String);

    if (Documents.findOne(doc) === undefined) {
      throw new Meteor.Error("The referenced document does not exist!");
    }

    Documents.update(class_id, {
      $inc: {doc_count: 1}
    })

    return Links.insert({
      text,
      title,
      createdAt: new Date(),
    });
  },
});
