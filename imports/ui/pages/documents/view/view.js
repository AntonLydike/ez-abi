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
  cont_edit() {
    return Template.instance().edit_mode.get();
  },
  edit_class() {
    return Template.instance().edit_mode.get() ? 'edit-on' : '';
  },
  icon() {
    let info = Template.instance().doc_info.get();

    return {
      name: info.class.short,
      color: info.class.color,
      checked: false
    }
  },
  btn_on() {
    return Template.instance().edit_mode.get() ? 't-on' : '';
  },
  err() {
    return Template.instance().err.get();
  },
  text() {
    // FIXME somehow the first newline has to be added manually
    // fixed by whitespace after text?
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
      let textNode = document.getSelection().anchorNode,
          node = textNode.nodeType == 3 ? textNode.parentNode : textNode,
          info;
      // get some cursor info
      if (node !== textNode) {
        info = {
          x: window.getSelection().anchorOffset,
          y: _.indexOf(node.childNodes, textNode),
          line: textNode.data
        }
        // because consistency
        if (info.x == 0) info.y -= 1;
      }

      // when cursor is in title, switch to content
      if (node.tagName == 'H3') {
        let nextNode = node.nextSibling.nextSibling;

        setTimeout(() => cursor.toEnd(nextNode), 3);
      } else {

        console.log({l:info.line});

        cursor.insert('\n' + (!info.line.match(/^\n+$/) ? '\n' : ''));
      }

      return false;
    }

  }
})
