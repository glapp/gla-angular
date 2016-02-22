(function() {
  'use strict';

  angular
    .module('glaAngular')
    .controller('AppsController', AppsController);

  /** @ngInject */
  function AppsController($mdDialog, $document, $log, Application) {
    var vm = this;

    vm.apps = [];
    vm.openAddDialog = openAddDialog;

    getApps();

    function getApps() {
      Application.getUserApps(function onSuccess(response) {
        vm.apps = response.apps;
      }, function onError(err) {
        $log.error('Error occurred with user apps: ', err);
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
      }).then(function(app) {
        vm.apps.push(app);
      });
    }
  }
})();
