(function() {
  'use strict';

  angular
    .module('glaAngular')
    .controller('OverviewController', OverviewController);

  /** @ngInject */
  function OverviewController($stateParams, Application, $log, toastr) {
    var vm = this;
    var graph_nodes = [];
    var graph_edges = [];
    vm.live_data = {};
    vm.show_cells = false;
    vm.show_proxy = false;
    vm.id = $stateParams.app_id;

    getDetails();

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
      Application.getAppDetails({app_id: $stateParams.app_id},
        function onSuccess(response) {
          $log.info(response);
          response.organs.forEach(function(organ){
            graph_nodes.push({id: organ.originalName, label: organ.originalName, shape: 'circle', shadow: true, color: 'orange', size: 10});

            organ.cells.forEach(function(cell){
              if (cell.isProxy && vm.show_proxy){
                //label: cell.id
                graph_nodes.push({id: cell.id, label: cell.host.name, shape: 'diamond', shadow: true, color: 'brown', size: 10});
                graph_edges.push({from: cell.id, to: organ.originalName});
              }
              else if (vm.show_cells) {
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
          $log.info(vm.live_data);

        }, function onError(err) {
          toastr.error(err.data, 'Error');
        });

    }



/*    vm.title = "<div class='panel panel-success' style='margin-bottom:0px'>"+
      "<div class='panel-heading'>"+
      "<h3 class='panel-title'>Agent</h3>"+
      "</div>"+
      "<div class='panel-body' style='height: 125px; padding-top: 0px; padding-bottom: 0px'>"+
      "<table class='table' style='border: none; margin-bottom:1px'>"+
      "<tr>"+
      "<td>Agent</td>"+
      "<td>true</td>"+
      "<td>2015-04-02 16:02</td>"+
      "</tr>"+
      "<tr>"+
      "<td>CPU</td>"+
      "<td>1%</td>"+
      "<td>2015-04-02 16:02</td>"+
      "</tr>"+
      "<tr>"+
      "<td>Memory</td>"+
      "<td>2%</td>"+
      "<td>2015-04-02 16:02</td>"+
      "</tr>"+
      "<tr>"+
      "<td>Disk</td>"+
      "<td>10%</td>"+
      "<td>2015-04-02 16:02</td>"+
      "</tr>"+
      "</table>"+
      "</div>"+
      "</div>";*/

  }
})();
