(function() {
  'use strict';

  angular
    .module('glaAngular')
    .service('Analytics', Analytics);

  function Analytics($resource) {
    return $resource('http://localhost:1337/analytics/:id', {
        id: '@_id'
      },
      {
        getOrganCpu: {method: 'GET', url: 'http://localhost:1337/analytics/organCpu', isArray: true},
        getOrganMemory: {method: 'GET', url: 'http://localhost:1337/analytics/organMemory', isArray: true},
        getEvents: {method: 'GET', url: 'http://localhost:1337/analytics/events', isArray: true}
      }
    );
  }
})();
