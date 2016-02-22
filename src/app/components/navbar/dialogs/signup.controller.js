(function () {
  'use strict';

  angular
    .module('glaAngular')
    .controller('SignupController', SignupController);

  /** @ngInject */
  function SignupController($rootScope, $state, $mdDialog, User, toastr) {
    var vm = this;

    vm.signupData = {};
    vm.signup = signup;

    function signup() {
      User.signup({name: vm.signupData.name, email: vm.signupData.email, password: vm.signupData.password}, function onSuccess(response) {
        $rootScope.user = {
          id: response.id,
          name: response.name
        };
        vm.signupData = {};
        $mdDialog.hide();
      }, function onError(err) {
        toastr.error('Error when signing up: ', err);
        vm.signupData = {};
        $mdDialog.hide();
      });
    }
  }
})();
