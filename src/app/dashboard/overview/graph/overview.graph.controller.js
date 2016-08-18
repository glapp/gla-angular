(function() {
  'use strict';

  angular
    .module('glaAngular')
    .controller('OverviewGraphController', OverviewGraphController);

  /** @ngInject */
  function OverviewGraphController($stateParams, $state, Application, $log, toastr) {
    var vm = this;
    var graph_nodes = [];
    var graph_edges = [];
    vm.live_data = {};
    vm.show_cells = false;
    vm.show_proxy = false;
    vm.id = $stateParams.app_id;
    vm.end_points = [];
    vm.refresh = function(){
      $log.info('test');
      getDetails();
    };

    getDetails();

    vm.list = function () {
      $state.go('dashboard.overview.details');
    };
    vm.graph = function () {
      $state.go('dashboard.overview.graph');
    };

    vm.cells = function(status){
      vm.show_cells = status;
      getDetails();
    };

    vm.proxy = function(status){
      vm.show_proxy = status;
      getDetails();
    };

    vm.options = {
      autoResize: true,
      height: '700',
      width: '800'
    };


    function getDetails() {
      graph_nodes = [];
      graph_edges = [];
      vm.live_data = {};
      vm.end_points = [];
      Application.getAppDetails({app_id: $stateParams.app_id},
        function onSuccess(response) {
          vm.appName = response.name;
          response.organs.forEach(function(organ){
            graph_nodes.push({id: organ.originalName, label: organ.originalName, shape: 'square', shadow: true, color: 'orange', size: 20});

            organ.cells.forEach(function(cell){
              if (cell.isProxy ) //&& vm.show_proxy
              {
                //label: cell.id
                var info = cell.host.ip +':'+cell.published_port;
                var link = "<a href="
                  +info
                  +">"
                  +cell.host.ip //+":"+cell.published_port
                  +"</a>";

                if(angular.isUndefined(cell.published_port) || cell.published_port == null){
                  //vm.end_points.push({name: organ.originalName, ip: cell.host.ip});
                }
                else {
                  vm.end_points.push({name: organ.originalName, ip: info});
                }

                graph_nodes.push({id: cell.id, label: cell.host.name, shape: 'diamond', shadow: true, color: 'brown', size: 10, title: link});
                graph_edges.push({from: cell.id, to: organ.originalName});
              }
              else // else if (vm.show_cells)
              {
                //label: cell.id
                graph_nodes.push({id: cell.id, label: cell.host.name, shape: 'square', shadow: true, color: 'green', size: 10, title: cell.host.name});
                graph_edges.push({from: cell.id, to: organ.originalName});
              }
            });

            organ.dependent_on.forEach(function(item){
              if (!item){
                graph_edges.push({from: organ.originalName, to: organ.originalName, width: 3});
              }
              else {
                graph_edges.push({from: organ.originalName, to: item.originalName, width: 3});
              }

            });

          });


          vm.live_data = {
            nodes: graph_nodes,
            edges: graph_edges
          };

        }, function onError(err) {
          toastr.error(err.data, 'Error');
        });

    }


  }
})();
