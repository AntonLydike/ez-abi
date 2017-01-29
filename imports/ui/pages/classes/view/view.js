import './classes_view.tpl.jade';
import '/imports/ui/components/topic_item/topic.js';

import { Classes } from '/imports/api/classes/classes.js';
import { Topics } from '/imports/api/topics/topics.js';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';
import if404 from '/imports/ui/helpers/if404.js';


Template.classes_view.onCreated(function() {
  this.subscribe('classes.one', FlowRouter.getParam('_id'));
  this.subscribe('topics.class', FlowRouter.getParam('_id'));

  if404(this, Classes, '_id');
});

Template.classes_view.helpers({
  class() {
    return Classes.findOne(FlowRouter.getParam('_id'));
  },
  topics() {
    return Topics.find({class_id: FlowRouter.getParam('_id')});
  },
  topic() {
    return Topics.findOne({class_id: FlowRouter.getParam('_id')}, {limit: 1, sort: {createdAt:-1}});
  },
  icon() {
    const class_ = Classes.findOne(FlowRouter.getParam('_id'));

    return {
      name: class_.title,
      color: class_.color,
      checked: false,
    }
  }
})
