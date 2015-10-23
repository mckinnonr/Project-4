angular.module('myFormApp', ['ui.router'])

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
             .state('welcome', {
               url: '/',
               templateUrl: 'page1.html'
             })
             .state('register', {
               url: '/register',
               templateUrl: 'page2.html',
               controller: 'RegisterFormCtrl'

             })
             .state('encounters', {
               url: '/encounters',
               templateUrl: 'page3.html'
             })
             .state('report', {
               url: '/report',
               templateUrl: 'page4.html'
             })
  }])

  .controller('RegisterFormCtrl', ['$scope','$state',function($scope,$state){

    $scope.submitRegistration = function(e){
      e.preventDefault();
      console.log($scope.registerForm);
      if ($scope.registerForm.$invalid) {
        $scope.showValidation=true;
      } else {
        $state.go('encounters');
      }
    }
  }])
  .controller('ReportFormCtrl', ['$scope', function($scope){

    $scope.submitReport = function(e){
      e.preventDefault();
      console.log($scope.reportForm);
      if ($scope.reportForm.$invalid) {
        $scope.showValidation=true;
      } else {
        $state.go('report');
      }
    }
  }]);
