(function () {
  'use strict';

  angular
    .module('glaAngular')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, User, $rootScope) {

    User.confirmlogin(function onSuccess(response) {
      $log.debug('runBlock end');
      if (response.id) {
        $rootScope.user = {
          id: response.id,
          name: response.name
        };
      }
    }, function onError(err) {
      $log.error('Error with confirm-login: ', err)
    });
  }

})();
