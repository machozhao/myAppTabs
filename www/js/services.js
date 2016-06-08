angular.module('starter.services', [])

.factory('AppService',['SERVER','$interval', '$log','$http','$q', '$rootScope',function(SERVER,$interval,$log,$http,$q, $rootScope) {
  
  return {
    login: function(username, password, userType) {
      var url = SERVER.SERVER_ADDR + SERVER.URL_USER_dologin;
      var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
      $http.get(url, {
          cache: false,
          params: {
            'username': username,
            'password': password,
            'userType': userType
          }
        })
        .success(function(data, status, headers, config) {
          if (data.success) {
            $rootScope.currentLogunInfo = data.data.userInfo;
          }
          deferred.resolve(data); // 声明执行成功，即http请求数据成功，可以返回数据了  
        }).error(function(data, status, headers, config) {
          deferred.reject(data); // 声明执行失败，即服务器返回错误  
        });
      return deferred.promise; // 返回承诺，这里并不是最终数据，而是访问最终数据的API  ;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
}])

.factory('Sessions',['SERVER','$interval', '$log','$http','$q',function(SERVER,$interval,$log,$http,$q) {
  return {
    all: function(myId) {
      var url = SERVER.SERVER_ADDR + SERVER.URL_Message_GET_LAST;
 			var deferred = $q.defer(); // 声明延后执行，表示要去监控后面的执行
	 		$http.get(url,{cache: false,params:{'myId':myId}})
		 		.success(function(data, status, headers, config) {  
	       		 deferred.resolve(data.data);  // 声明执行成功，即http请求数据成功，可以返回数据了
	     		 }) .error(function(data, status, headers, config) {
        			deferred.reject(data);   // 声明执行失败，即服务器返回错误  
      			});  
     	return deferred.promise;   // 返回承诺，这里并不是最终数据，而是访问最终数据的API  ;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
}])


.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
