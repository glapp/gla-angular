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
      .state('home', {
        url: '/home',
        templateUrl: 'app/home/home.html',
        controller: 'HomeController',
        controllerAs: 'hc'
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
        controllerAs: 'ac',
        abstract: true
      })
      .state('apps.list', {
        url: '',
        templateUrl: 'app/apps/list/list.html',
        controller: 'AppListController',
        controllerAs: 'alc'
      })
      .state('apps.details', {
        url: '/{app_id}', // TODO: Should include only database IDs
        templateUrl: 'app/apps/details/details.html',
        controller: 'AppDetailsController',
        controllerAs: 'adc'
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
      .state('dashboard.policy', {
        url: '/policy',
        /*views: {
          '': {
            templateUrl: 'app/dashboard/policy/policy.html',
            controller: 'PolicyController',
            controllerAs: 'policy'
          },
          'detail@policy': {
            templateUrl: 'app/dashboard/policy/createPolicy.html',
            controller: 'PolicyController',
            controllerAs: 'policy'
          }
        }*/
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
