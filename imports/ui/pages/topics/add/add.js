import './topic_add.tpl.jade';

import if404 from '/imports/ui/helpers/if404.js';
import { Classes } from '/imports/api/classes/classes.js';
import { toast, error } from '/imports/ui/helpers/toasts.js'

Template.topic_add.onCreated(function() {
  this.subscribe('classes.one', FlowRouter.getParam('class'));

  if404(this, Classes, '_id', 'class');
});

Template.topic_add.helpers({
  class() {
    return Classes.findOne(FlowRouter.getParam('class'));
  },
  icon() {
    const class_ = Classes.findOne(FlowRouter.getParam('class')) || {};

    return {
      name: class_.short,
      color: class_.color,
      checked: false,
    }
  }
})

Template.topic_add.events({
  'submit form'(e) {
    e.preventDefault();

    let title = e.target.title.value.trim(),
        _id   = FlowRouter.getParam('class');

    Meteor.call('topics.insert', title, _id, function (err, res) {
      if (err) {
        error(err.reason, 'error_outline');
      } else {
        alert(JSON.stringify(res, true, "  "));
      }
    })

  }
})
