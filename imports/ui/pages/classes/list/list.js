import './classes_list.tpl.jade';
import '/imports/ui/components/class_item/class.js';

import { Classes } from '/imports/api/classes/classes.js';

Template.classes_list.onCreated(function() {
    this.subscribe('classes.all');
});

Template.classes_list.helpers({
  classes() {
    return Classes.find();
  }
})
