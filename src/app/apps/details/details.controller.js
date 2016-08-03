(function () {
  'use strict';

  angular
    .module('glaAngular')
    .controller('AppDetailsController', AppDetailsController);

  /** @ngInject */
  function AppDetailsController($stateParams, $log, $mdDialog, $state, Application, Host, Cell, Organ, toastr) {
    var vm = this;

    vm.navItems = [];
    vm.tabItems = [];
    vm.app = {};
    vm.hosts = [];
    vm.selectedIndex = 0;
    vm.deploy = deploy;
    vm.isEmpty = isEmpty;
    vm.move = move;
    vm.scaleUp = scaleUp;
    vm.scaleDown = scaleDown;
    vm.getKeys = getKeys;
    vm.disableButton = disableButton;
    vm.selections = {};
    vm.getStatusMessage = getStatusMessage;
    vm.openScenarioDialog = openScenarioDialog;
    vm.remove = remove;
    vm.undeploy = undeploy;
    vm.rename = rename;
    vm.newName = "";

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
          .ok('Let\'s do this!')
      )
    }

    function disableButton(data, labels) {
      if (!labels) return true;

      // Check whether all the "no preference" buttons are pressed, which doesn't make sense
      var disable = true;
      angular.forEach(data, function (value, key) {
        if (value != '' && value != labels[key]) {
          disable = false;
        }
      });
      return disable;
    }

    function getDetails() {
      Application.getAppDetails({app_id: $stateParams.app_id},
        function onSuccess(response) {
          $log.info(response);
          vm.app = response;
          vm.navItems = [{
            name: vm.app.name,
            state: "apps.details({ app_id: '" + vm.app.id + "'})"
          }];
        }, function onError(err) {
          toastr.error(err.data.json, 'Error');
        });
      Host.getInfo(
        function onSuccess(response) {
          vm.hosts = response;
          vm.selections = {};
          angular.forEach(response, function (host) {
            angular.forEach(Object.keys(host.labels), function (key) {
              if (mapping[key]) {
                if (!vm.selections[key]) vm.selections[key] = {};
                var length = vm.selections[key];
                angular.forEach(mapping[key], function (map) {
                  if (host.labels[key] == map[0]) {
                    if (!vm.selections[key][map[0]]) {
                      vm.selections[key][map[0]] = map[1];
                    }
                  }
                });
                if (vm.selections[key].length == length) {
                  $log.warn('Unknown value for the label ' + key + ': ' + host.labels[key] + '. Please add a mapping for this value.')
                }
              }
            })
          });
          $log.info(vm.selections)
        }, function onError(err) {
          toastr.error(err.data.json, 'Error');
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

    function scaleUp(organ) {
      Organ.scaleUp({organ_id: organ.id}, function onSuccess(response) {
        $log.info(response);
        toastr.success('Scaled Up!', 'Info');
        getDetails();
      }, function onError(err) {
        $log.error(err);
        toastr.error(err.data.json, 'Error');
      })
    }

    function scaleDown(organ, cell) {
      Organ.scaleDown({organ_id: organ.id, cell_id: cell.id}, function onSuccess(response) {
        $log.info(response);
        toastr.success('Killed!', 'Info');
        getDetails();
      }, function onError(err) {
        $log.error(err);
        toastr.error(err.data.json, 'Error');
      })
    }

    function move(cell, opt) {

      if (!cell.host) {
        toastr.error('Couldn\'t move!', 'Error');
        return;
      }

      cell.moving = true;

      Cell.move({
        cell_id: cell.id,
        options: opt
      }, function onSuccess(response) {
        $log.info(response);
        cell.moving = false;
        toastr.success('Moved!', 'Info');
        getDetails();
      }, function onError(err) {
        $log.error(err);
        cell.moving = false;
        toastr.error(err.data.json, 'Error');
      });
    }

    function undeploy() {
      vm.app.undeploying = true;
      Application.undeploy({app_id: vm.app.id},
        function onSuccess(response) {
          $log.info(response);
          getDetails();
          vm.app.undeploying = false;
          toastr.success('Successfully undeployed ' + vm.app.name + '!', 'Info');
        }, function onError(err) {
          $log.error(err);
          vm.app.undeploying = false;
        })
    }

    function rename() {
      vm.app.renaming = true;
      Application.rename({app_id: vm.app.id, name: vm.newName},
        function onSuccess(response) {
          $log.info(response);
          vm.app.name = vm.newName;
          vm.app.renaming = false;
          toastr.success('Successfully renamed to ' + vm.app.name + '!', 'Info');
        }, function onError(err) {
          $log.error(err);
          vm.app.renaming = false;
        })
    }

    function remove() {
      vm.app.removing = true;
      Application.remove({app_id: vm.app.id},
        function onSuccess(response) {
          $log.info(response);
          vm.app.removing = false;
          $state.go('apps.list');
          toastr.success('Successfully removed application!', 'Info');
        }, function onError(err) {
          $log.error(err);
          vm.app.removing = false;
        })
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
        ['virtualbox', 'Virtualbox'],
        ['google', 'Google Cloud Platform']
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
      1: '<ul><li>The voting application goes live. As it is announced and spread through various social media, more and more people are going to the website to vote.</li><li>The platform detects an increase in CPU utilization of the voting cell.</li><li>The platform moves the instance of voting cell (component) to a higher tier cloud server.</li>',
      2: '<ul><li>Due to the difference in timezone, number of voters from different geographical regions varies throughout the day.</li><li>An increase of users from a different geographical region (for instance, users coming from the United States) results in an increase of response time.</li><li>From the application metric data of response time and IP address, the platform detects this increase in response time.</li><li>The platform then moves the cell to cloud servers in the United States to reduce the response time.</li></ul>',
      3: '<ul><li>There is a price change for cloud server from AWS and the cost is lower than that of Digital Ocean.</li><li>The platform received the change in price metric data and computes the new cost.</li><li>The platform then moves the cells to AWS which has a lower cost.</li></ul>'
    }
  }

})();
