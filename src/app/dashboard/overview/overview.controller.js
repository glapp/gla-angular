(function() {
  'use strict';

  angular
    .module('glaAngular')
    .controller('OverviewController', OverviewController);

  /** @ngInject */
  function OverviewController(VisDataSet, Application, $log, toastr) {
    var vm = this;
    var graph_nodes = [];
    var graph_edges = [];
    vm.live_data = {};
    getDetails();


    vm.options = {
      autoResize: true,
      height: '700',
      width: '800'
    };


    function getDetails() {
      /*Application.getAppDetails({app_id: $stateParams.app_id},*/
      var details = Application.getAppDetails({app_id: '5744ca4b96a3fc7c985279f6'},
        function onSuccess(response) {
          $log.info(response);
          response.organs.forEach(function(organ){
            graph_nodes.push({id: organ.originalName, label: organ.originalName, shape: 'circle', shadow: true, color: 'orange', size: 10});

            organ.cells.forEach(function(cell){
              if (cell.isProxy){
                /*                graph_nodes.push({id: cell.id, label: cell.id, shape: 'diamond', shadow: true, color: 'brown', size: 10});
                 graph_edges.push({from: cell.id, to: organ.originalName});*/
              }
              else {
                graph_nodes.push({id: cell.id, label: cell.id, shape: 'square', shadow: true, color: 'green', size: 10});
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

  }
})();
