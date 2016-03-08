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

    // TODO: Change them dynamically
    vm.selections = {};

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
          vm.selections = {};
          angular.forEach(response, function (node) {
            angular.forEach(Object.keys(node.labels), function (key) {
              if (mapping[key]) {
                if (!vm.selections[key]) vm.selections[key] = [];
                var length = vm.selections[key];
                angular.forEach(mapping[key], function (map) {
                  if (node.labels[key] == map[0]) {
                    var alreadyThere = false;
                    angular.forEach(vm.selections[key], function (entry) {
                      if (entry[0] == map[0]) {
                        alreadyThere = true;
                      }
                    });
                    if (!alreadyThere) {
                      vm.selections[key].push(map)
                    }
                  }
                });
                if (vm.selections[key].length == length) {
                  $log.warn('Unknown value for the label ' + key + ': ' + node.labels[key] + '. Please add a mapping for this value.')
                }
              }
            })
          })
          $log.info(vm.selections)
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

    function move(component, opt) {

      // TODO: set opt values to undefined


      Application.move({
        component_id: component.id,
        options: opt
      }, function onSuccess(response) {
        $log.info(response);
        getDetails();
      }, function onError(err) {
        $log.error(err);
        toastr.error(err.data, 'Error');
      });
    }

    function disableMove() {
      return false;
    }

    var mapping = {
      region: [
        ['us', 'USA'],
        ['eu', 'Europe']
      ],
      tier: [
        ['1', 'Tier 1'],
        ['2', 'Tier 2']
      ],
      provider: [
        ['aws', 'AWS'],
        ['digitalocean', 'Digital Ocean'],
        ['virtualbox', 'Virtualbox']
      ]
    }
  }
})();
