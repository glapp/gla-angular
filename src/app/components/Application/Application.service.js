(function () {
  'use strict';

  angular
    .module('glaAngular')
    .service('Application', Application);

  function Application($resource, $location, SAILS_HOST, SAILS_PORT) {
    var url = 'http://' + (SAILS_HOST ? SAILS_HOST : $location.host()) + ':' + SAILS_PORT + '/application/';
    return $resource(url + ':id', {
        id: '@_id'
      },
      {
        getUserApps: {method: 'GET', url: url + 'getUserApps'},
        getAppDetails: {method: 'GET', url: url + 'details', isArray: false},
        addApp: {method: 'POST', url: url + 'add', isArray: false},
        deploy: {method: 'POST', url: url + 'deploy', isArray: false},
        undeploy: {method: 'POST', url: url + 'undeploy', isArray: false},
        rename: {method: 'POST', url: url + 'rename', isArray: false},
        remove: {method: 'POST', url: url + 'remove', isArray: false}
      }
    );
  }
})();
