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
        $mdDialog.hide();
        $rootScope.user = {
          id: response.id,
          name: response.name
        };
        vm.signupData = {};
        $state.go('home');
      }, function onError(err) {
        toastr.error(err.data.error, 'Error: ' + err.statusText);
        vm.signupData = {};
        $mdDialog.hide();
      });
    }
  }
})();
