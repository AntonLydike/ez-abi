import './nav.html';
import { Template } from 'meteor/templating';
import { Classes } from '/imports/api/classes/classes.js';

Template.app_nav.onCreated(function () {
  this.subscribe('classes.all');
})

Template.app_nav.onRendered(() => {
   this.$(".button-collapse").sideNav();
})

Template.app_nav.helpers({
  classes() {
    return Classes.find();
  }
})
