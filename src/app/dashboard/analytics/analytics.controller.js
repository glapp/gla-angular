(function() {
  'use strict';

  angular
    .module('glaAngular')
    .controller('AnalyticsController', AnalyticsController);

  /** @ngInject */
  function AnalyticsController($stateParams, Policy, Application, toastr, $log) {}
})();
