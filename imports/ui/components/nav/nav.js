import './nav.html';
import { Template } from 'meteor/templating';
import { Subjects } from '/imports/api/subjects/subjects.js';

Template.app_nav.onCreated(function () {
  this.subscribe('subjects.all');
})

Template.app_nav.onRendered(() => {
   this.$(".button-collapse").sideNav();
})

Template.app_nav.helpers({
  subjects() {
    return Subjects.find();
  }
})
