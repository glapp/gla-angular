(function() {
  'use strict';

  angular
    .module('glaAngular')
    .config(config);

  /** @ngInject */
  function config($logProvider, $mdThemingProvider, $resourceProvider, $httpProvider, toastrConfig) {
    // Enable log
    $logProvider.debugEnabled(true);

    $mdThemingProvider.theme('default')
      .primaryPalette('blue', {
        'hue-1': '50'
      })
      .accentPalette('green');

    // Don't strip trailing slashes from calculated URLs
    $resourceProvider.defaults.stripTrailingSlashes = false;

    $httpProvider.defaults.withCredentials = true;

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;
  }

})();
