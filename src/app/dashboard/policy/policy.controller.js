(function() {
  'use strict';

  angular
    .module('glaAngular')
    .controller('PolicyController', PolicyController);

  /** @ngInject */
  function PolicyController($stateParams, Policy, Application, toastr, $filter, $log) {
    var vm = this;

    //form related variables
    vm.new_policy = {
      "app_id": $stateParams.app_id,
      "rules": [
        {"organs": [{}]}
      ]
    };
/*    vm.operator = ["is", "is not", "exists", "less than", "greater than", "equals", "regexp", "contains"];*/
    vm.metrics_old = ["container_cpu_usage_seconds_total", "money_spent", "budget_balance", "container_network_receive_bytes_total","memory_failures_total", "network_transmit_errors_total", "networks_receive_bytes_total"];

    vm.metrics = [
      {name: "CPU utilization", id: "container_cpu_usage_seconds_total", desc: "cpu", input: "Enter something b/w 0 to 1 (meaning 0 to 100%)!", step: "0.01", min: "0.00", max: "1" },
      {name: "Receiving packets dropped", id: "container_network_receive_packets_dropped_total", desc: "packets", input: "Enter any positive integer", step: "1" },
      {name: "Transmitting packets dropped", id: "container_network_transmit_packets_dropped_total", desc: "dropped", input: "Enter any positive integer", step: "1" },
      {name: "Memory utilization", id: "memory_utilization", desc: "memory", input: "Enter something b/w 0 to 1 (meaning 0 to 100%)!", step: "0.01", min: "0.00", max: "1" },
      {name: "Total cost", id: "cost", desc: "cost", input: "Enter any positive integer", step: "1", min: "1" },
      {name: "Click count", id: "click_count", desc: "clicks", input: "Enter any positive integer", step: "1", min: "1" }
    ];
    vm.metric_selected = {};

    vm.operator = [
      {name: "greater than", id: "1" },
      {name: "less than", id: "2" },
      {name: "equals", id: "3" }
    ];

    vm.weights = [1,2,3,4,5];

    vm.menu = [
      {"name": "Create Policy", "icon": "home", "path": "dashboard.policy.create"},
      {"name": "Show All", "icon": "settings_input_component", "path": "dashboard.policy.show"}
    ];

    vm.rules = getPolicyListCurated();

    // other variables
    vm.counter = 0;
    vm.rows = [{"val": 0}];
    vm.isDisabled = false;
    vm.saveEnabled = true;


    //To add new row of rules
    vm.addRow = function(){
      vm.counter ++ ;
      vm.rows.push({"val": vm.counter});

      vm.new_policy.rules.push({"organs" : []});
    };

    //To remove last row of rules
    vm.removeRow = function(){
      vm.rows.pop();
      vm.counter -- ;
      if(vm.counter == 0){
        enableButton();
      }
    };

    vm.selectChanged = function(val){
      vm.metric_selected = $filter('filter')(vm.metrics, function (d) {return d.id === val;})[0];
    };

    // To disbale and enable the buttons
    vm.disableButton = function(){
      vm.isDisabled = true;
      vm.saveEnabled = false;
    };

    function enableButton(){
      vm.isDisabled = false;
      vm.saveEnabled = true;
    }


    vm.organs = getOrgans();

    vm.options = isSelected();

    function isSelected(option){
      var items = [];
      items.push(option);
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


    // Returns a list of policies of an application
    function getPolicyListCurated(){
      var items = [];
      Policy.getPolicy({app_id: $stateParams.app_id},
        function onSuccess(response) {
          response.rules.forEach(function(rule){
            var opt = $filter('filter')(vm.operator, function (d) {return d.id === rule.operator;})[0];
            var metric = $filter('filter')(vm.metrics, function (d) {return d.id === rule.metric;})[0];

            items.push({
              metric: metric.name,
              operator: opt.name,
              value: rule.value,
              weight: rule.weight,
              id: rule.id,
              organs: rule.organs,
              selected: false
            });
          });

        }, function onError(err) {
          toastr.error(err.data, 'Error');
        });
      return items;
    }

    vm.savePolicy = function(){
      Policy.createPolicy(vm.new_policy,
      function onSuccess(response){
        $log.info(response);
        toastr.success('Saved!', 'Info');
      }, function onError(err) {
        toastr.error(err.data, 'Error');
      });
    };



    // To delete specific rules of an application
    vm.deletePolicy = function (rules)
    {
      var result = {
        "ids": []
      };
      rules.forEach(function (rule){
        $log.info("forEach");
        if (rule.selected) {
          //result.rules.push({id: rule.id, metric: rule.metric, operator: rule.operator, value: rule.value, organs: []})
          result.ids.push(rule.id);
        }
      });

      if (result.ids.length > 0)
      {
        Policy.removePolicy(result,
          function onSuccess(){
            toastr.success('Deleted sucessfully!', 'Info');
          }, function onError(err) {
            toastr.error(err.data, 'Error');
          });
      } else {
        toastr.error('Choose atleast 1 policy to perform the operation.', 'Error');
      }

      vm.rules = getPolicyListCurated();
      return result;
    };


  }
})();

