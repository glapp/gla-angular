(function() {
  'use strict';

  angular
    .module('glaAngular')
    .controller('HomeController', HomeController);

  /** @ngInject */
  function HomeController($rootScope, $state, toastr) {
    var vm = this;

    vm.showToastr = showToastr;

    function showToastr() {
      toastr.info('GLA FTW!');
    }
  }
})();
