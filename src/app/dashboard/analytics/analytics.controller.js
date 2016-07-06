(function() {
  'use strict';

  angular
    .module('glaAngular')
    .controller('AnalyticsController', AnalyticsController);

  /** @ngInject */
  function AnalyticsController($stateParams, Policy, Application, toastr, $log) {

    var vm = this;

    vm.graphs = ['cpu','memory','response_time','events'];
    vm.buttons = ['30m','1h','12h','24h','7D'];

    vm.organs = getOrgans();


    vm.option = '..';


/*
    function getSelectedOption(){
      if (vm.option !== undefined){
        return "You have selected: Item " + vm.option;
      } else {
        return "Please select an item";
      }
    }
*/



// To get the list of organs associated with the given application ID
    function getOrgans(){
      var items = [];
      Application.getAppDetails({app_id: $stateParams.app_id},
        function onSuccess(response) {
          response.organs.forEach(function(organ){
            items.push({id: organ.originalName, label: organ.originalName});
          });

        }, function onError(err) {
          toastr.error(err.data, 'Error');
        });

      $log.info(items);
      return items;
    }

    //Converts data from sails/prometheus to nvd3 format






    vm.sails_data = {
      "data": [
        {timestamp: 1200, value: 23},
        {timestamp: 1202, value: 28},
        {timestamp: 1204, value: 22},
        {timestamp: 1207, value: 35},
        {timestamp: 1210, value: 37},
        {timestamp: 1212, value: 39},
        {timestamp: 1214, value: 23}
      ],
      "number": 123,
      "string": "Hello World"
    };


    vm.d3_test_data = [
      {
        "values": [
          {
            "x": 0,
            "y": 5,
            "series": 0
          },
          {
            "x": 1,
            "y": 6,
            "series": 0
          },
          {
            "x": 2,
            "y": 9,
            "series": 0
          },
          {
            "x": 3,
            "y": 9,
            "series": 0
          },
          {
            "x": 4,
            "y": 14,
            "series": 0
          },
          {
            "x": 5,
            "y": 12,
            "series": 0
          }
        ],
        "key": "CPU",
        "color": "ed5818"
      }
    ];

  }
})();




