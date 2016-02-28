(function () {
  'use strict';

  angular
    .module('glaAngular')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController($rootScope, $state, $mdDialog, $document, User, toastr) {
      var vm = this;

      vm.openLogin = openLogin;
      vm.openSignup = openSignup;
      vm.openMenu = openMenu;
      vm.isAuth = isAuth;
      vm.logout = logout;
      vm.changeState = changeState;

      var originatorEv;

      function changeState(name) {
        $state.go(name);
      }

      function openMenu($mdOpenMenu, ev) {
        originatorEv = ev;
        $mdOpenMenu(ev);
      }

      function openLogin() {
        $mdDialog.show({
          controller: 'LoginController',
          controllerAs: 'vm',
          templateUrl: 'app/components/navbar/dialogs/login.html',
          clickOutsideToClose: true,
          parent: angular.element($document.body),
          targetEvent: originatorEv
        });
        originatorEv = null;
      }

      function isAuth() {
        return $rootScope.user;
      }

      function openSignup() {
        $mdDialog.show({
          controller: 'SignupController',
          controllerAs: 'vm',
          templateUrl: 'app/components/navbar/dialogs/signup.html',
          clickOutsideToClose: true,
          parent: angular.element($document.body),
          targetEvent: originatorEv
        });
        originatorEv = null;
      }

      function logout() {
        User.logout(function onSuccess() {
          $rootScope.user = null;
          $state.go('landing');
        }, function onError(err) {
          toastr.error('Error: ', err.data);
          $state.go('landing');
        })
      }

    }
  }

})();
