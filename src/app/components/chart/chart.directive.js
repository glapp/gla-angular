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
    function DataController() {
      var vm = this;
      vm.test = "test";
      //barChart();
      monitorChart();
      //apiTest();


      function barChart() {
        vm.options = {
          chart: {
            type: 'discreteBarChart',
            height: 450,
            margin: {
              top: 20,
              right: 20,
              bottom: 50,
              left: 55
            },
            x: function (d) {
              return d.label;
            },
            y: function (d) {
              return d.value + (1e-10);
            },
            showValues: true,
            valueFormat: function (d) {
              return d3.format(',.4f')(d);
            },
            duration: 500,
            xAxis: {
              axisLabel: 'X Axis'
            },
            yAxis: {
              axisLabel: 'Y Axis',
              axisLabelDistance: -10
            }
          }
        };

        vm.data = [
          {
            key: "Cumulative Return",
            values: [
              {
                "label": "A",
                "value": -29.765957771107
              },
              {
                "label": "B",
                "value": 0
              },
              {
                "label": "C",
                "value": 32.807804682612
              },
              {
                "label": "D",
                "value": 196.45946739256
              },
              {
                "label": "E",
                "value": 0.19434030906893
              },
              {
                "label": "F",
                "value": -98.079782601442
              },
              {
                "label": "G",
                "value": -13.925743130903
              },
              {
                "label": "H",
                "value": -5.1387322875705
              }
            ]
          }
        ]
      }

      function monitorChart() {
        vm.options = {
          chart: {
            type: 'lineChart',
            height: 180,
            margin: {
              top: 20,
              right: 20,
              bottom: 40,
              left: 55
            },
            x: function (d) {
              return d.x;
            },
            y: function (d) {
              return d.y;
            },
            useInteractiveGuideline: true,
            duration: 500,
            yAxis: {
              tickFormat: function (d) {
                return d3.format('.01f')(d);
              }
            }
          }
        };

        vm.options1 = angular.copy(vm.options);
        vm.options1.chart.duration = 0;
        vm.options1.chart.yDomain = [-1, 1];

        vm.data = [{values: [], key: 'CPU'}];

        vm.run = true;

        var x = 0;
        setInterval(function () {
          if (!vm.run) return;
          vm.data[0].values.push({x: x, y: Math.random() - 0.5});
          if (vm.data[0].values.length > 20) vm.data[0].values.shift();
          x++;

          vm.$apply(); // update both chart
        }, 2500);
      }

    }

  }

})();
