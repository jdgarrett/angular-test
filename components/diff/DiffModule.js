(function() {
  goog.provide('loom_diff');

  goog.require('loom_diff_list_directive');
  goog.require('loom_diff_service');
  goog.require('loom_diff_panel_directive');

  var module = angular.module('loom_diff', [
    'loom_diff_list_directive',
    'loom_diff_service',
    'loom_diff_panel_directive'
  ]);
})();
