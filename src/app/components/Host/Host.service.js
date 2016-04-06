(function() {
  'use strict';

  angular
    .module('glaAngular')
    .service('Host', Host);

    function Host($resource) {
      return $resource('http://localhost:1337/host/:id', {
          id: '@_id'
        },
        {
          getInfo: {method: 'GET', url: 'http://localhost:1337/host/info', isArray: true}
        }
      );
    }
})();
