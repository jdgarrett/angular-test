(function() {
  goog.provide('loom_notifications_directive');

  var module = angular.module('loom_notifications_directive', []);

  module.directive('loomNotifications', function($rootScope, notificationService) {
    return {
      restrict: 'C',
      replace: true,
      scope: {emptyText: '@notificationEmptyText' },
      templateUrl: 'components/notifications/partial/notifications.html',
      // The linking function will add behavior to the template
      link: function(scope, element, attrs) {
        var content = element;
        parent = element.parent
        
        function removeNotification(id) {
        	notificationService.removeNotification(id);
        }

        scope.removeNotification = removeNotification;
        
        function markAsRead(id) {
            notificationService.markAsRead(notificationService.getNotification(id));
        }
        
        scope.markAsRead = markAsRead;

        function updateScopeVariables() {
          if (!scope.$$phase && !$rootScope.$$phase) {
            scope.$apply(function() {
     	  	  scope.notificationService = notificationService;
   		    });
   		  } else {
   		    scope.notificationService = notificationService;
   		  }
        }

        scope.notificationService = notificationService;
        scope.notificationsEmpty = notificationService.getNotifications().length === 0;
        scope.numNotifications = notificationService.getNotifications().length;

        scope.$on('notification_added', updateScopeVariables);
        scope.$on('notification_updated', updateScopeVariables);
        scope.$on('notification_removed', updateScopeVariables);
      }
    };
  });
})();
