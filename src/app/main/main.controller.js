(function() {
  'use strict';

  angular
    .module('glaAngular')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController(toastr) {
    var vm = this;

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.showToastr = showToastr;

    function showToastr() {
      toastr.info('GLA FTW!');
      vm.classAnimation = '';
    }
  }
})();
