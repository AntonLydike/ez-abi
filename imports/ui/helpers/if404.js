import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

export default function if404 (self, db, field, param) {
  param = param || field;

  self.autorun(() => {
    if (self.subscriptionsReady() &&
      db.findOne({[field]: FlowRouter.getParam(param)}) === undefined) {
        console.error(`can\'t find "${field}" with value "${FlowRouter.getParam(param)}" in db "${db._name}"`);

        BlazeLayout.render('App_body', { main: 'App_notFound' });
    }
  })
}
