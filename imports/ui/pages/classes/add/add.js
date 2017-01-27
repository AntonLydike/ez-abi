import './classes_add.tpl.jade';

Template.classes_add.events({
  "submit form"(event, template) {
     const name = event.target.name.value.trim();
     const color = event.target.color.value.trim();

     Meteor.call('classes.insert', name, color, function (err, data) {
       if (data) {
         alert("success! ", data);
       }
     });

     console.log('sent', name, color);
  }
});
