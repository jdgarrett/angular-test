(function () {
  "use strict";
  /*global goog*/
  /*global angular*/
  goog.provide('loom_diff_panel_directive');

  var module = angular.module('loom_diff_panel_directive', []);

  module.directive('loomDiffPanel', function ($rootScope, diffService) {
    return {
      restrict: 'C',
      replace: true,
      templateUrl: 'components/diff/partial/diffpanel.html',
      link: function (scope, element, attrs) {
        function updateScopeVariables() {
          if (!scope.$$phase && !$rootScope.$$phase) {
            scope.$apply(function () {
              scope.adds = diffService.getAdds();
              scope.modifies = diffService.getModifies();
              scope.deletes = diffService.getDeletes();
            });
          } else {
            scope.adds = diffService.getAdds();
            scope.modifies = diffService.getModifies();
            scope.deletes = diffService.getDeletes();
          }
        }

        updateScopeVariables();

        scope.$on('diff_performed', updateScopeVariables);
        scope.$on('diff_cleared', updateScopeVariables);
      }
    };
  });
})();
