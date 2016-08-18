(function () {
  'use strict';

  angular
    .module('glaAngular')
    .controller('AddAppController', AddAppController);

  /** @ngInject */
  function AddAppController($mdDialog, $log, Application) {
    var vm = this;

    vm.appData = {};
    vm.disableButton = false;
    vm.addApp = addApp;

    function addApp() {
      vm.disableButton = true;
      Application.addApp({name: vm.appData.name, gitUrl: vm.appData.gitUrl},
        function onSuccess(response) {
          $mdDialog.hide(response.app);
        },
        function onError(err) {
          $log.error('Error while creating an application: ', err);
          $mdDialog.cancel(err);
        })
    }
  }
})();
