(function () {
  'use strict';

  angular
    .module('glaAngular')
    .service('Organ', Organ);

  function Organ($resource, $location, SAILS_HOST, SAILS_PORT) {
    var url = 'http://' + (SAILS_HOST ? SAILS_HOST : $location.host()) + ':' + SAILS_PORT + '/organ/';
    return $resource(url + ':id', {
        id: '@_id'
      },
      {
        scaleUp: {method: 'POST', url: url + 'scaleUp', isArray: false},
        scaleDown: {method: 'POST', url: url + 'scaleDown', isArray: false}
      }
    );
  }
})();
