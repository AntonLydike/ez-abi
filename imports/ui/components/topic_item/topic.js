import './topic_item.tpl.jade';

import { Documents } from '/imports/api/documents/documents.js';
import { ReactiveVar } from 'meteor/reactive-var'

Template.topic_item.onCreated(function() {

  this.data.isOpen = new ReactiveVar(this.open || false);
  this.data.isReady = new ReactiveVar(this.open || false);
});

Template.topic_item.helpers({
  documents() {
    return Documents.find({topic_id: this._id});
  },
  date(d, tpl) {
    return moment(d).format('DD.MM.YYYY');
  },
  open_class() {
    return this.isOpen.get() ? 't-open' : '';
  },
  isReady() {
    return this.isReady.get();
  }
})

Template.topic_item.events({
  "click .head": function(event, template){
    template.data.isOpen.set(!template.data.isOpen.get());
  }
});

Template.topic_item.onRendered(function () {
  const $e = this.$('.chapter'),
        $h = $e.find('.head');

  if ($e.is(':last-child')) {
    this.data.isOpen.set(true)
  }

  if (this.data.isOpen.get()) {
    $e.css('height', $h.outerHeight(true));
  }

  let subs = false;
  const subscribe = (callback) => {
    if (subs) return callback();

    setTimeout(() => {
      this.subscribe('documents.topic', this.data._id, callback);
      subs = true;
    }, 0);
  }

  let firstRun = true;

  this.autorun(() => {
    if (this.data.isOpen.get()) {
      $e.transition({height: 119}, 100);

      subscribe(() => {
        this.data.isReady.set(true);

        Meteor.setTimeout(() => {
          let oldH = $e.css('height');
          $e.css('height', '').redraw();

          let newH = $e.outerHeight(true);

          $e.css('height', oldH);

          $e.transition({height: newH}, 300, () => {
            $e.css('height', '');
          });
        }, 0);
      });
    } else {
      if (!firstRun) $e.css('height', $e.outerHeight(true));

      $e.transition({height: $h.outerHeight(true)}, 300, () => {
        this.data.isReady.set(false);
      });
    }
    firstRun = false;
  })
});
