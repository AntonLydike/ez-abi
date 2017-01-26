import './subject.tpl.jade';
import '../flip-icon/flipIcon.js';


Template.subject.helpers({
  icon() {
    return {
      name: this.title,
      color: this.color,
      checked: false,
    }
  }
});
