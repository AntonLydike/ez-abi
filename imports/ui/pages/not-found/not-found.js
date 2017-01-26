import './not-found.html';

Template.App_notFound.helpers({
  url() {
    return FlowRouter.current().path;
  }
})
