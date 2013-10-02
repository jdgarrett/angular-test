(function() {
  goog.provide('sal_update_notification_directive');

  var module = angular.module('sal_update_notification_directive', []);

  module.directive('salUpdateNotification', function($rootScope, notificationService) {
    return {
      restrict: 'C',
      replace: true,
      transclude: true,
      scope: { id:'@notificationId' },
      template: '<div>' + 
				'  <div id="update-notification-header-{{notification.id}}" class="panel-heading flat toggle collapsed" data-toggle="collapse" data-target="#notification-description-{{notification.id}}">' +
				'    <div class="row col-xs-12">' +
				'	   <span style="font-weight: 100; font-size: 14px;">' +
				'		 <em id="notification-text-{{notification.id}}" class="notification-text">{{updateText}}</em>' +
				'        <div ng-click="removeNotification()" id="close-button-{{notification.id}}" class="glyphicon glyphicon-remove-circle close-notification"></div>' +
				'	   </span>' +
				'	 </div>' +
				'  </div>' +
				'  <div id="notification-description-{{notification.id}}" class="notification-description panel collapse">' +
				'    <ul class="list-group">' +
				'	   <li class="list-group-item" ng-repeat="repo in notification.repos"> {{repo.name}}' +
				'        <ul class="list-group">' +
				'          <li class="list-group-item" ng-repeat="layer in repo.layers"> {{layer.name}}' +
				'            <ul class="list-group">' +
				'	           <li class="list-group-item add" ng-click="notification.callback(\'{{add}}\')" ng-repeat="add in layer.adds">' +
				'	             <span class="glyphicon glyphicon-plus-sign"/>  {{add}}' +
   				'	           </li>' +
				'	           <li class="list-group-item modify" ng-click="notification.callback(\'{{modify}}\')" ng-repeat="modify in layer.modifies">' +
				'	             <span class="glyphicon glyphicon-edit"/>  {{modify}}' +
   				'	           </li>' +
				'	           <li class="list-group-item delete" ng-click="notification.callback(\'{{delete}}\')" ng-repeat="delete in layer.deletes">' +
				'	             <span class="glyphicon glyphicon-minus-sign"/>  {{delete}}' +
   				'	           </li>' +
   				'            </ul>' +
   				'          </li>' +
   				'        </ul>' +
   				'      </li>' +
   				'    </ul>' +
				'  </div>' +
				'</div>',
      // The linking function will add behavior to the template
      link: function(scope, element, attrs) {
        // Title element
        var content = angular.element("#notification-description-" + scope.id);
 
        // Clicking on title should open/close the menu
        var title = angular.element("#notification-text-" + scope.id);
        var rootElement = angular.element(element.children()[0]);
        
        var headerElement = angular.element("#update-notification-header-" + scope.id);
        
        function removeNotification() {
        	notificationService.removeNotification($rootScope,scope.id);
        }
        
        scope.removeNotification = removeNotification;
        
        scope.notification = notificationService.getNotification(scope.id);
        
        if(!scope.notification.callback) {
        	scope.notification.callback = function() {};
        }
        
        var repos = scope.notification.repos;
        console.log(repos);
        var adds = 0;
        var modifies = 0;
        var deletes = 0;
        for(var i = 0; i < repos.length; i++) {
        	var layers = repos[i].layers;
        	console.log(layers);
        	for(var j = 0; j < layers.length; j++) {
        		var layer = layers[j];
        	    console.log(layer);
        		if(layer.adds) {
        			adds = adds + layer.adds.length;
        		}
        		if(layer.modifies) {
        			modifies = modifies + layer.modifies.length;
        		}
        		if(layer.deletes) {
        			deletes = deletes + layer.deletes.length;
        		}
        	}
        }
        scope.updateText = adds + " Added, " + modifies + " Modified, " + deletes + " Deleted";
        				   
        if(adds + modifies + deletes === 0) {
          scope.updateText = "No changes received.";
        }
      }
    }
  });
})();