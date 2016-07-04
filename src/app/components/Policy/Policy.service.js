(function() {
  'use strict';

  angular
    .module('glaAngular')
    .service('Policy', Policy);

  function Policy($resource) {
    return $resource('http://localhost:1337/rule/:id', {
        id: '@_id'
      },
      {
        getPolicy: {method: 'GET', url: 'http://localhost:1337/policy', isArray: false},
        createPolicy: {method: 'POST', url: 'http://localhost:1337/policy/set', isArray: false},
        removePolicy: {method: 'POST', url: 'http://localhost:1337/policy/remove', isArray: false}
      }
    );
  }
})();
