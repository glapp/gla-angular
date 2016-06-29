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
          getAppDetails: {method: 'GET', url: 'http://localhost:1337/application/details', isArray: false},
          addApp: {method: 'POST', url: 'http://localhost:1337/application/add', isArray: false},
          deploy: {method: 'POST', url: 'http://localhost:1337/application/deploy', isArray: false},
          undeploy: {method: 'POST', url: 'http://localhost:1337/application/undeploy', isArray: false},
          rename: {method: 'POST', url: 'http://localhost:1337/application/rename', isArray: false},
          remove: {method: 'POST', url: 'http://localhost:1337/application/remove', isArray: false}
        }
      );
    }
})();
