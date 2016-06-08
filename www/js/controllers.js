angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('SignInCtrl', function($scope, $state, AppService) {
  
  $scope.signIn = function(user) {
    console.log('Sign-In', user);
    AppService.login(user.username, user.password, 'Doctor').then(
    function(data){
      // Success
      if (data.success) {
         $state.go('tab.sessions');
      } else {
        // Fail
        $scope.loginFail = true;
      }
    },
    function(data){
      // Fail
      $scope.loginFail = true;
    });
  };
  
})
.controller('SessionsCtrl', function($scope, $rootScope, Sessions, AppService) {
  Sessions.all($rootScope.currentLogunInfo.id).then(function(data){
    $scope.sessions = data;
  }, function(data){
  });
  
  $scope.remove = function(session) {
    Sessions.remove(session);
  };
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
