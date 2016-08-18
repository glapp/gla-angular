(function () {
  'use strict';

  angular
    .module('glaAngular')
    .controller('AppsController', AppsController);

  /** @ngInject */
  function AppsController($mdDialog, $document, $interval, $log, Application, toastr) {
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

    function fillApps() {
      $log.info(vm.apps);
      angular.forEach(vm.apps, function(app) {
        var organs = 0;
        var cells = 0;
        var actions = 0;
        //organs & cells
        angular.forEach(app.organs, function(organ) {
          organs++;
          angular.forEach(organ.cells, function(cell) {
            cells++;
          });
        });
        //actions
        angular.forEach(app.log, function() {
          actions++
        });
        app.organCount = organs;
        app.cellCount = cells;
        app.actionCount = actions;

      })
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
        fillApps();
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
        angular.forEach(app.organs, function (organ) {
          if (organ.ready) {
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
        templateUrl: 'app/apps/dialogs/addapp.html',
        clickOutsideToClose: true,
        parent: angular.element($document.body),
        targetEvent: ev
      }).then(function (app) {
        if (app) {
          vm.apps.push(app);
          updateReadyCount();
          startRepeat();
        }
      }).catch(function (err) {
        toastr.error(err.data || err.statusText, 'Error');
      });
    }
  }
})();
