angular.module('myFormApp', ['ui.router','ngCookies','ngTouch'])

  .config(['$stateProvider',
           '$urlRouterProvider',
           '$locationProvider',
           function($stateProvider,
                    $urlRouterProvider,
                    $locationProvider){
          //  routing code...
           $locationProvider.html5Mode({
             enabled: true,
             requireBase: false,
             rewriteLinks: false
           });

           $stateProvider
            //  page 1
             .state('welcome', {
               url: '/',
               templateUrl: 'page1.html',
              //  if logged in, prevents user from going to login page again
               controller: ['$cookies','$state','$scope', function($cookies, $state, $scope){
                 $cookies.putObject('mars_user', undefined);
                 $scope.swipeLeft=function(){
                   $state.go('register');
                 }
               }],
               controllerAs: 'welcome'
             })
            //  page 2
             .state('register', {
               url: '/register',
               templateUrl: 'page2.html',
               controller: 'RegisterFormCtrl',
               resolve: {
                 user: ['$cookies',function($cookies){
                   if($cookies.getObject('mars_user')){
                     $state.go('encounters');
                   }
                 }]
               }
              //  $scope.swipeRight=function(){
              //    $state.go('welcome');
              //  }
             })
            //  page 3
             .state('encounters', {
               url: '/encounters',
               templateUrl: 'page3.html',
               controller: 'EncountersCtrl'
             })
            //  page 4
             .state('report', {
               url: '/report',
               templateUrl: 'page4.html',
               controller: 'ReportCtrl'
             })
  }])


  // for page 2
  .controller('RegisterFormCtrl', ['$scope','$state','$http','$cookies', function($scope,$state,$http,$cookies){
    var API_URL_GET_JOBS = "https://red-wdp-api.herokuapp.com/api/mars/jobs";
    var API_URL_CREATE_COLONIST = "https://red-wdp-api.herokuapp.com/api/mars/colonists";
    $scope.colonist = {};
        $http.get(API_URL_GET_JOBS).then(function(response){
    $scope.jobs = response.data.jobs
    });
    $scope.submitRegistration = function(e){
      e.preventDefault();
      // console.log($scope.registerForm);
      if ($scope.registerForm.$invalid) {
        $scope.showValidation=true;
      } else {
        // debugger;
        // send report
        $http({
          method: 'POST',
          url: API_URL_CREATE_COLONIST,
          data: { colonist: $scope.colonist }
        }).then(function(response){
          $cookies.putObject('mars_user', response.data.colonist);
          $state.go('encounters');
          // debugger;
        })
      }
    }
  }])


  // for page 3
  .controller('EncountersCtrl', ['$scope','$state','$http','$cookies', function($scope,$state,$http,$cookies){
    var ENCOUNTERS_API_URL = 'https://red-wdp-api.herokuapp.com/api/mars/encounters';
    $scope.colonist = {};
        $http.get(ENCOUNTERS_API_URL).then(function(response){
    $scope.encounters = response.data.encounters
    });
    }])


    // for page 4
    .controller('ReportCtrl', ['$scope','$state','$http','$cookies', function($scope,$state,$http,$cookies){
    var ALIEN_TYPE_API_URL = "https://red-wdp-api.herokuapp.com/api/mars/aliens";
    var ENCOUNTERS_API_URL = 'https://red-wdp-api.herokuapp.com/api/mars/encounters';
    var date = new Date();
      $scope.encounter = {date: date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate(), colonist_id: $cookies.getObject('mars_user').id};
          $http.get(ALIEN_TYPE_API_URL).then(function(response){
      $scope.aliens = response.data.aliens
      });
      // }])
    // .controller('ReportFormCtrl', ['$scope','$http', function($scope,$http){
    $scope.submitReport = function(e){
      e.preventDefault();
      // console.log($scope.reportForm);
      if ($scope.reportForm.$invalid) {
        $scope.showValidation=true;
        // debugger;
      } else {
        // debugger;
        // send report
        $http({
          method: 'POST',
          url: ENCOUNTERS_API_URL,
          data: { encounter: $scope.encounter }
        }).then(function(response){
          $state.go('encounters');
        })
      }
    }
  }]);
