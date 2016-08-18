(function() {
  'use strict';

  angular
    .module('glaAngular')
    .controller('SettingsController', SettingsController);

  /** @ngInject */
  function SettingsController($stateParams, Application, toastr, $log, $state, Host) {

    var vm = this;

    vm.graphs = ['cpu','memory','response_time','events'];
    vm.buttons = ['30m','1h','12h','24h','7D'];
    vm.name = '';
    vm.newName = "";
    vm.app = {};
    vm.hosts = [];
    vm.rename = rename;
    vm.deploy = deploy;
    vm.undeploy = undeploy;
    vm.remove = remove;

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
          toastr.error(err.data, 'Error deploying the app');
          vm.app.deploying = false;
        })
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
          toastr.error(err.data, 'Error undeploying the app');
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
          toastr.error(err.data, 'Error renaming the app');
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
          toastr.error(err.data, 'Error removing the app');
          vm.app.removing = false;
        })
    }


    function getDetails() {
      Application.getAppDetails({app_id: $stateParams.app_id},
        function onSuccess(response) {
          $log.info(response);
          vm.app = response;
          vm.name = vm.app.name;
          vm.navItems = [{
            name: vm.app.name,
            state: "apps.details({ app_id: '" + vm.app.id + "'})"
          }];
        }, function onError(err) {
          toastr.error(err.data, 'Error');
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
          toastr.error(err.data, 'Error');
        })
    }



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


  }
})();




