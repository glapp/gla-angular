(function() {
  'use strict';

  angular
    .module('glaAngular')
    .service('Policy', Policy);

  function Policy($resource, SAILS_HOST) {
    var url = 'http://' + SAILS_HOST + '/rule/';
    return $resource(url + ':id', {
        id: '@_id'
      },
      {
        getPolicy: {method: 'GET', url: url + 'policy', isArray: false},
        createPolicy: {method: 'POST', url: url + 'set', isArray: false},
        removePolicy: {method: 'POST', url: url + 'remove', isArray: false}
      }
    );
  }
})();
