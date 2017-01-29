import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

// Import needed templates
import '../../ui/components/loading/loading.js';
import '../../ui/layouts/body/body.js';
import '../../ui/pages/home/home.js';
import '../../ui/pages/not-found/not-found.js';
import '../../ui/pages/classes/list/list.js';
import '../../ui/pages/classes/add/add.js';
import '../../ui/pages/classes/view/view.js';
import '../../ui/components/nav/nav.js';

// Set up all routes in the app
FlowRouter.route('/', {
  name: 'App.home',
  action() {
    BlazeLayout.render('App_body', { main: 'App_home' });
  },
});

FlowRouter.route('/classes', {
  name: 'classes.list',
  action() {
    BlazeLayout.render('App_body', { main: 'classes_list' });
  },
});

FlowRouter.route('/classes/add', {
  name: 'classes.add',
  action() {
    BlazeLayout.render('App_body', { main: 'classes_add' });
  },
});

FlowRouter.route('/classes/:_id', {
  name: 'classes.view',
  action(param) {
    BlazeLayout.render('App_body', { main: 'classes_view' });
  },
});

FlowRouter.notFound = {
  action() {
    BlazeLayout.render('App_body', { main: 'App_notFound' });
  },
};
