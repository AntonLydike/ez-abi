// Fill the DB with example data on startup

import { Meteor } from 'meteor/meteor';

import { Documents } from '/imports/api/documents/documents.js';
import { Paragraphs } from '/imports/api/paragraphs/paragraphs.js';
import { Classes } from '/imports/api/classes/classes.js';
import { Topics } from '/imports/api/topics/topics.js';

Meteor.startup(() => {
  if (Classes.find().count() > 0) {
    return;
  }

  const data = {
    classes: [
      {title: 'Deutsch', short: 'de', color: 'green'},
      {title: 'Mathe', short: 'MA', color: 'red'},
      {title: 'Physike', short: 'ph', color: 'blue'},
      {title: 'Sport Theorie', short: 'spt', color: 'orange'},
    ],
    topics: [
      {title: 'Some Topic 1'},
      {title: 'Some Topic 2'},
      {title: 'Some Topic 3'},
      {title: 'Some Topic 4'},
      {title: 'Some Topic 5'},
    ],
    docs: [
      {title: 'Einführung'},
      {title: 'Kapitel 1'},
      {title: 'Kapitel 2'},
      {title: 'Kapitel 3'},
      {title: 'Abschluss'},
    ]
  }

  _.each(data.classes, (cl) => {
    cl.topic_count = 5;
    cl.createdAt = new Date();

    let c_id = Classes.insert(cl);

    _.each(data.topics, (topic) => {
      topic.createdAt = new Date();
      topic.class_id  = c_id;
      topic.doc_count = 5;

      let t_id = Topics.insert(topic);

      _.each(data.docs, doc => {
        doc.createdAt = new Date();
        doc.topic_id = t_id;
        doc.paragraph_count = 0;

        Documents.insert(doc);
      })
    })
  })


});
