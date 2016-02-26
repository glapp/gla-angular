(function () {
  'use strict';

  angular
    .module('glaAngular')
    .config(config);

  /** @ngInject */
  function config($logProvider, $mdThemingProvider, $resourceProvider, $httpProvider, toastrConfig) {
    // Enable log
    $logProvider.debugEnabled(true);

    $mdThemingProvider.theme('default')
      .primaryPalette('blue-grey', {
        'hue-1': '50'
      })
      .accentPalette('orange', {
        'hue-1': 'A200'
      });

    // Don't strip trailing slashes from calculated URLs
    $resourceProvider.defaults.stripTrailingSlashes = false;

    // Always include credentials
    $httpProvider.defaults.withCredentials = true;

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;
  }

})();
