(function () {
  'use strict';

  angular
    .module('glaAngular')
    .directive('subNavbar', subNavbar);

  /** @ngInject */
  function subNavbar() {
    var directive = {
      restrict: 'E',
      transclude: true,
      templateUrl: 'app/components/sub-navbar/sub-navbar.html',
      scope: {
        items: '='
      },
      controller: SubNavbarController,
      controllerAs: 'snb',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function SubNavbarController($log) {
      var vm = this;

      vm.test = 'test'

    }
  }

})();
