(function() {
  'use strict';

  angular
    .module('glaAngular')
    .controller('PolicyController', PolicyController);

  /** @ngInject */
  function PolicyController($stateParams, Policy, Application, toastr, $log) {
    var vm = this;

    //form related variables
    vm.new_policy = {
      "app_id": $stateParams.app_id,
      "rules": [
        {"organs": [{}]}
      ]
    };
    vm.operator = ["is", "is not", "exists", "less than", "greater than", "equals", "regexp", "contains"];
    vm.metrics = ["cpu_system_seconds", "money_spent", "budget_balance", "memory_failures_total", "network_transmit_errors_total", "networks_receive_bytes_total"];

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
            items.push({id: organ.originalName, label: organ.originalName});
          });

        }, function onError(err) {
          toastr.error(err.data, 'Error');
        });

      $log.info(items);
      return items;
    }


    // Returns a list of policies of an application
    function getPolicyListCurated(){
      var items = [];
      Policy.getPolicy({app_id: $stateParams.app_id},
        function onSuccess(response) {
          response.rules.forEach(function(rule){
            items.push({metric: rule.metric, operator: rule.operator, value: rule.value, id: rule.id, selected: false });
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
          function onSuccess(response){
            toastr.success('Deleted sucessfully!', 'Info');
          }, function onError(err) {
            toastr.error(err.data, 'Error');
          });
      } else {
        toastr.error('Choose atleast 1 policy to perform the operation.', 'Error');
      }

      return result;
    };


  }
})();

