(function() {
  'use strict';

  angular
    .module('glaAngular')
    .service('Organ', Organ);

    function Organ($resource, SAILS_HOST) {
      var url = 'http://' + SAILS_HOST + '/organ/';
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
