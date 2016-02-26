(function () {
  'use strict';

  angular
    .module('glaAngular')
    .controller('AppDetailsController', AppDetailsController);

  /** @ngInject */
  function AppDetailsController($stateParams, Application, toastr) {
    var vm = this;

    vm.navItems = [];
    vm.tabItems = [];
    vm.app = {};
    vm.selectedIndex = 3;

    getDetails();

    function getDetails() {
      Application.getAppDetails({app_id: $stateParams.app_id},
        function onSuccess(response) {
          vm.app = response.app;
          vm.navItems.push({
            name: vm.app.name,
            state: "apps.details({ app_id: '" + vm.app.id + "'})"
          });
          vm.tabItems.push({
            title: 'General',
            list: [
              {
                description: 'Status',
                content: [vm.app.status]
              },
              {
                description: 'Git URL',
                content: [vm.app.gitUrl]
              },
              {
                description: 'Created at',
                content: [vm.app.createdAt]
              }]
          });
          angular.forEach(vm.app.components, function (component) {
            vm.tabItems.push({
              title: component.originalName,
              list: [{
                description: 'Image',
                content: [component.image]
              }]
            })
          })


        }, function onError(err) {
          toastr.error(err.data, 'Error');
        });
    }

  }
})();
