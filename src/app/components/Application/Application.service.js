(function() {
  'use strict';

  angular
    .module('glaAngular')
    .service('Application', Application);

    function Application($resource) {
      return $resource('http://localhost:1337/application/:id', {
          id: '@_id'
        },
        {
          getUserApps: {method: 'GET', url: 'http://localhost:1337/application/getUserApps'},
          addApp: {method: 'POST', url: 'http://localhost:1337/application/add'}
        }
      );
    }
})();
