(function () {
  'use strict';

  angular
    .module('glaAngular')
    .controller('AppPolicyController', AppPolicyController);

  /** @ngInject */
  function AppPolicyController($log) {
    var vm = this;

    vm.test= 'test';
    $log.info(vm.test);

  }
})();
