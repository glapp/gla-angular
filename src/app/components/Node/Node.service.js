(function() {
  'use strict';

  angular
    .module('glaAngular')
    .service('Node', Node);

    function Node($resource) {
      return $resource('http://localhost:1337/application/:id', {
          id: '@_id'
        },
        {
          getInfo: {method: 'GET', url: 'http://localhost:1337/nodes/info', isArray: true}
        }
      );
    }
})();
