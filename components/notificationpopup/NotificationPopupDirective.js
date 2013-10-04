(function() {
  goog.provide('sal_notification_popup_directive');

  var module = angular.module('sal_notification_popup_directive', []);

  module.directive('salNotificationPopup', function($rootScope, notificationService) {
    return {
      restrict: 'C',
      replace: true,
      transclude: true,
      templateUrl: 'components/notificationpopup/partial/notificationpopup.html',
      // The linking function will add behavior to the template
      link: function(scope, element, attrs) {
        var rootElement = angular.element(element.children()[0]);

        scope.$on('notification_added', function(event, data) {
            if (!scope.$$phase && !$rootScope.$$phase) {
                scope.$apply(function() {
                    scope.text = data.text;
                });
              }
            
        });
      }
    };
  });
})();