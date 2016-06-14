// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.constant("SERVER",{
          SERVER_ADDR:"http://182.92.213.161:18080/mywoo-frontend",
          URL_Buddy_ADD:"/c/circle/addMyBuddy",
          URL_Buddy_DEL:"/c/circle/removeMyBuddy",
          URL_Buddy_PRE:"/c/circle/getMyVitalBuddys",
          URL_Buddys:"/c/circle/getMyBuddys",
          URL_Message_GET_LAST:"/c/message/getLastMessageStatus",
          URL_Message_GET:"/c/message/getMessages",
          URL_Message_SEND:"/c/message/sendMessage",
          URL_Message_getUnreadMessagePersonStatus:"/c/message/getUnreadMessagePersonStatus",
          URL_Message_SEND_IMG:"/c/message/sendPhotoMessage",
          URL_My_Event:"/c/event/getMyEvent",
          URL_AddMyBuddyEvent:"/c/event/addMyBuddyEvent",
          URL_Buddy_Event:"/c/event/getMyBuddyEvent",
          URL_ShowEventDetails:"/c/event/getEventDetails",
          URL_ADD_Event:"/c/event/addEvent",
          URL_Modify_Event:"/c/event/modifyEvent",
          URL_Modify_Event2:"/c/event/modifyEvent2",
          URL_ADD_REMOVEEVENT:"/c/event/removeEvent",
          URL_PROFILE_GET_ALL:"/c/question/getAllProfile",
          URL_PROFILE_GET_ONE:"/c/question/getProfileById",
          URL_PROFILE_UPDATEPERSONBASICINFO:"/c/question/updatePersonBasicInfo",
          URL_PROFILE_UPDATEPERSONICON:"/c/question/updatePersonIcon",
          URL_PROFILE_calcBMI:"/c/question/calcBMI",
          URL_PROFILE_UPDATEANSWERFORCHOICE:"/c/question/updateAnswerForChoice",
          URL_PROFILE_UPDATEANSWERFORFREESTYLE:"/c/question/updateAnswerForFreeStyle",
          URL_PROFILE_DeleteAnswer:"/c/question/deleteMyAnswer",
          URL_Profile:"http://192.168.1.127:3000/profile/:userId/:profileId",
          URL_USER_LOGIN:"/c/my/autoEnrollLogin",
          URL_USER_LOGIN_Shortcut:"/c/my/shortcutLogin",
          URL_USER_logout:"/c/my/logout",
          URL_USER_BIND_JPUSH:"/c/my/bindJPush",
          URL_GET_CODE:"/c/my/sendCheckCodeForDoctor",
          URL_USER_dologin:"/c/my/dologin"
          })
.constant("MYWOO",{ name:'信助手专家',
          version:'1.1',
          company:'信使沃'
          })
.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('signin', {
    url: '/sign-in',
    templateUrl: 'templates/sign-in.html',
    controller: 'SignInCtrl'
  })
  .state('forgotpassword', {
    url: '/forgot-password',
    templateUrl: 'templates/forgot-password.html'
  })

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:
  .state('tab.sessions', {
     url: '/sessions',
     views: {
       'tab-sessions': {
         templateUrl: 'templates/tab-sessions.html',
         controller: 'SessionsCtrl'
       }
     }
  })

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatSessionId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/sign-in');

});
