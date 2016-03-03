(function () {
  'use strict';

  angular
    .module('glaAngular')
    .controller('InfrastructureController', InfrastructureController);

  /** @ngInject */
  function InfrastructureController($log, Node, toastr) {
    var vm = this;

    vm.nodes = [];
    vm.tabItems = [];

    getNodeInfo();

    function getNodeInfo() {
      Node.getInfo({},
        function onSuccess(response) {
          $log.info(response);
          vm.nodes = response;
          fillList();
        },
        function onError(err) {
          toastr.error(err.data, 'Error:');
        })
    }

    function fillList() {
      vm.tabItems = [];
      angular.forEach(vm.nodes, function (node) {
        var labels = [];
        for (var key in node.labels) {
          labels.push(key + ': ' + node.labels[key]);
        }
        var title = node.name;
        var length = node.name.length;
        if (length > 8) {
          title = node.name.substring(0,2) + '...' + node.name.substring(length - 5);
        }
        vm.tabItems.push({
          title: title,
          list: [
            {
              description: 'Name',
              content: [node.name]
            },
            {
              description: 'IP',
              content: [node.ip]
            },
            {
              description: 'Status',
              content: [node.status]
            },
            {
              description: 'Labels',
              content: labels
            },
            {
              description: 'Reserved CPUs',
              content: [node.reservedCPUs]
            },
            {
              description: 'Reserved Memory',
              content: [node.reservedMemory]
            }
          ]
        });
      });
    }
  }
})();
