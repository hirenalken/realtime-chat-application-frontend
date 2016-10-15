/*global angular */
/*global console */
/*jshint strict: true */

var app = angular.module('app', ['ngRoute', 'ui.router',  'ngCookies' ,'ui.bootstrap', '720kb.socialshare']);

app.config(['$stateProvider', '$urlRouterProvider',  function ($stateProvider, $urlRouterProvider) {

    // toastr.options = {
    //     "closeButton": false,
    //     "debug": false,
    //     "newestOnTop": false,
    //     "progressBar": false,
    //     "positionClass": "toast-bottom-Center",
    //     "onclick": null,
    //     "showDuration": "3000",
    //     "hideDuration": "1000",
    //     "timeOut": "4000",
    //     "extendedTimeOut": "300",
    //     "showEasing": "swing",
    //     "hideEasing": "linear",
    //     "showMethod": "fadeIn",
    //     "hideMethod": "fadeOut",

    // };
    // $locationProvider.html5Mode({
    //     enabled: true,
    // });
    $urlRouterProvider.when('', '/home');

      

    // Now set up the states
    $stateProvider
        .state('home', {
            url: "/home",
            templateUrl: '../html/login.html',
            controller: 'homeCtrl'
        })
        .state('chat', {
            url: "/chat-room",
            templateUrl: '../html/chat.html',
            controller: 'chatCtrl'
        })
        .state('direct_chat', {
            url: "/direct-chat",
            templateUrl: '../html/direct_chat.html',
            controller: 'direct_chatCtrl'
        });
    $urlRouterProvider.otherwise("home");

}]);

