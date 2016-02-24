(function() {
  'use strict';

  angular
    .module('glaAngular')
    .controller('LandingController', LandingController);

  /** @ngInject */
  function LandingController() {
    var vm = this;

    vm.test = 'landingTest'

  }
})();
