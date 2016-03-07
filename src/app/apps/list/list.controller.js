(function () {
  'use strict';

  angular
    .module('glaAngular')
    .controller('AppListController', AppListController);

  /** @ngInject */
  function AppListController($mdDialog, $document, $interval, $log, Application) {
    var vm = this;

    vm.apps = [];
    vm.openAddDialog = openAddDialog;


    getApps();
    startRepeat();

    var repeat;

    function startRepeat() {
      repeat = $interval(function () {
        getApps();
      }, 3000);
    }

    function cancelRepeat() {
      if (angular.isDefined(repeat)) {
        $interval.cancel(repeat);
        repeat = undefined;
      }
    }

    function getApps() {
      Application.getUserApps(function onSuccess(response) {
        vm.apps = response.apps;
        $log.info(response);
        updateReadyCount();
        if (vm.apps.length == 0) {
          cancelRepeat();
        } else {
          var cancel = true;
          angular.forEach(vm.apps, function (app) {
            if (app.status == 'preparing') {
              cancel = false;
            }
          });
          if (cancel) {
            cancelRepeat();
          }
        }
      }, function onError(err) {
        $log.error('Error occurred with user apps: ', err);
      })
    }

    function updateReadyCount() {
      angular.forEach(vm.apps, function (app) {
        var count = 0;
        angular.forEach(app.components, function (component) {
          if (component.ready) {
            count++;
          }
        });
        app.readyCount = count;
      })
    }

    function openAddDialog(ev) {
      $mdDialog.show({
        controller: 'AddAppController',
        controllerAs: 'vm',
        templateUrl: 'app/apps/list/dialogs/addapp.html',
        clickOutsideToClose: true,
        parent: angular.element($document.body),
        targetEvent: ev
      }).then(function (app) {
        vm.apps.push(app);
        updateReadyCount();
        startRepeat();
      });
    }
  }
})();
