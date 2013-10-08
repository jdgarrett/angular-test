(function() {
  goog.provide('loom');


  goog.require('loom_notifications');
  goog.require('loom_notification_poster');
  goog.require('loom_update_notification');
  goog.require('loom_diff');
  goog.require('loom_diff_controller');
  
  angular.module('loom', [
    'loom_notifications',
    'loom_notification_poster',
    'loom_update_notification',
    'loom_diff',
    'loom_diff_controller'
  ]);

})();
