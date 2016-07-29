(function () {
  'use strict';

  angular
    .module('glaAngular')
    .service('Host', Host);

  function Host($resource, $location, SAILS_HOST, SAILS_PORT) {
    var url = 'http://' + (SAILS_HOST ? SAILS_HOST : $location.host()) + ':' + SAILS_PORT + '/host/';
    return $resource(url + ':id', {
        id: '@_id'
      },
      {
        getInfo: {method: 'GET', url: url + 'info', isArray: true}
      }
    );
  }
})();
