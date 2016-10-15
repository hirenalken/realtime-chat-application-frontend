/**
 * Created by hiren on 17/9/16.
 */
app.controller('direct_chatCtrl', ['$rootScope', '$scope', '$http', '$state', '$window', '$cookies',
    function ($rootScope, $scope, $http, $state, $window, $cookies) {
        $scope.user_id = $cookies.get('user_id');
        $scope.token = $cookies.get('token');
        $scope.username = $cookies.get('username');
        $scope.input_message = '';
        $scope.apiHost = "http://localhost:8000/";
        $scope.apiCallUrl = 'http://localhost:8000/channel_app/';
        $scope.messages = [];
        $scope.rooms = [];
        $scope.users = [];
        $scope.load_messages = function () {
            $http.get($scope.apiCallUrl + 'users/' + $scope.user_id + '/message/', {
                headers: {
                    "Authorization": 'Token ' + $scope.token
                }
            }).then(function (response) {
                $scope.messages = response.data;
                console.log($scope.messages);
            }, function (error) {


            });

        };


        $scope.load_messages();

       

        $scope.selected_user_index = 0;
        $scope.active_user_id = 1;
        $scope.load_users = function () {
            $http.get($scope.apiCallUrl + 'users/list/', {
                headers: {
                    "Authorization": 'Token ' + $scope.token
                }
            }).then(function (response) {
                $scope.users = response.data;
                console.log($scope.users);
                if ($scope.users.length > 0) {
                    $scope.active_user_id = $scope.users[0].id;
                }

                var ws = []
                for (var i = 0; i < $scope.users.length; i++) {
                    var direct_chat_room = $scope.username + '-' + $scope.users[i].username.replace(/ +/g, '_').toLowerCase();
                    var w = new WebSocket('ws://localhost:8000/direct_chat/' + direct_chat_room);

                    ws.push(w);
                    // Make it show an alert when a message is received
                    ws[i].onmessage = function (message) {
                        message_data = JSON.parse(message.data);
                        if ('status' in message_data) {
                            // alert("Connected");
                        } else {
                            $scope.messages.push(message_data);
                            $scope.$apply();
                            console.log($scope.messages);
                        }
                        console.log(message_data);

                    };
                }
                console.log($scope.rooms);
            }, function (error) {


            });

        };
        $scope.load_users();

        $scope.send_message = function () {

            $scope.message_post_data = {
                from_user: $scope.user_id,
                to_user: 3,
                room: $scope.active_room_id,
                message: $scope.input_message
            };

            if ($scope.message_post_data.message == "") {
                toastr.error("Can not send blank message !!");
            }

            $http({
                method: 'POST',
                url: $scope.apiCallUrl + 'users/' + $scope.user_id + '/message/3/',
                data: $scope.message_post_data,
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": 'Token ' + $scope.token
                }
            }).then(function (response) {
                // if (response.status == 201) {
                //     console.log(response);
                //     $scope.load_messages();
                //     $scope.input_message = "";
                // }


            }, function (response) {
                toastr.error("Error in saving message.");

            });
        };





        $scope.send_ws_message = function () {
            $scope.message_post_data = {
                from_user: 2,
                to_user: 3,
                message: $scope.input_message
            };
            ws[i].send(JSON.stringify($scope.message_post_data));
        };

        $scope.changeRoom = function (room, index) {
            $scope.selected_room_index = index;
            $scope.active_room_id = room.id;
        };

        $scope.changeUser = function (user, index) {
            $scope.selected_user_index = index;
            $scope.active_user_id = user.id;
        };
    }
]);

// window.setInterval(function() {
//     var elem = document.getElementById('message_box');
//     elem.scrollTop = elem.scrollHeight;
// }, 2000);
