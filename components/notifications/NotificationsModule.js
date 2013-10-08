(function() {
  goog.provide('loom_notifications');

  goog.require('loom_notifications_directive');
  goog.require('loom_notifications_service');
  goog.require('loom_notification_badge_directive');

  var module = angular.module('loom_notifications', [
    'loom_notifications_directive',
    'loom_notifications_service',
    'loom_notification_badge_directive'
  ]);
})();
