(function () {
  "use strict";
  /*global goog*/
  /*global angular*/
  goog.provide('loom_notification_poster');

  goog.require('loom_notification_poster_directive');

  angular.module('loom_notification_poster', [
    'loom_notification_poster_directive'
  ]);
}());
