(function () {
  'use strict';

  angular
    .module('glaAngular')
    .directive('panelWidget', panelWidget);

  /** @ngInject */
  function panelWidget() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/panelWidget/panelWidget.html',
      replace: true,
      transclude: true,
      scope: {title: '@', template: '@', options: '@'},
      compile: function (element, attrs, linker) {
        return function (scope, element) {
          linker(scope, function (clone) {
            element.append(clone);
          });
        };
      }
    };

    return directive;
  }
})();
