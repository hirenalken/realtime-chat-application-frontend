/**
 * Created by hiren on 17/9/16.
 */
app.controller('homeCtrl', ['$rootScope', '$scope', '$http', '$state', '$window', '$cookies',
    function ($rootScope, $scope, $http, $state, $window, $cookies) {
        $scope.show_registration = false;
        $scope.apiCallUrl = 'http://localhost:8000/channel_app/';
        $scope.signupData = {
            full_name: '',
            username:'',
            password:''
        };

        $scope.loginData = {
            username:'',
            password:''
        }

        $scope.signup = function () {



            $http({
                method: "POST",
                url: $scope.apiCallUrl + 'users/',
                data: $scope.signupData,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                $cookies.put('user_id', response.data.user_id);
                $cookies.put('token', response.data.token);
                $cookies.put('username', $scope.signupData.username);
                $state.go('chat');
            }, function (response) {
                
            });
        };

        $scope.signIn = function () {  

            
            $http({
                method: "POST",
                url: $scope.apiCallUrl + 'login/',
                data: $scope.loginData,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (response) {
                $cookies.put('user_id', response.data.id);
                $cookies.put('token', response.data.token);
                $cookies.put('username', response.data.username);
                $state.go('chat');
            }, function (response) {
                console.log(response.data);                
            });


        };


    }
]);

// window.setInterval(function() {
//     var elem = document.getElementById('message_box');
//     elem.scrollTop = elem.scrollHeight;
// }, 2000);






