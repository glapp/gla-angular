(function() {
  'use strict';

  angular
    .module('glaAngular')
    .controller('AppDetailsController', AppDetailsController);

  /** @ngInject */
  function AppDetailsController($stateParams, Application, toastr) {
    var vm = this;

    vm.app = {};

    getDetails();

    function getDetails() {
      Application.getAppDetails({app_id: $stateParams.app_id},
        function onSuccess(response) {
          vm.app = response.app;
        }, function onError(err) {
          toastr.error(err.data, 'Error');
        });
    }

  }
})();
