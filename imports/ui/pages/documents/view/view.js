import './doc_view.tpl.jade';

import if404 from '/imports/ui/helpers/if404.js';
import { Paragraphs } from '/imports/api/paragraphs/paragraphs.js';
import { Documents } from '/imports/api/documents/documents.js';
import { toast, error } from '/imports/ui/helpers/toasts.js'

Template.doc_view.onCreated(function() {
  this.subscribe('documents.one', FlowRouter.getParam('_id'));
  this.subscribe('paragraphs.doc', FlowRouter.getParam('_id'));

  if404(this, Documents, '_id');
});

Template.doc_view.helpers({
  doc() {
    return Documents.findOne(FlowRouter.getParam('_id'));
  },
  paragraphs() {
    const doc_id = FlowRouter.getParam('_id');

    return Paragraphs.find({doc_id});
  }
})

Template.doc_view.events({
  'click shit'(e, tpl) {

  }
})
