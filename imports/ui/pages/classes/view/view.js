import './classes_view.tpl.jade';

import { Classes } from '/imports/api/classes/classes.js';
import { Topics } from '/imports/api/topics/topics.js';
import { Documents } from '/imports/api/documents/documents.js';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import if404 from '/imports/ui/helpers/if404.js';


Template.classes_view.onCreated(function() {
  this.subscribe('classes.all');
  this.subscribe('topics.subject', FlowRouter.getParam('title'));

  if404(this, Classes, 'title');
});

Template.classes_view.helpers({
  subject() {
    return Classes.findOne({title: FlowRouter.getParam('title')});
  },
  topics() {
    return Topics.find()
  }
})
