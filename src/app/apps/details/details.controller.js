(function () {
  'use strict';

  angular
    .module('glaAngular')
    .controller('AppDetailsController', AppDetailsController);

  /** @ngInject */
  function AppDetailsController($stateParams, $log, $mdDialog, Application, Node, toastr) {
    var vm = this;

    vm.navItems = [];
    vm.tabItems = [];
    vm.app = {};
    vm.nodes = [];
    vm.selectedIndex = 0;
    vm.deploy = deploy;
    vm.isEmpty = isEmpty;
    vm.disableMove = disableMove;
    vm.move = move;
    vm.getKeys = getKeys;
    vm.disableButton = disableButton;
    vm.selections = {};
    vm.getStatusMessage = getStatusMessage;
    vm.openScenarioDialog = openScenarioDialog;

    getDetails();

    function deploy() {
      vm.app.deploying = true;
      Application.deploy({app_id: vm.app.id},
        function onSuccess(response) {
          $log.info(response);
          getDetails();
          vm.app.deploying = false;
          toastr.success('Successfully deployed ' + vm.app.name + '!', 'Info');
        }, function onError(err) {
          $log.error(err);
          vm.app.deploying = false;
        })
    }

    function openScenarioDialog(ev, scenario) {
      $mdDialog.show(
        $mdDialog.alert()
          .title('Scenario ' + scenario)
          .content(scenarios[scenario])
          .clickOutsideToClose(true)
          .targetEvent(ev)
          .ok('Let\s do this!')
      )
    }

    function disableButton(data, labels) {
      if (!labels) return true;

      // Check whether all the "no preference" buttons are pressed, which doesn't make sense
      var disable = true;
      angular.forEach(data, function (value) {
        if (value != '') {
          disable = false;
        }
      });
      if (disable) return disable;

      // Check whether it's the same configuration as before
      disable = true;
      angular.forEach(data, function (value, key) {
        if (value != labels[key]) {
          disable = false
        }
      });
      return disable
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
                if (!vm.selections[key]) vm.selections[key] = {};
                var length = vm.selections[key];
                angular.forEach(mapping[key], function (map) {
                  if (node.labels[key] == map[0]) {
                    if (!vm.selections[key][map[0]]) {
                      vm.selections[key][map[0]] = map[1];
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

    function getStatusMessage(reqStatus) {
      if (status[reqStatus]) return status[reqStatus];
      return undefined;
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
      var oldNode;

      if (component.node) {
        oldNode = component.node.name;
      } else {
        toastr.error('Couldn\'t move!', 'Error');
        return;
      }

      component.moving = true;

      Application.move({
        component_id: component.id,
        options: opt
      }, function onSuccess(response) {
        $log.info(response);
        component.moving = false;
        toastr.success('Successfully moved ' + component.originalName + ' from ' + oldNode + ' to ' + response.node + '!', 'Info');
        getDetails();
      }, function onError(err) {
        $log.error(err);
        component.moving = false;
        toastr.error(err.data, 'Error');
      });
    }

    function disableMove() {
      return false;
    }

    function getKeys(obj) {
      return Object.keys(obj).sort();
    }

    var status = {
      ready: 'The application is prepared on every host and ready to deploy.',
      preparing: 'The application is being prepared on every host.',
      failed: 'Something went wrong during the preparation / deployment phase.',
      deployed: 'The application is deployed. Check the other tabs to check on the states of the individual components.'
    };

    var mapping = {
      provider: [
        ['amazonec2', 'Amazon EC2'],
        ['digitalocean', 'Digital Ocean'],
        ['virtualbox', 'Virtualbox']
      ],
      region: [
        ['us', 'USA'],
        ['eu', 'Europe']
      ],
      tier: [
        ['1', 'Tier 1'],
        ['2', 'Tier 2']
      ]
    };

    var scenarios = {
      1: 'Scenario 1 description',
      2: 'Scenario 2 description',
      3: 'Scenario 3 description'
    }
  }

})();
