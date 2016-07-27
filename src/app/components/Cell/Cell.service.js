(function() {
  'use strict';

  angular
    .module('glaAngular')
    .service('Cell', Cell);

    function Cell($resource, SAILS_HOST) {
      var url = 'http://' + SAILS_HOST + '/cell/';
      return $resource(url + ':id', {
          id: '@_id'
        },
        {
          move: {method: 'POST', url: url + '/move', isArray: false}
        }
      );
    }
})();
