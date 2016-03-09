(function () {
  'use strict';

  angular
    .module('glaAngular')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($rootScope, $state, $mdDialog, $log, User, toastr) {
    var vm = this;

    vm.loginData = {};
    vm.login = login;

    function login() {
      User.login({email: vm.loginData.email, password: vm.loginData.password}, function onSuccess(response) {
        $mdDialog.hide();
        $rootScope.user = {
          id: response.id,
          name: response.name
        };
        vm.loginData = {};
        $state.go('apps.list');
      }, function onError(err) {
        $log.error(err);
        toastr.error(err.statusText, 'Error while signing in');
        vm.loginData = {};
        $mdDialog.hide();
      });
    }
  }
})();
