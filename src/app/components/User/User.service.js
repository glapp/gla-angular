(function() {
  'use strict';

  angular
    .module('glaAngular')
    .service('User', User);

    function User($resource) {
      return $resource('http://localhost:1337/user/:id', {
          id: '@_id'
        },
        {
          signup: {method: 'POST', url: 'http://localhost:1337/user/signup', isArray: false},
          login: {method: 'PUT', url: 'http://localhost:1337/user/login', isArray: false},
          logout: {method: 'GET', url: 'http://localhost:1337/user/logout', isArray: false},
          confirmlogin: {method: 'GET', url: 'http://localhost:1337/user/confirm-login', isArray: false}
        }
      );
    }
})();
