(function () {
  'use strict';

  angular
    .module('glaAngular')
    .controller('AppDetailsController', AppDetailsController);

  /** @ngInject */
  function AppDetailsController($stateParams, $log, Application, toastr) {
    var vm = this;

    vm.navItems = [];
    vm.tabItems = [];
    vm.app = {};
    vm.selectedIndex = 0;
    vm.deploy = deploy;
    vm.disableDeploy = disableDeploy;
    vm.isEmpty = isEmpty;

    getDetails();

    function deploy() {
      Application.deploy({app_id: vm.app.id},
        function onSuccess(response) {
          vm.app = response;
          fillList();
        }, function onError(err) {
          $log.error(err);
        })
    }

    function disableDeploy() {
      return vm.app.status != 'ready'
    }

    function getDetails() {
      Application.getAppDetails({app_id: $stateParams.app_id},
        function onSuccess(response) {
          $log.info(response);
          vm.app = response;
          vm.navItems.push({
            name: vm.app.name,
            state: "apps.details({ app_id: '" + vm.app.id + "'})"
          });
          fillList();
        }, function onError(err) {
          toastr.error(err.data, 'Error');
        });
    }


    function isEmpty(content) {
      var empty = true;
      angular.forEach(content, function(element) {
        if (element && element != undefined && element != '') {
          empty = false;
        }
      });
      return empty;
    }

    function fillList() {
      vm.tabItems = [];
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
        var hostname = component.node ? component.node.name : undefined;
        var hostip = component.node ? component.node.ip : undefined;
        vm.tabItems.push({
          title: component.originalName,
          list: [
            {
              description: 'Image',
              content: [component.image]
            },
            {
              description: 'Host',
              content: [hostname, hostip]
            },
            {
              description: 'Ready',
              content: [component.ready]
            },
            {
              description: 'Environment',
              content: component.environment
            },
            {
              description: 'Published ports',
              content: component.ports
            },
            {
              description: 'Exposed ports',
              content: component.expose
            }]
        })
      })
    }
  }
})();
