(function () {
  "use strict";
  /*global goog*/
  /*global angular*/
  goog.provide('loom_diff_list_directive');

  var module = angular.module('loom_diff_list_directive', []);

  module.directive('loomDiffList', function ($rootScope) {
    return {
      restrict: 'C',
      replace: true,
      scope: {
        addList: '=',
        modifyList: '=',
        deleteList: '=',
        clickCallback: '='
      },
      templateUrl: 'components/diff/partial/difflist.html'
    };
  });
}());
