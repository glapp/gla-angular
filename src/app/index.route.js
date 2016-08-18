(function () {
  'use strict';

  angular
    .module('glaAngular')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('landing', {
        url: '/',
        templateUrl: 'app/landing/landing.html',
        controller: 'LandingController',
        controllerAs: 'lc'
      })
      .state('infrastructure', {
        url: '/infrastructure',
        templateUrl: 'app/infrastructure/infrastructure.html',
        controller: 'InfrastructureController',
        controllerAs: 'ic'
      })
      .state('apps', {
        url: '/apps',
        templateUrl: 'app/apps/apps.html',
        controller: 'AppsController',
        controllerAs: 'ac'
      })
      .state('dashboard', {
        url: '/{app_id}',
        templateUrl: 'app/dashboard/dashboard.html',
        controller: 'DashboardController',
        controllerAs: 'dashboard'
      })
      .state('dashboard.overview', {
        url: '/overview',
        templateUrl: 'app/dashboard/overview/overview.html',
        controller: 'OverviewController',
        controllerAs: 'overview'
      })
      .state('dashboard.overview.graph', {
        url: '/',
        templateUrl: 'app/dashboard/overview/graph/overview.graph.html',
        controller: 'OverviewGraphController',
        controllerAs: 'ogc'
      })
      .state('dashboard.overview.details', {
        url: '/list', // TODO: Should include only database IDs {app_id}
        templateUrl: 'app/dashboard/overview/details/overview.details.html',
        controller: 'OverviewDetailsController',
        controllerAs: 'odc'
      })
      .state('dashboard.policy', {
        url: '/policy',
        templateUrl: 'app/dashboard/policy/policy.html',
        controller: 'PolicyController',
        controllerAs: 'policy'
      })
      .state('dashboard.policy.create', {
        url: '/create',
        templateUrl: 'app/dashboard/policy/createPolicy.html',
        controller: 'PolicyController',
        controllerAs: 'policy'
      })
      .state('dashboard.policy.show', {
        url: '/show',
        templateUrl: 'app/dashboard/policy/showPolicy.html',
        controller: 'PolicyController',
        controllerAs: 'policy'
      })
      .state('dashboard.analytics', {
        url: '/analytics',
        templateUrl: 'app/dashboard/analytics/analytics.html',
        controller: 'AnalyticsController',
        controllerAs: 'analytics'
      })
      .state('dashboard.history', {
        url: '/history',
        templateUrl: 'app/dashboard/history/history.html',
        controller: 'HistoryController',
        controllerAs: 'history'
      })
      .state('dashboard.notifications', {
        url: '/notifications',
        templateUrl: 'app/dashboard/notifications/notifications.html',
        controller: 'NotificationsController',
        controllerAs: 'notifications'
      })
      .state('dashboard.settings', {
        url: '/settings',
        templateUrl: 'app/dashboard/settings/settings.html',
        controller: 'SettingsController',
        controllerAs: 'settings'
      });


    $urlRouterProvider.otherwise('/');
  }
})();
