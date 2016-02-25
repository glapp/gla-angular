(function() {
  'use strict';

  angular
    .module('glaAngular')
    .controller('AppsController', AppsController);

  /** @ngInject */
  function AppsController() {
    var vm = this;

    vm.apps = [];

  }
})();
