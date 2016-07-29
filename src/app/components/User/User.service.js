(function () {
  'use strict';

  angular
    .module('glaAngular')
    .service('User', User);

  function User($resource, $location, SAILS_HOST, SAILS_PORT) {
    var url = 'http://' + (SAILS_HOST ? SAILS_HOST : $location.host()) + ':' + SAILS_PORT + '/user/';
    return $resource(url + ':id', {
        id: '@_id'
      },
      {
        signup: {method: 'POST', url: url + 'signup', isArray: false},
        login: {method: 'PUT', url: url + 'login', isArray: false},
        logout: {method: 'GET', url: url + 'logout', isArray: false},
        confirmlogin: {method: 'GET', url: url + 'confirm-login', isArray: false}
      }
    );
  }
})();
