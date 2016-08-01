(function() {
  'use strict';

  angular
    .module('glaAngular')
    .service('Analytics', Analytics);

  function Analytics($resource, $location, SAILS_HOST, SAILS_PORT) {
    var url = 'http://' + (SAILS_HOST ? SAILS_HOST : $location.host()) + ':' + SAILS_PORT + '/analytics/';
    return $resource(url + ':id', {
        id: '@_id'
      },
      {
        getOrganCpu: {method: 'GET', url: url + 'organCpu', isArray: true},
        getOrganMemory: {method: 'GET', url: url + 'organMemory', isArray: true},
        getEvents: {method: 'GET', url: url + 'events', isArray: true}
      }
    );
  }
})();
