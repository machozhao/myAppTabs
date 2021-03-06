angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('SignInCtrl', function($scope, $state, AppService) {

  // Just for development, set default user in login form
  $scope.user = {username: '13801356729', password: '123456'};
  
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

.controller('ChatDetailCtrl', function($scope, $cordovaMedia, $ionicLoading, $stateParams, Messages, AppService) {

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
      
      $scope.showImg = function(url) {
					$scope.tempImgUrl = url;
					if ($scope.modal_showImg) {
						$scope.modal_showImg.show();
					} else {
						$ionicModal.fromTemplateUrl('templates/directive/my-chat-msg-TempImg.html', {
							scope: $scope
						}).then(function(modal) {
							$scope.modal_showImg = modal;
							$scope.modal_showImg.show();
						});
	
					}
      }
      $scope.closeImageDialog = function() {
          $scope.modal_showImg.hide();
      };
      
    $scope.playAudio = function(url) {
      // Play the audio file at url
      var playingAudio = new Media(url,
          // success callback
          function () { console.log("playAudio():Audio Success"); },
          // error callback
          function (err) { console.log("playAudio():Audio Error: " + err); },
          // status callback
          function (status) { console.log("playStatus: " + status);}
      );

      // Play audio
      playingAudio.play({ playAudioWhenScreenIsLocked : false });

      // Pause after 300 seconds
      setTimeout(function () {
          my_media.pause();
      }, 300000);
    };
 
    var mediaStatusCallback = function(status) {
        if(status == 1) {
            $ionicLoading.show({template: 'Loading...'});
        } else {
            $ionicLoading.hide();
        }
    };
    
      $scope.playAudio1 = function(src){
        console.log("play:"+src);

        $scope.playStatus = "正在播放...";
        try {
            $scope.audio = new Audio(src);
            $scope.audio.play();
        } catch(e){
          alert(e);
        }
        //console.log("status:"+item.outerHTML);
        if($scope.media){
            $scope.media.release();
            $scope.media = null;
        }
        $scope.media = $cordovaMedia.newMedia(src)


        $scope.media.play().then(function(data){
                console.log("播放完成");
                 $scope.playStatus = "点击播放";
        });
			};

      
      // Load messages in current session
      $scope.doLoadNew();
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
