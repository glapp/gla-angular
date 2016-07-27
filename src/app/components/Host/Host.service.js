(function() {
  'use strict';

  angular
    .module('glaAngular')
    .service('Host', Host);

    function Host($resource, SAILS_HOST) {
      var url = 'http://' + SAILS_HOST + '/host/';
      return $resource(url + ':id', {
          id: '@_id'
        },
        {
          getInfo: {method: 'GET', url: url + 'info', isArray: true}
        }
      );
    }
})();
