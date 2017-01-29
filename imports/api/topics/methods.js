// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Topics } from './topics.js';
import { Classes } from '/imports/api/classes/classes.js';


Meteor.methods({
  'topics.insert'(title, class_id) {
    check(class_id, String);
    check(title, String);

    if (Classes.findOne(class_id) === undefined) {
      throw "You have to supply a valid class id";
    }

    return Topics.insert({
      title,
      class_id,
      createdAt: new Date(),
    });
  },
});
