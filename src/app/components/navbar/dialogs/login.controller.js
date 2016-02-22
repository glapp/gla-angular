(function () {
  'use strict';

  angular
    .module('glaAngular')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($rootScope, $mdDialog, User, toastr) {
    var vm = this;

    vm.loginData = {};
    vm.login = login;

    function login() {
      User.login({email: vm.loginData.email, password: vm.loginData.password}, function onSuccess(response) {
        $rootScope.user = {
          id: response.id,
          name: response.name
        };
        vm.loginData = {};
        $mdDialog.hide();
      }, function onError(err) {
        toastr.error('Error when signing in: ', err);
        vm.loginData = {};
        $mdDialog.hide();
      });
    }
  }
})();
