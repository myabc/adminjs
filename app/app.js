import Resolver from 'ember/resolver';

import server from 'adminjs/server';
import NewApplication from 'adminjs/application';

var App = NewApplication.create({
  LOG_ACTIVE_GENERATION: true,
  LOG_MODULE_RESOLVER: true,
  LOG_TRANSITIONS: true,
  LOG_TRANSITIONS_INTERNAL: true,
  LOG_VIEW_LOOKUPS: true,
  modulePrefix: 'adminjs', // TODO: loaded via config
  Resolver: Resolver['default'],
  title: 'AdminJS'
});

App.configure(function() {
  this.manage('customer', {
    filters: [{
      name: 'Name',
      param: 'name',
      type: 'text'
    },
    {
      name: 'Email',
      param: 'email',
      type: 'text'
    },
    {
      name: 'Notes',
      param: 'notes',
      type: 'text'
    }]
  });
  this.manage('order', {
    filters: [{
      name: 'state',
      type: 'checkboxes',
      options: ['new', 'fulfilled']
    }]
  });
});

export default App;
