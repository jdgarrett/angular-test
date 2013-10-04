(function() {
  goog.provide('sal_notification_poster_directive');

  goog.require('sal_notifications_service');

  var module = angular.module('sal_notification_poster_directive', []);

  module.directive('salNotificationPoster', function($rootScope,notificationService) {
    return {
      restrict: 'C',
      replace: true,
      transclude: true,
      scope: { title: '@posterTitle' },
      template: '<div class="panel flat">' +
				'	<div><p class="title">{{title}}</p></div>' +
				'</div>',
      // The linking function will add behavior to the template
      link: function(scope, element, attrs) {
            // Title element
        var title = angular.element(element.children()[0]);

        element.on('click', addNotification);

        var count = 0;

        function addNotification() {
          count = count + 1;
          notificationService.addNotification($rootScope, {
            text: '1 Added, 3 Modified, 1 Deleted',
            read: false,
            type: 'sal-update-notification',
            repos: [{
            	name: 'geogit_repo',
            	layers:
            		[{
            			name: 'layer1',
            			adds: [],
            			modifies: ['feature3'],
            			deletes: ['feature5']
            		},{
            			name: 'layer2',
            			adds: ['feature6'],
            			modifies: ['feature2', 'feature4'],
            			deletes: []
            		}]
            }],
            callback: function(feature) {
            	alert(feature.feature + ' was clicked!');
            }
          });
        }
      }
    };
  });
})();
