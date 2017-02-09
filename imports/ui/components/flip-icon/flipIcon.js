import './flipIcon.tpl.jade';

Template.flipIcon.helpers({
  name() {
    return this.data.name.substr(0,2);
  },
  isActive() {
    return this.data.state ? "selected" : "";
  },
  color() {
    return this.data.color || 'blue';
  },
  flipable() {
    return this.data.update ? "flipable" : "";
  }
});

Template.flipIcon.events({
  "click .icon, click .icon-bg"(event, template){
    if (this.data.update) {
      this.data.update(!this.data.state);
    }
  }
});

/* options:
 - color:  materializecss color class
 - name:   first two characters of name are displayed
 - state:  <boolean> - wether or not it's selected
 - update: <function> - if set, the icon is flipable and will call update with
           the new status (<boolean>)
           It will NOT switch the state by itself - you have to do that!

*/
