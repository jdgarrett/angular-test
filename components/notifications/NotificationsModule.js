(function() {
  goog.provide('sal_notifications');

  goog.require('sal_notifications_directive');
  goog.require('sal_notifications_service');

  var module = angular.module('sal_notifications', [
    'sal_notifications_directive',
    'sal_notifications_service'
  ]);
})();
