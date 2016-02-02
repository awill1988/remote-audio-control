// Code goes here
var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider, $locationProvider) {
        $routeProvider
        .when('/0', {
            templateUrl: '/event0',
            controller: 'NexusUIController'
        })
        .when('/1', {
            templateUrl: '/event1',
            controller: 'NexusUIController'
        })
        .when('/2', {
            templateUrl: '/event2',
            controller: 'NexusUIController'
        })
        .when('/3', {
            templateUrl: '/event3',
            controller: 'NexusUIController'
        })
        .when('/4', {
            templateUrl: '/event4',
            controller: 'NexusUIController'
        })
        .when('/5', {
            templateUrl: '/event5',
            controller: 'NexusUIController'
        })

        .when('/6', {
            templateUrl: '/event6',
            controller: 'NexusUIController'
        })
        .when('/7', {
            templateUrl: '/event7',
            controller: 'NexusUIController'
        })
        .otherwise({ redirectTo: '/0'});
});

app.directive('nexusButton', function () {
      return {
        restrict: 'AE',
        replace: true,
        template: '<canvas/>',
        link: function(scope, elem, attrs) {

          var jqueryObj = $('#'+attrs.id);
          nx.add(attrs.type,{name:attrs.id,parent:scope,showLabels:true})
          
          var obj = nx.widgets[attrs.id];
          var onButtonPress = function() {
              socket.emit('user',
              {
                socketid: '/#'+socket.id,
                event: attrs.event,
                arg: parseInt(attrs.arg)
              })
          };

          var onButtonRelease = function() {
              socket.emit('user',
              {
                socketid: '/#'+socket.id,
                event: attrs.event,
                arg: 0
              })
              
          }

          obj.on('*',function(data) {
            if(data.press == 0)
              onButtonRelease();
            if(data.press == 1)
              onButtonPress();
          });


          //jqueryObj.mousedown(onButtonPress);
          //obj.touch = onButtonPress;
          //jqueryObj.mouseup(onButtonRelease);
          //obj.touchRelease   = onButtonRelease;
          $('canvas[nx*="button"]').remove();

          
          
        }
    };
});

app.directive('nexusComment', function () {
      return {
        restrict: 'AE',
        replace: true,
        template: '<canvas/>',
        link: function(scope, elem, attrs) {

          var jqueryObj = $('#'+attrs.id);
          nx.add(attrs.type,{name:attrs.id,parent:scope,w:attrs.width})
          
          var obj = nx.widgets[attrs.id];
          obj.val = {text: attrs.text}
          obj.setSize(15);
          $('canvas[nx*="comment"]').remove();
          
          
        }
    };
});

app.directive('nexusToggle', function () {
      return {
        restrict: 'AE',
        replace: true,
        template: '<canvas/>',
        link: function(scope, elem, attrs) {
          
          nx.add('toggle',
              { name:attrs.id,
                parent:scope})
          
          var obj = nx.widgets[attrs.id];
          var jqueryObj = $('#'+attrs.id);

          obj.label = attrs.label;



          var onButtonPress = function() {
              socket.emit('user',
              {
                socketid: '/#'+socket.id,
                event: attrs.event,
                arg: [ parseInt(attrs.arg), 1]
              })
          };

          var onButtonRelease = function() {
              socket.emit('user',
              {
                socketid: '/#'+socket.id,
                event: attrs.event,
                arg: [ parseInt(attrs.arg), 0]
              })
          }

          obj.on('*',function(data) {
            if(data.value == 0)
              onButtonRelease();
            if(data.value == 1)
              onButtonPress();
          });

          $('canvas[nx*="toggle"]').remove();
          
        }
    };
});

app.directive('nexusTilt', function () {
      return {
        restrict: 'AE',
        replace: true,
        template: '<canvas/>',
        link: function(scope, elem, attrs) {
          
          nx.add('tilt',
              { name:attrs.id,
                parent:scope})

          
          var obj = nx.widgets[attrs.id];
          var jqueryObj = $('#'+attrs.id);

          obj.text = attrs.label;
          var id = socket.id;
          obj.on('*',function(data) {
            //console.log(data)
            socket.emit('user',
            {
              socketid: '/#'+id,
              event: attrs.event,
              arg: data
            })
          });

          $('canvas[nx*="tilt"]').remove();
          
        }
    };
});

var controllers = {};


controllers.NexusUIController = function($scope){
  $scope.$on('$locationChangeStart', function( event ) {
      for(var w in nx.widgets)
      {
        nx.widgets[w].destroy();
      }
  });
  //$('canvas[nx*="button"]').remove();
}

app.controller(controllers)