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
    function NavbarController($window, $rootScope, $mdDialog, $document, User, toastr) {
      var vm = this;

      vm.openLogin = openLogin;
      vm.signup = signup;
      vm.openMenu = openMenu;
      vm.isAuth = isAuth;
      vm.logout = logout;

      var originatorEv;

      function openMenu($mdOpenMenu, ev) {
        originatorEv = ev;
        $mdOpenMenu(ev);
      }

      function openLogin() {
        $mdDialog.show({
          controller: 'LoginController',
          templateUrl: 'app/components/navbar/dialogs/login.html',
          parent: angular.element($document.body),
          targetEvent: originatorEv
        });
        originatorEv = null;
      }

      function isAuth() {
        return $rootScope.user;
      }

      function signup() {
        var email = 'islerfab@gmail.com';
        User.signup({email: 'islerfab@gmail.com', password: '111111'}, function onSuccess(response) {
          $rootScope.user = {
            id: response.id
            // TODO: Add more attributes
          };
        }, function onError(err) {
          if (err.status == 400) {
            toastr.error('That email address has already been taken, please try again.', 'Error');
          }
        });
      }

      function logout() {
        User.logout(function onSuccess(response) {
          $rootScope.user = null;
          $window.location.reload();
        }, function onError(err) {
          toastr.error('Error: ', err);
        })
      }

    }
  }

})();
