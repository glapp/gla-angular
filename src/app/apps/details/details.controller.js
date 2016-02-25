(function() {
  'use strict';

  angular
    .module('glaAngular')
    .controller('AppDetailsController', AppDetailsController);

  /** @ngInject */
  function AppDetailsController($stateParams) {
    var vm = this;

    vm.app_id = $stateParams.app_id;

  }
})();
