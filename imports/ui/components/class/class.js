import './class_item.tpl.jade';
import '../flip-icon/flipIcon.js';


Template.class_item.helpers({
  icon() {
    return {
      name: this.title,
      color: this.color,
      checked: false,
    }
  }
});
