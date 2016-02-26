(function() {
  'use strict';

  angular
    .module('glaAngular')
    .controller('AppDetailsController', AppDetailsController);

  /** @ngInject */
  function AppDetailsController($stateParams, Application, toastr) {
    var vm = this;

    vm.navItems = [];

    vm.app = {};

    getDetails();

    function getDetails() {
      Application.getAppDetails({app_id: $stateParams.app_id},
        function onSuccess(response) {
          vm.app = response.app;
          vm.navItems.push({
            name: vm.app.name,
            state: "apps.details({ app_id: '" + vm.app.id + "'})"
          })
        }, function onError(err) {
          toastr.error(err.data, 'Error');
        });
    }

  }
})();
