(function() {
  'use strict';

  angular
    .module('glaAngular')
    .controller('InfrastructureController', InfrastructureController);

  /** @ngInject */
  function InfrastructureController(Node, toastr) {
    var vm = this;

    vm.nodes = getNodeInfo();

    function getNodeInfo() {
      Node.getInfo({},
      function onSuccess(response) {
        return response;
      },
      function onError(err) {
        toastr.error(err.data, 'Error:');
        return [];
      })
    }

  }
})();
