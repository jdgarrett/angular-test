(function() {
  goog.provide('sal');


  goog.require('sal_notifications');
  goog.require('sal_notification_poster');
  goog.require('sal_update_notification');
  goog.require('sal_notification_popup');
  
  angular.module('sal', [
    'sal_notifications',
    'sal_notification_poster',
    'sal_update_notification',
    'sal_notification_popup'
  ]);

})();
