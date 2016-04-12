(function() {
  'use strict';

  angular
    .module('glaAngular')
    .service('Cell', Cell);

    function Cell($resource) {
      return $resource('http://localhost:1337/cell/:id', {
          id: '@_id'
        },
        {
          move: {method: 'POST', url: 'http://localhost:1337/cell/move', isArray: false}
        }
      );
    }
})();
