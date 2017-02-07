// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Documents } from './documents.js';
import { Topics } from '../topics/topics.js';

Meteor.methods({
  'documents.insert'(title, topic_id) {
    check(topic_id, String);
    check(title, String);

    if (Topics.findOne(topic_id) === undefined) {
      throw new Meteor.Error("pls give me a real topic");
    }

    Topics.update(class_id, {
      $inc: {doc_count: 1}
    })

    return Documents.insert({
      title,
      topic_id,
      paragraph_count: 0,
      createdAt: new Date(),
    });
  },
});
