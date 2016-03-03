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
      .state('infrastructure', {
        url: '/infrastructure',
        templateUrl: 'app/infrastructure/infrastructure.html',
        controller: 'InfrastructureController',
        controllerAs: 'ic'
      });

    $urlRouterProvider.otherwise('/');
  }
})();
