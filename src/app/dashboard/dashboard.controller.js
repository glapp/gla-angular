(function() {
  'use strict';

  angular
    .module('glaAngular')
    .controller('DashboardController', DashboardController);

  /** @ngInject */
  function DashboardController($mdDialog, $document) {
    var vm = this;
    vm.test = "test";
    vm.showAlert = showAlert;

    function showAlert(ev){
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element($document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('Message')
          .textContent('Just a placeholder action. Redirect the button to the page you see fit.')
          .ok('Got it!')
          .targetEvent(ev)
      )
    }



  }
})();
