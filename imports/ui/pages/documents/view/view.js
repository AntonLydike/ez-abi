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
  }
})

Template.doc_view.events({
  'click #toggle-edit'(e, tpl) {
    tpl.edit_mode.set(!tpl.edit_mode.get());
  },
  'blur .editables'(e, tpl) {
    // TODO save edits

    //toast("saving");
  },
  'keydown .editables'(e, tpl) {

    console.log("keycode:",e.keyCode);

    // arrow keys: 37 38 39 40
    //             l  u  r  d

    // get info
    let info = cursor.info();

    let {node, textNode} = info;

    // console.log(info, e.keyCode);

    switch (e.keyCode) {
      case 13: // ENTER key - insert newlines or switch document
      // when cursor is in title, switch to content
      if (info.isHeader) {
        toThisParagraph(node);
      } else {
        cursor.insert('\n' + (info.line != "" && info.x == info.line.length? '\n' : ''));
      }

      return false;
      break;
      case 39:  // right key
      // if last line and last character
      if (info.lines.length == info.y && info.x == info.line.length) {
        return down(info, node);
      }
      break;
      case 40:  // down key
      // if last line
      if (info.lines.length == info.y)
        return down(info, node);
      break;
      case 37:  // left key
      // if first character and first line
      if (info.y == 1 && info.x == 0) {
        return up(info, node);
      }
      break;
      case 38:  // up key
      // if first line
      if (info.y == 1)
        return up(info, node);
      break;
    }

  }
})

function toNextParagraph (node) {
  let next = $(node).closest('.paragraph').next();

  // only switch if possible
  if (next.length > 0) cursor.toStart(next.find('h3')[0]);

  return next.length == 0;
}

function toThisHeadline (node) {
  let headline = $(node).closest('.paragraph').find('h3')[0];

  cursor.toEnd(headline);

  return false;
}

function toPrevParagraph (node) {
  let paragraph = $(node).closest('.paragraph').prev().find('.text-content')[0];

  if (paragraph === undefined) return true;

  cursor.toEnd(paragraph);

  return false;
}

function toThisParagraph (node) {
  // TODO fix wonky code

  let nextNode = node.nextSibling.nextSibling;

  cursor.toStart(nextNode);
}

function up (info, node) {
  if (info.isHeader) {
    return toPrevParagraph(node);
  } else {
    return toThisHeadline(node);
  }
}

function down (info, node) {
  if (info.isHeader) {
    return toThisParagraph(node);
  } else {
    return toNextParagraph(node);
  }
}
