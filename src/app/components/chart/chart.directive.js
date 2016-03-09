(function () {
  'use strict';

  angular
    .module('glaAngular')
    .directive('chart', chart);

  /** @ngInject */
  function chart() {
    var directive = {
      restrict: 'E',
      transclude: true,
      templateUrl: 'app/components/chart/chart.html',
      scope: {
        items: '='
      },
      controller: DataController,
      controllerAs: 'DataCtrl',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function DataController($interval, d3) {
      var vm = this;
      vm.toggle = "toggle";
      vm.cpu = true;
      cpuChart();
      responseChart();


      function cpuChart() {
        vm.options = {
          chart: {
            type: 'lineChart',
            height: 180,
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
              axisLabel: 'last 30 seconds'
              //axisLabelDistance: 10
            },
            showXAxis: false,
            yAxis: {
              tickFormat: function (d) {
                return d3.format('.01f')(d);
              },
              axisLabel: 'usage %',
              axisLabelDistance: -15
            }
          }
        };

        vm.options1 = angular.copy(vm.options);
        vm.options1.chart.duration = 0;
        vm.options1.chart.yDomain = [0, 100];

        vm.data = [{values: [], key: 'CPU', color: "ed5818"}];

        vm.run = true;

        var x = 0;
        var min = 1;
        var max = 10;
        $interval(function () {
          if (!vm.run) return;
          vm.data[0].values.push({x: x, y: Math.floor(Math.random() *(max - min) + min)});
          if (vm.data[0].values.length > 30) vm.data[0].values.shift();
          x++;

          //vm.$apply(); // update both chart
        }, 2500);
        $interval(function(){
          if(max <100){
            max += 5;
            min +=3
          }
        }, 9000);
      }

      function responseChart() {
        vm.options3 = {
          chart: {
            type: 'lineChart',
            height: 180,
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
              axisLabel: 'last 30 seconds'
              //axisLabelDistance: 10
            },
            showXAxis: false,
            yAxis: {
              tickFormat: function (d) {
                return d3.format('.01f')(d);
              },
              axisLabel: 'response time',
              axisLabelDistance: -15
            }
          }
        };

        vm.options4 = angular.copy(vm.options3);
        vm.options4.chart.duration = 0;
        vm.options4.chart.yDomain = [10, 500];

        vm.data3 = [{values: [], key: 'ms'}];

        vm.run = true;

        var x = 0;
        var min = 10;
        var max = 50;
        $interval(function () {
          if (!vm.run) return;
          vm.data3[0].values.push({x: x, y: Math.floor(Math.random() *(max - min) + min)});
          if (vm.data3[0].values.length > 30) vm.data3[0].values.shift();
          x++;

          //vm.$apply(); // update both chart
        }, 2000);
        $interval(function(){
          if(max <480){
            max += 15;
            min +=8
          }
        }, 6000);
      }

    }

  }

})();
