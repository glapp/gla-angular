(function () {
  'use strict';

  angular
    .module('glaAngular')
    .controller('AppDetailsController', AppDetailsController);

  /** @ngInject */
  function AppDetailsController($stateParams, $log, Application, Node, toastr) {
    var vm = this;

    vm.navItems = [];
    vm.tabItems = [];
    vm.app = {};
    vm.nodes = [];
    vm.selectedIndex = 0;
    vm.deploy = deploy;
    vm.disableDeploy = disableDeploy;
    vm.isEmpty = isEmpty;
    vm.disableMove = disableMove;
    vm.move = move;

    getDetails();

    function deploy() {
      Application.deploy({app_id: vm.app.id},
        function onSuccess(response) {
          vm.app = response;
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
          if (vm.navItems.length == 0) {
            vm.navItems.push({
              name: vm.app.name,
              state: "apps.details({ app_id: '" + vm.app.id + "'})"
            });
          }
        }, function onError(err) {
          toastr.error(err.data, 'Error');
        });
      Node.getInfo(
        function onSuccess(response) {
          vm.nodes = response;
        }, function onError(err) {
          toastr.error(err.data, 'Error');
        })
    }


    function isEmpty(content) {
      var empty = true;
      angular.forEach(content, function (element) {
        if (element && element != undefined && element != '') {
          empty = false;
        }
      });
      return empty;
    }

    function move(component, goal_node) {
      Application.move({
        component_id: component.id,
        goal_node: goal_node.name
      }, function onSuccess(response) {
        $log.info(response);
        getDetails();
      }, function onError(err) {
        $log.error(err);
        toastr.error(err.data, 'Error');
      });
    }

    function disableMove() {
      return false
    }
  }
})();
