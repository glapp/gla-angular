/*(function() {
  'use strict';

  angular
    .module('glaAngular')
    .service('Application', Application);

    function Application(sailsResource) {
      return sailsResource('application',
        {
          getUserApps: {method: 'GET', url: '/application/getUserApps'},
          addApplication: {method: 'POST', url: '/application/add'}
        },
        {
          origin: 'http://localhost:1337',
          verbose: true
        }
      );
    }
})();*/
