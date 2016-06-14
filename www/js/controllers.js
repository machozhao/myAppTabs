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

.controller('ChatDetailCtrl', function($scope, $stateParams, Messages, AppService) {

      $scope.chatSessionId= $stateParams.chatSessionId;

      $scope.title = "与" + $scope.personName + "对话";
      $scope.sessionIsClosed = true;

			//数据
			$scope.chatData = {};
			$scope.chatData.chatContent = "";
			$scope.chatData.messages = [];
			$scope.pageSize = 20;
      
      $scope.doLoadNew = function(){
        //fromId,toId,startSendTime,endSendTime,msgContent,pageNo,pageSize
        Messages.getChatMsgs($scope.chatSessionId, '', '', 1, $scope.pageSize).then(function(data) {
          if (data.result && data.result.length > 0){
             $scope.chatData.messages = data.result;
             //$scope.chatSessionId = data.result[0].chatSession.id
             //$scope.sessionIsClosed =  data.result[0].chatSession.sessionIsClose;
          }
        }, function(err) {
          //错误处理
        });
      }
      
      // Load messages in current session
      $scope.doLoadNew();
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
