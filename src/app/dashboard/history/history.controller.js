(function() {
  'use strict';

  angular
    .module('glaAngular')
    .controller('HistoryController', HistoryController);

  /** @ngInject */
  function HistoryController($stateParams, Policy, Application, toastr, $log) {

    var vm = this;

    vm.logs = getLog();


// To get the change logs associated with the given application ID
    function getLog(){
      var items = [];
      Application.getAppDetails({app_id: $stateParams.app_id},
        function onSuccess(response) {
          response.log.forEach(function(log){
            items.push(log);
          });

        }, function onError(err) {
          toastr.error(err.data, 'Error');
        });

      $log.info(items);
      return items;
    }

  }
})();




