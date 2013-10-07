(function() {
  goog.provide('sal_diff_list_directive');

  var module = angular.module('sal_diff_list_directive', []);

  module.directive('salDiffList', function($rootScope) {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: { 
          addList: '=',
          modifyList: '=',
          deleteList: '=',
          clickCallback: '='
        },
      templateUrl: 'components/difflist/partial/difflist.html'
    };
  });
})();
