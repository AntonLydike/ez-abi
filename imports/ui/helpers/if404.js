export default function if404 (self, db, field, param) {
  param = param || field;

  self.autorun(() => {
    if (self.subscriptionsReady() &&
      db.findOne({[field]: FlowRouter.getParam(param)}) === undefined) {
      BlazeLayout.render('App_body', { main: 'App_notFound' });
    }
  })
}
