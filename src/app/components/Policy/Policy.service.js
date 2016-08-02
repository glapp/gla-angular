(function () {
  'use strict';

  angular
    .module('glaAngular')
    .service('Policy', Policy);

  function Policy($resource, $location, SAILS_HOST, SAILS_PORT) {
    var url = 'http://' + (SAILS_HOST ? SAILS_HOST : $location.host()) + ':' + SAILS_PORT + '/policy/';
    return $resource(url + ':id', {
        id: '@_id'
      },
      {
        getPolicy: {method: 'GET', url: url, isArray: false},
        createPolicy: {method: 'POST', url: url + 'set', isArray: false},
        removePolicy: {method: 'POST', url: url + 'remove', isArray: false}
      }
    );
  }
})();
