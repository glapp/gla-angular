(function() {
  'use strict';

  angular
    .module('glaAngular')
    .controller('DashboardController', DashboardController);

  /** @ngInject */
  function DashboardController($mdDialog, $document, VisDataSet, Application, $log, toastr) {
    var vm = this;
    vm.showAlert = showAlert;
    vm.graph = [];
    var graph_nodes = [];
    var graph_edges = [];
    vm.live_data = {};
    getDetails();

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


    vm.menu = [
      {"name": "Overview", "icon": "home", "path": "dashboard.overview"},
      {"name": "Policy", "icon": "settings_input_component", "path": "dashboard.policy"},
      {"name": "Analytics", "icon": "trending_up", "path": "dashboard.analytics"},
      {"name": "History", "icon": "replay", "path": "dashboard.history"},
      {"name": "Alerts", "icon": "notifications", "path": "dashboard.notifications"},
      {"name": "Settings", "icon": "settings", "path": "dashboard.settings"}
    ];


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
          /*graph_nodes.push({"id":"postgres:9.4","label":"postgres:9.4","shape":"circle","shadow":true,"color":"orange","size":10});*/
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

/*            if (!organ.dependent_on[0]){
              graph_edges.push({from: organ.originalName, to: organ.originalName});
            }
            else {
              vm.graph.push({cell: organ.originalName, dependency: organ.dependent_on[0].image});

              graph_edges.push({from: organ.originalName, to: organ.dependent_on[0].image});
            }*/

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
