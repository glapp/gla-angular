(function() {
  'use strict';

  angular
    .module('glaAngular')
    .controller('OverviewGraphController', OverviewGraphController);

  /** @ngInject */
  function OverviewGraphController($stateParams, $state, Application, $filter, toastr) {
    var vm = this;
    var graph_nodes = [];
    var graph_edges = [];
    vm.live_data = {};
    vm.show_cells = false;
    vm.show_proxy = false;
    vm.id = $stateParams.app_id;
    vm.end_points = [];
    vm.refresh = function(){
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
      width: '900'
    };


    var mapping = {
      provider: [
        ['amazonec2', 'Amazon EC2'],
        ['digitalocean', 'Digital Ocean'],
        ['virtualbox', 'Virtualbox'],
        ['google', 'Google Cloud Platform']
      ],
      region: [
        ['us', 'USA'],
        ['eu', 'Europe']
      ],
      tier: [
        ['1', 'Tier 1'],
        ['2', 'Tier 2']
      ]
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

              // cell on_hover information

              var provider = $filter('filter')(mapping.provider, function (d) {return d[0] === cell.host.labels.provider;})[0];
              var region = $filter('filter')(mapping.region, function (d) {return d[0] === cell.host.labels.region;})[0];
              var tier = $filter('filter')(mapping.tier, function (d) {return d[0] === cell.host.labels.tier;})[0];

              var cell_title = "<div class='panel panel-success' style='margin-bottom:1px'>"+
                "<div class='panel-heading'>"+
                "<h3 class='panel-title'>"+cell.host.name+"</h3>"+
                "</div>"+
                "<div class='panel-body' style='height: 125px; padding-top: 1px; padding-bottom: 1px'>"+
                "<table class='table' style='border: none; margin-bottom:1px'>"+
                "<tr>"+
                "<td>Cloud</td>"+
                "<td>- "+provider[1]+"</td>"+
                "</tr>"+
                "<tr>"+
                "<td>Region</td>"+
                "<td>- "+region[1]+"</td>"+
                "</tr>"+
                "<tr>"+
                "<td>Tier</td>"+
                "<td>- "+tier[1]+"</td>"+
                "</tr>"+
                "<tr>"+
                "<td>IP</td>"+
                "<td>- "+cell.host.ip+"</td>"+
                "</tr>"+
                "</table>"+
                "</div>"+
                "</div>";

              if (cell.isProxy ) //&& vm.show_proxy
              {
                //label: cell.id

                var info = cell.host.ip +':'+cell.published_port;
                /*var link = "<a href="
                  +info
                  +">"
                  +cell.host.ip //+":"+cell.published_port
                  +"</a>";*/

                if(angular.isUndefined(cell.published_port) || cell.published_port == null){
                  //vm.end_points.push({name: organ.originalName, ip: cell.host.ip});
                }
                else {
                  vm.end_points.push({name: organ.originalName, ip: info});
                }

                graph_nodes.push({id: cell.id, label: cell.host.name, shape: 'diamond', shadow: true, color: 'brown', size: 10, title: cell_title});
                graph_edges.push({from: cell.id, to: organ.originalName});
              }
              else // else if (vm.show_cells)
              {
                //label: cell.id
                graph_nodes.push({id: cell.id, label: cell.host.name, shape: 'square', shadow: true, color: 'green', size: 10, title: cell_title});
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
