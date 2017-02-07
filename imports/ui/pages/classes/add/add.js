import './classes_add.tpl.jade';
import { toast, error } from '/imports/ui/helpers/toasts.js'

Template.classes_add.events({
  "submit form"(event, template) {
     const name = event.target.name.value.trim();
     const color = event.target.color.value.trim();
     const short = event.target.short.value.trim();

     Meteor.call('classes.insert', name, color, short, function (err, data) {
       if (data) {
         toast('Class added successful', 'done');
       } else {
         error(err.reason, 'error_outline')
       }
     });

  }
});
