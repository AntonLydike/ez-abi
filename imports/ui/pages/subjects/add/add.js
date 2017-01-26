import './subjects_add.tpl.jade';

Template.subjects_add.events({
  "submit form"(event, template) {
     const name = event.target.name.value.trim();
     const color = event.target.color.value.trim();

     Meteor.call('subjects.insert', name, color, function (err, data) {
       if (data) {
         alert("success! ", data);
       }
     });

     console.log('sent', name, color);
  }
});
