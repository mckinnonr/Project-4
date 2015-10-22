angular.module('myFormApp', [])

  .controller('RegisterFormCtrl', ['$scope', function($scope){

    $scope.submitRegistration = function(e){
      e.preventDefault();
      console.log($scope.registerForm);
    }
  }])
  .controller('ReportFormCtrl', ['$scope', function($scope){

    $scope.submitReport = function(e){
      e.preventDefault();
      console.log($scope.reportForm);
    }
  }]);
