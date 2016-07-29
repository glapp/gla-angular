(function () {
  'use strict';

  angular
    .module('glaAngular')
    .service('Cell', Cell);

  function Cell($resource, $location, SAILS_HOST, SAILS_PORT) {
    var url = 'http://' + (SAILS_HOST ? SAILS_HOST : $location.host()) + ':' + SAILS_PORT + '/cell/';
    return $resource(url + ':id', {
        id: '@_id'
      },
      {
        move: {method: 'POST', url: url + '/move', isArray: false}
      }
    );
  }
})();
