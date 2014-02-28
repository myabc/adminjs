import IndexRoute from 'adminjs/routes/index';
import IndexController from 'adminjs/controllers/index';
import IndexView from 'adminjs/views/index';
import SearchView from 'adminjs/views/search';
import ResourceView from 'adminjs/views/resource';
import ResourceController from 'adminjs/controllers/resource';
import ResourceRoute from 'adminjs/routes/resource';

import 'adminjs/initializers';

import Config from 'adminjs/config';

Ember.ENV.HELPER_PARAM_LOOKUPS = true;

import ApplicationController from 'adminjs/controllers/application';
import ApplicationView from 'adminjs/views/application';
import IdRenderer from 'adminjs/renderers/id';
import DateRenderer from 'adminjs/renderers/date';
import HasManyRenderer from 'adminjs/renderers/has_many';
import BelongsToRenderer from 'adminjs/renderers/belongs_to';
import TextFilter from 'adminjs/filters/text';
import CheckboxesFilter from 'adminjs/filters/checkboxes';
import SpinnerDisplayComponent from 'adminjs/components/spinner_display';
import TextEditor from 'adminjs/editors/text';

import fieldHelper from 'adminjs/helpers/field';
import groupHelper from 'adminjs/helpers/group';

Ember.Handlebars.registerBoundHelper('field', fieldHelper);
Ember.Handlebars.registerBoundHelper('group', groupHelper);

var Application = Ember.Application.extend({

  title: 'AdminJS',

  init: function() {
    this._super();
    this.configs = [];

    var container = this.__container__;

    // These are some hacks to support lookups in the incorporating application
    // this could ultimately be supported better if the resolver could support
    // separate namespaces

    this.ApplicationController = ApplicationController;

    this.ApplicationView = ApplicationView;

    this.IdRenderer = IdRenderer;

    this.DateRenderer = DateRenderer;

    this.HasManyRenderer = HasManyRenderer;

    this.BelongsToRenderer = BelongsToRenderer;

    this.TextFilter = TextFilter;

    this.CheckboxesFilter = CheckboxesFilter;

    this.SpinnerDisplayComponent = SpinnerDisplayComponent;

    this.TextEditor = TextEditor;

    container.register('editor:default', TextEditor);
  },

  manage: function(name, options) {

    var container = this.__container__;
    // HACK: we set EPF container here instead of going through the initializer,
    // this is because this manage method is run before the initializers
    Ep.__container__ = container;

    options = Ember.merge({name: name, container: container, namespace: this}, options || {});

    // TODO: move this to an initializer and make everything container based
    var config = Config.create(options);

    this.configs.push(config);

    // build the controllers/views/routes for this resource
    this[config.classifiedPlural + 'IndexRoute'] = IndexRoute.extend({
      config: config
    });
    this[config.classifiedPlural + 'IndexController'] = IndexController.extendWithConfig(config);
    this[config.classifiedPlural + 'IndexView'] = IndexView.extend({
      config: config
    });
    this[config.classifiedPlural + 'SearchView'] = SearchView.extend({
      config: config
    });
    this[config.classified + 'View'] = ResourceView.extend({
      config: config
    });
    this[config.classified + 'Controller'] = ResourceController.extend({
      config: config
    });
    this[config.classified + 'Route'] = ResourceRoute.extendWithConfig(config);
  },

  configure: function(dsl) {
    dsl.call(this);
    this.buildRoutes();
  },

  buildRoutes: function() {
    var app = this;
    this.Router.map(function() {
      app.configs.forEach(function(config) {
        this.resource(config.plural, function() {
          this.resource(config.name, {path: '/:' + config.name + '_id'});
        });
      }, this);
    });

    this.IndexRoute = Ember.Route.extend({

      beforeModel: function() {
        this.transitionTo(app.configs[0].plural);
      }

    });
  }

});

export default Application;
