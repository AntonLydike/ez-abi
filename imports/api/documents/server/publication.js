// All links-related publications

import { Meteor } from 'meteor/meteor';
import { Paragraphs } from '../paragraphs.js';

Meteor.publish('paragraphs.all', function () {
  return Links.find();
});

Meteor.publish('paragraphs.document', function () {
  return Links.find();
});
