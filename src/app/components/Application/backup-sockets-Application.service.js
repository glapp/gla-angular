/*(function() {
  'use strict';

  angular
    .module('glaAngular')
    .service('Application', Application);

    function Application(sailsResource, SAILS_HOST) {
      return sailsResource('application',
        {
          getUserApps: {method: 'GET', url: '/application/getUserApps'},
          addApplication: {method: 'POST', url: '/application/add'}
        },
        {
          origin: 'http://' + SAILS_HOST,
          verbose: true
        }
      );
    }
})();*/
