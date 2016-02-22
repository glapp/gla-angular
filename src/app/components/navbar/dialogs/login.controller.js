(function () {
  'use strict';

  angular
    .module('glaAngular')
    .controller('LoginController', LoginController);

  /** @ngInject */
  function LoginController($rootScope, $log, User, toastr) {
    var vm = this;

    vm.loginData = {};
    vm.login = login;

    function login() {
      $log.debug(vm.loginData);
      User.login({email: vm.loginData.email, password: vm.loginData.password}, function onSuccess(response) {
        $rootScope.user = {
          id: response.id
          // TODO: Add more attributes
        };
      }, function onError(err) {
        vm.loginData = {};
        toastr.error('Error: ', err);
      });
    }
  }
})();
