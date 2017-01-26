import './subjects_list.tpl.jade';
import '/imports/ui/components/subject/subject.js';

import { Subjects } from '/imports/api/subjects/subjects.js';

Template.subjects_list.onCreated(function() {
    this.subscribe('subjects.all');
});

Template.subjects_list.helpers({
  subjects() {
    return Subjects.find();
  }
})
