(function() {
  goog.provide('sal_notifications_service');

  var module = angular.module('sal_notifications_service', []);
  
  // Private Variables
  var notifications = [];
  var nextNotificationId = 0;

  module.provider( 'notificationService', function() {
	  this.$get = function($rootScope) {
	  	return this;
	  };
	  
	  this.getNotifications = function () {
	    return notifications;
	  };

	  this.addNotification = function ( scope, notification ) {
	    notification.id = nextNotificationId++;
		notifications.push(notification);
		scope.$broadcast('notification_added',notification);
	  };
	  
	  this.unreadCount = function() {
	  	var unread = 0;
	  	
	  	for(var i=0;i < notifications.length;i++) {
	  	  if (notifications[i].read === false) {
	  	    unread++;
	  	  }
	  	}
	  	return unread;
	  };
	  
	  this.markAsRead = function(scope, notification) {
	  	for(var i=0;i < notifications.length;i++) {
	  	  if (notifications[i].id === notification.id) {
	  	    notifications[i].read = true;
	  	  }
	  	}
	  	scope.$broadcast('notification_updated',notification);
	  };
	  
	  this.getNotification = function(id) {
	  	for(var i=0;i < notifications.length;i++) {
	  	  if (notifications[i].id == id) {
	  	    return notifications[i];
	  	  }
	  	}
	  };
	  
	  this.removeNotification = function(scope,id) {
	    var index = -1;
	  	for(var i=0;i < notifications.length;i++) {
	  	  if (notifications[i].id == id) {
	  	    index = i;
	  	  }
	  	}
	  	if (index > -1) {
          notifications.splice(index, 1);
        }
        scope.$broadcast('notification_removed',id);
	  };
  });

})();
