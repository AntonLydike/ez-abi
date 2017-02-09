import './doc_view.tpl.jade';

import if404 from '/imports/ui/helpers/if404.js';
import cursor from '/imports/ui/helpers/cursor.js';
import { Paragraphs } from '/imports/api/paragraphs/paragraphs.js';
import { Documents } from '/imports/api/documents/documents.js';
import { toast, error } from '/imports/ui/helpers/toasts.js'
import { ReactiveVar } from 'meteor/reactive-var';

Template.doc_view.onCreated(function() {
  let _id = FlowRouter.getParam('_id');

  this.subscribe('documents.one', _id);
  this.subscribe('paragraphs.doc', _id);

  this.doc_info = new ReactiveVar(false);
  this.err = new ReactiveVar(false);

  Meteor.call('documents.getInfoByID', _id, (err, res) => {
    if (err) return this.err.set(err.reason);

    this.doc_info.set(res);
  })

  if404(this, Documents, '_id');
});

Template.doc_view.onRendered(function () {
  // TODO grabn from user settings
  this.edit_mode = new ReactiveVar(true);

  this.autorun(() => {
    let mode = this.edit_mode.get();

    this.$('.editables')
    .prop('contenteditable', mode)
    .setClass('edit-on', mode);

  })
})


Template.doc_view.helpers({
  doc() {
    return Documents.findOne(FlowRouter.getParam('_id'));
  },
  paragraphs() {
    const doc_id = FlowRouter.getParam('_id');

    return Paragraphs.find({doc_id});
  },
  docInfo() {
    return Template.instance().doc_info.get();
  },
  icon() {
    let info = Template.instance().doc_info.get();

    return {
      name: info.class.short,
      color: info.class.color,
      checked: false
    }
  },
  err() {
    return Template.instance().err.get();
  },
  text() {
    // FIXME somehow the first newline has to be added manually
    return this.text //+ "\n";
  }
})

Template.doc_view.events({
  'click #toggle-edit'(e, tpl) {
    tpl.edit_mode.set(!tpl.edit_mode.get());
  },
  'blur .editables'(e, tpl) {
    // TODO save edits

    toast("saving");
  },
  'keypress .editables'(e, tpl) {
    if (e.keyCode == 13) {
      // get node
      let node = document.getSelection().anchorNode;
      // pls no text nodes
      if (node.nodeType == 3) node = node.parentNode;

      // when cursor is in title, switch to content
      if (node.tagName == 'H3') {
        let nextNode = node.nextSibling.nextSibling;

        setTimeout(() => cursor.toEnd(nextNode), 3);
      } else {
        // otherwise insert a newline
        console.log(e);

        cursor.insert('\n');
      }

      return false;
    }

    console.log(e.keyCode);
  }
})
