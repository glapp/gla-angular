(function() {
  'use strict';

  angular
    .module('glaAngular')
    .service('Organ', Organ);

    function Organ($resource) {
      return $resource('http://localhost:1337/organ/:id', {
          id: '@_id'
        },
        {
          scaleUp: {method: 'POST', url: 'http://localhost:1337/organ/scaleUp', isArray: false},
          scaleDown: {method: 'POST', url: 'http://localhost:1337/organ/scaleDown', isArray: false}
        }
      );
    }
})();
