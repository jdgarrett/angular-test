(function() {
  goog.provide('sal_notification_badge_directive');

  var module = angular.module('sal_notification_badge_directive', []);

  module.directive('salNotificationBadge', function($rootScope, notificationService) {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: 'components/notifications/partial/notificationbadge.html',
      // The linking function will add behavior to the template
      link: function(scope, element, attrs) {
        //scope.$on('notification_added', updateScopeVariables);
        //scope.$on('notification_updated', updateScopeVariables);
        //scope.$on('notification_removed', updateScopeVariables);
      }
    };
  });
})();
