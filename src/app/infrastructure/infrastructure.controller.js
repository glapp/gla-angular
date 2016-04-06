(function () {
  'use strict';

  angular
    .module('glaAngular')
    .controller('InfrastructureController', InfrastructureController);

  /** @ngInject */
  function InfrastructureController($log, Host, toastr) {
    var vm = this;

    vm.hosts = [];
    vm.tabItems = [];

    getNodeInfo();

    function getNodeInfo() {
      Host.getInfo({},
        function onSuccess(response) {
          $log.info(response);
          vm.hosts = response;
          fillList();
        },
        function onError(err) {
          toastr.error(err.data, 'Error:');
        })
    }

    function fillList() {
      vm.tabItems = [];

      angular.forEach(vm.hosts, function (host) {
        var labels = [];
        for (var key in host.labels) {
          labels.push(key + ': ' + host.labels[key]);
        }
        var title = host.name;
        var length = host.name.length;
        if (length > 8) {
          title = host.name.substring(0, 2) + '...' + host.name.substring(length - 5);
        }
        var cells = host.cells.map(function (cell) {
          return cell.name;
        });

        vm.tabItems.push({
          title: title,
          list: [
            {
              description: 'Name',
              content: [host.name]
            },
            {
              description: 'IP',
              content: [host.ip]
            },
            {
              description: 'Status',
              content: [host.status]
            },
            {
              description: 'Labels',
              content: labels
            },
            {
              description: 'Reserved CPUs',
              content: [host.reservedCPUs]
            },
            {
              description: 'Reserved Memory',
              content: [host.reservedMemory]
            },
            {
              description: 'Cells',
              content: cells
            }
          ]
        });
      });
    }
  }
})();
