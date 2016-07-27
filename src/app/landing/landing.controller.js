(function() {
  'use strict';

  angular
    .module('glaAngular')
    .controller('LandingController', LandingController);

  /** @ngInject */
  function LandingController(SAILS_HOST) {
    var vm = this;

    console.log(SAILS_HOST);
    vm.sails = SAILS_HOST;
    vm.test = 'landingTest'

  }
})();
