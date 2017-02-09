// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Documents } from './documents.js';
import { Topics } from '../topics/topics.js';
import { Classes } from '../classes/classes.js';

Meteor.methods({
  'documents.insert'(title, topic_id) {
    check(topic_id, String);
    check(title, String);

    if (Topics.update(class_id, {$inc: {doc_count: 1}}) === 0) {
      throw new Meteor.Error("pls give me a real topic");
    }

    return Documents.insert({
      title,
      topic_id,
      paragraph_count: 0,
      createdAt: new Date(),
    });
  },
  'documents.getInfoByID'(doc_id) {
    check(doc_id, String);

    let doc, topic, clas_;

    if ((doc = Documents.findOne(doc_id)) === undefined) {
      throw new Meteor.Error('bad-doc-id', 'The given doc_id is invalid');
    }

    topic = Topics.findOne(doc.topic_id);

    clas_ = Classes.findOne(topic.class_id, {fields:{topic_count: 0}});

    return {
      topic: topic.title,
      class: clas_
    }
  }
});
