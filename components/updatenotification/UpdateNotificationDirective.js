(function() {
  goog.provide('sal_update_notification_directive');

  var module = angular.module('sal_update_notification_directive', []);

  module.directive('salUpdateNotification', function($rootScope, notificationService) {
    return {
      restrict: 'C',
      replace: true,
      transclude: true,
      scope: { id: '@notificationId' },
      templateUrl: 'components/updatenotification/partial/updatenotification.html',
      // The linking function will add behavior to the template
      link: function(scope, element, attrs) {
        // Title element
        var content = angular.element('#notification-description-' + scope.id);

        // Clicking on title should open/close the menu
        var title = angular.element('#notification-text-' + scope.id);
        var rootElement = angular.element(element.children()[0]);

        var headerElement = angular.element('#update-notification-header-' + scope.id);

        function removeNotification() {
        	notificationService.removeNotification($rootScope, scope.id);
        }

        scope.removeNotification = removeNotification;

        scope.notification = notificationService.getNotification(scope.id);

        if (!scope.notification.callback) {
        	scope.notification.callback = function() {};
        }

        var repos = scope.notification.repos;
        var adds = [];
        var modifies = [];
        var deletes = [];
        for (var i = 0; i < repos.length; i++) {
        	var layers = repos[i].layers;
        	for (var j = 0; j < layers.length; j++) {
        		var layer = layers[j];
        		if (layer.adds) {
        			for (var k = 0; k < layer.adds.length; k++) {
        				adds.push({repo: repos[i].name, layer: layer.name, feature: layer.adds[k]});
        			}
        		}
        		if (layer.modifies) {
        			for (var k = 0; k < layer.modifies.length; k++) {
        				modifies.push({repo: repos[i].name, layer: layer.name, feature: layer.modifies[k]});
        			}
        		}
        		if (layer.deletes) {
        			for (var k = 0; k < layer.deletes.length; k++) {
        				deletes.push({repo: repos[i].name, layer: layer.name, feature: layer.deletes[k]});
        			}
        		}
        	}
        }
        scope.adds = adds;
        scope.modifies = modifies;
        scope.deletes = deletes;
        scope.updateText = adds.length + ' Added, ' + modifies.length + ' Modified, ' + deletes.length + ' Deleted';

        if (adds.length + modifies.length + deletes.length === 0) {
          scope.updateText = 'No changes received.';
        }
      }
    };
  });
})();
