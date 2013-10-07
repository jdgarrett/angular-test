(function() {
  goog.provide('sal_notifications_directive');

  var module = angular.module('sal_notifications_directive', []);

  module.directive('salNotifications', function($rootScope, notificationService) {
    return {
      restrict: 'C',
      replace: true,
      transclude: true,
      scope: { title: '@notificationTitle', emptyText: '@notificationEmptyText' },
      templateUrl: 'components/notifications/partial/notifications.html',
      // The linking function will add behavior to the template
      link: function(scope, element, attrs) {
        // Title element
        var content = angular.element('#notification-content');

        // Clicking on title should open/close the menu
        var title = angular.element('#notification-title');
        var rootElement = angular.element(element.children()[0]);
        rootElement.on('click', refresh);
        
        function removeNotification(id) {
        	notificationService.removeNotification($rootScope, id);
        }

        scope.removeNotification = removeNotification;

        // Toggle the closed/opened state
        function refresh() {
          if (!content.hasClass('collapsed')) {
            var notifications = notificationService.getNotifications();
            for (var i = 0; i < notifications.length; i++) {
              if (notifications[i].read === false) {
              	notificationService.markAsRead($rootScope, notifications[i]);
              }
            }
          }
        }

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

        scope.$on('notification_added', function(event, data) {
          if (content.hasClass('in')) {
            notificationService.markAsRead($rootScope, data);
          }
          updateScopeVariables();
        });

        scope.$on('notification_updated', updateScopeVariables);
        scope.$on('notification_removed', updateScopeVariables);
      }
    };
  });
})();
