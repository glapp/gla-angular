(function() {
  'use strict';

  angular
    .module('glaAngular')
    .controller('DashboardController', DashboardController);

  /** @ngInject */
  function DashboardController() {
    var vm = this;

    vm.menu = [
      {"name": "Overview", "icon": "home", "path": "dashboard.overview.graph"},
      {"name": "Policy", "icon": "settings_input_component", "path": "dashboard.policy"},
      {"name": "Analytics", "icon": "trending_up", "path": "dashboard.analytics"},
      {"name": "History", "icon": "replay", "path": "dashboard.history"},
      /*{"name": "Alerts", "icon": "notifications", "path": "dashboard.notifications"},*/
      {"name": "Settings", "icon": "settings", "path": "dashboard.settings"}
    ];


  }
})();
