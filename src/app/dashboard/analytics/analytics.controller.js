(function() {
  'use strict';

  angular
    .module('glaAngular')
    .controller('AnalyticsController', AnalyticsController);

  /** @ngInject */
  function AnalyticsController($scope, $stateParams, Analytics, $filter, $interval, Application, toastr) {

    var vm = this;

    vm.graphs = ['cpu','memory','response_time','events'];
    vm.buttons = ['10m','30m','1h','12h','24h'];

    vm.organs = getOrgans();


    vm.option = '..';
    vm.test = '';

    initializeCharts('10m');

    vm.selected_organ_cpu = '';
    vm.selected_organ_memory = '';
    vm.selected_time_cpu = '10m';
    vm.selected_time_memory = '10m';
    vm.events = eventData();


    //Destroys all the graph_refresh_intervals on route change
    $scope.$on("$destroy",function(){
      if (angular.isDefined(vm.cpu_interval || vm.memory_interval || vm.event_interval)) {
        $interval.cancel(vm.cpu_interval);
        $interval.cancel(vm.memory_interval);
        $interval.cancel(vm.event_interval);
      }
    });

    // To capture the time parameter from buttons in the view
    vm.button_memory = function(value){
      vm.selected_time_memory = value;
      return value;
    };

    vm.button_cpu = function(value){
      vm.selected_time_cpu = value;
      return value;
    };

    // Refreshes the chart based on the choosen organ and timespan values
    vm.reRun = function(cpu, memory){
      cpu = cpu || false;
      memory = memory || false;

      if (cpu){
        if (vm.selected_organ_cpu == '') {
          toastr.error('Please select an organ');
        } else {
          $interval.cancel(vm.cpu_interval);
          cpuChart(vm.selected_organ_cpu, vm.selected_time_cpu);
          //$log.info("cpu - "+ vm.selected_organ_cpu +"..."+ vm.selected_time_cpu);
        }}
      else if (memory){
        if (vm.selected_organ_memory == ''){
          toastr.error('Please select an organ');
        }else {
          $interval.cancel(vm.memory_interval);
          memoryChart(vm.selected_organ_memory, vm.selected_time_memory);
          //$log.info("memory - "+vm.selected_organ_memory +"..."+ vm.selected_time_memory);
        }}
    };



    // To initialize all the charts (default: first_organ)
    function initializeCharts(timespan){
      var items = [];
      Application.getAppDetails({app_id: $stateParams.app_id},
        function onSuccess(response) {
          response.organs.forEach(function(organ){
            items.push({id: organ.id, label: organ.originalName});
          });

          eventChart();
          cpuChart(items[0].id, timespan);
          memoryChart(items[0].id, timespan);

        }, function onError(err) {
          toastr.error(err.data, 'Error');
        });
    }


    // gets the list of events associated with an application ID
    function eventData() {
      var items = [];
      Analytics.getEvents({app_id: $stateParams.app_id},
      function onSuccess(response){
        response.forEach(function(item){
          items.push({id: item.id, content: item.content, time: item.createdAt })
        });
      }, function onError(err) {
          toastr.error(err.data, 'Error');
        });
      return items;
    }


    // To get the list of organs associated with the given application ID
    function getOrgans(){
      var items = [];
      Application.getAppDetails({app_id: $stateParams.app_id},
        function onSuccess(response) {
          response.organs.forEach(function(organ){
            items.push({id: organ.id, label: organ.originalName});
          });

        }, function onError(err) {
          toastr.error(err.data, 'Error');
        });

      return items;
    }


    //Chart displays the important events & recent deployments of the application
    function eventChart() {
      vm.event_options = {
        chart: {
          type: 'scatterChart',
          height: 200,
          margin: {
            top: 20,
            right: 10,
            bottom: 40,
            left: 45
          },
          x: function (d) {
            return d.x;
          },
          y: function (d) {
            return d.y;
          },
          useInteractiveGuideline: true,
          duration: 500,
          xAxis: {
            tickFormat: function (d) {
              return d3.time.format.utc(timeFormat)(new Date(d)); // tickMultiFormat(new Date(d));
            },
            axisLabel: ''
          },
          showXAxis: true,
          showYAxis: false,
          yAxis: {
            tickFormat: function (d) {
              return d3.format('.01f')(d);
            },
            axisLabel: 'Actions',
            axisLabelDistance: -15
          },
          yDomain: [2, 6],
          tooltip: {
            contentGenerator: function(d) {
              return '<h3>'
                +d3.time.format.utc(timeFormat)(new Date(d.point.x)) + '</h3>'
                + '<br>'
                + '<span>'
                + d.point.text
                + '</span>';
            }
          }
        }
      };


      var timeFormat = '%b %e %H:%M:%S';

      vm.event_data = [
        {values: [], key: 'Scaling', color: "ed5818"},
        {values: [], key: 'Moving', color: "0FB825"},
        {values: [], key: 'Other', color: "0F36B8"}];

      initializeEvents();

      vm.event_interval = $interval (function (){
        vm.event_data = [
          {values: [], key: 'Scaling', color: "ed5818"},
          {values: [], key: 'Moving', color: "0FB825"},
          {values: [], key: 'Other', color: "0F36B8"}
        ];
        Analytics.getEvents({app_id: $stateParams.app_id},
          function onSuccess(response){
            response.forEach(function(action){
              //var time = $filter('date')(action.createdAt,'MM-dd HH:mm:ss');
              var timestamp = new Date(action.createdAt).getTime();
              var value = 3;
              if(action.content.match('Scaled')){
                value = 4;
                vm.event_data[0].values.push({x: timestamp, y: value, text: action.content});
              } else if(action.content.match('Moved')){
                value = 5;
                vm.event_data[1].values.push({x: timestamp, y: value, text: action.content});
              } else {
                vm.event_data[2].values.push({x: timestamp, y: value, text: action.content});
              }
            });
          }, function onError(err) {
            toastr.error(err.data, 'Error');
          });
      },6500);
    }


    function initializeEvents() {
      Analytics.getEvents({app_id: $stateParams.app_id},
        function onSuccess(response){
          response.forEach(function(action){
            //var time = $filter('date')(action.createdAt,'MM-dd HH:mm:ss');
            var timestamp = new Date(action.createdAt).getTime();
            var value = 3;
            if(action.content.match('Scaled')){
              value = 4;
              vm.event_data[0].values.push({x: timestamp, y: value, text: action.content});
            } else if(action.content.match('Moved')){
              value = 5;
              vm.event_data[1].values.push({x: timestamp, y: value, text: action.content});
            } else {
              vm.event_data[2].values.push({x: timestamp, y: value, text: action.content});
            }
          });
        }, function onError(err) {
          toastr.error(err.data, 'Error');
        });
    }



    //CPU Chart - displays the aggregate cpu usage of all cells in an organ
    function cpuChart(organ_id, timespan) {
      vm.cpu_options = {
        chart: {
          type: 'lineChart',
          height: 200,
          margin: {
            top: 20,
            right: 10,
            bottom: 40,
            left: 45
          },
          x: function (d) {
            return d.x;
          },
          y: function (d) {
            return d.y;
          },
          useInteractiveGuideline: true,
          duration: 500,
          xAxis: {
            tickFormat: function (d) {
              return tickMultiFormat(new Date(d)); //d3.time.format.utc(timeFormat)(new Date(d));
              },
            axisLabel: 'Time'
            },
          showXAxis: true,
          yAxis: {
            tickFormat: function (d) {
              return d3.format('.01f')(d);
            },
            axisLabel: 'Value',
            axisLabelDistance: -15
          }
        }
      };

      //var timeFormat = '%b %e %H:%M:%S';
      var tickMultiFormat = d3.time.format.multi([
        ["%-I:%M%p", function(d) { return d.getMinutes(); }], // not the beginning of the hour
        ["%-I%p", function(d) { return d.getHours(); }], // not midnight
        ["%b %-d", function(d) { return d.getDate() != 1; }], // not the first of the month
        ["%b %-d", function(d) { return d.getMonth(); }], // not Jan 1st
        ["%Y", function() { return true; }]
      ]);

      vm.cpu_data = [{values: [], key: 'CPU', color: "0FB825"}];

      vm.cpu_interval = $interval (function (){
        Analytics.getOrganCpu({organ_id: organ_id, timespan: timespan},
          function onSuccess(response){
            var items = [];
            response.forEach(function(item){
              items.push({timestamp: item.timestamp, value: item.value})
            });

              vm.cpu_data = [{values: [], key: 'CPU', color: "0FB825"}];
              items.forEach(function (item){
                //var time = $filter('date')(item.timestamp,'MM-dd HH:mm:ss');
                //var timestamp = new Date(item.timestamp).getTime();
                vm.cpu_data[0].values.push({x: item.timestamp*1000, y: item.value});
              });

        }, function onError(err) {
          toastr.error(err.data, 'Error');
        });
      },5500);
    }


    //Memory Chart - displays the aggregate memory usage of all cells in an organ
    function memoryChart(organ_id, timespan) {
      vm.memory_options = {
        chart: {
          type: 'lineChart',
          height: 200,
          margin: {
            top: 20,
            right: 10,
            bottom: 40,
            left: 45
          },
          x: function (d) {
            return d.x;
          },
          y: function (d) {
            return d.y;
          },
          useInteractiveGuideline: true,
          duration: 500,
          xAxis: {
            tickFormat: function (d) {
              return tickMultiFormat(new Date(d)); // d3.time.format.utc(timeFormat)(new Date(d));
            },
            axisLabel: 'Time'
          },
          showXAxis: true,
          yAxis: {
            tickFormat: function (d) {
              return d3.format('.01f')(d);
            },
            axisLabel: 'Value',
            axisLabelDistance: -15
          }
        }
      };

      //var timeFormat = '%b %e %H:%M:%S';
      var tickMultiFormat = d3.time.format.multi([
        ["%-I:%M%p", function(d) { return d.getMinutes(); }], // not the beginning of the hour
        ["%-I%p", function(d) { return d.getHours(); }], // not midnight
        ["%b %-d", function(d) { return d.getDate() != 1; }], // not the first of the month
        ["%b %-d", function(d) { return d.getMonth(); }], // not Jan 1st
        ["%Y", function() { return true; }]
      ]);

      vm.memory_data = [{values: [], key: 'Memory', color: "0F36B8"}];

      vm.memory_interval = $interval (function (){
        Analytics.getOrganMemory({organ_id: organ_id, timespan: timespan},
          function onSuccess(response){
            var items = [];
            response.forEach(function(item){
              items.push({timestamp: item.timestamp, value: item.value})
            });

            vm.memory_data = [{values: [], key: 'Memory', color: "0F36B8"}];
            items.forEach(function (item){
              //var time = $filter('date')(item.timestamp,'MM-dd HH:mm:ss');
              //var timestamp = new Date(item.timestamp).getTime();
              vm.memory_data[0].values.push({x: item.timestamp*1000, y: item.value});
            });

          }, function onError(err) {
            toastr.error(err.data, 'Error');
          });
      },8000);
    }


  }
})();




