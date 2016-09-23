/***
 *    ██████╗  █████╗ ██████╗ ████████╗██╗ ██████╗██╗     ███████╗
 *    ██╔══██╗██╔══██╗██╔══██╗╚══██╔══╝██║██╔════╝██║     ██╔════╝
 *    ██████╔╝███████║██████╔╝   ██║   ██║██║     ██║     █████╗
 *    ██╔═══╝ ██╔══██║██╔══██╗   ██║   ██║██║     ██║     ██╔══╝
 *    ██║     ██║  ██║██║  ██║   ██║   ██║╚██████╗███████╗███████╗
 *    ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝ ╚═════╝╚══════╝╚══════╝
 *
 *   This is the primary module for the entire Angular application
 *
 *   It is possible to have multiple Particle applications on a single page.
 *   This is the main module, around which we build and inject other modules.
 */

var PARTICLE = angular.module('PARTICLE', ['ngAnimate','ipsum']);

//=============================================
//***************
//***********
//*****

/***
 *    ██╗   ██╗    ██╗
 *    ██║   ██║    ██║
 *    ██║   ██║    ██║
 *    ██║   ██║    ██║
 *    ╚██████╔╝    ██║
 *     ╚═════╝     ╚═╝
 *       ____               _                _  _
 *      / ___| ___   _ __  | |_  _ __  ___  | || |  ___  _ __
 *     | |    / _ \ | '_ \ | __|| '__|/ _ \ | || | / _ \| '__|
 *     | |___| (_) || | | || |_ | |  | (_) || || ||  __/| |
 *      \____|\___/ |_| |_| \__||_|   \___/ |_||_| \___||_|
 *
 *   Currently our application has a single controller that holds all the pieces together.
 *   In the future we may create smaller independent controllers, but for now we have
 *   just the one, which sets all the need variables within the controller's scope.
 */

PARTICLE.controller("uiController",function($scope, $timeout,$http) {

	
	$scope.thing = [0,4,5,6,7];

	$scope.postdata = '';
	$scope.data = "Data place holder";
	$scope.status = "Fake Status";

    $scope.sendPost = function() {
        var data = $.param({
            json: JSON.stringify({
                name: $scope.newName
            })
        });
        $http.post("/api/atm-datas", data).success(function(data, status) {
			console.log(data,status)
        }).error(function (data, status, headers, config) {
            $scope.status = status;
			console.log(data, status, headers, config)
        });
    } 


});



/***
 *     █████╗ ██████╗ ██████╗
 *    ██╔══██╗██╔══██╗██╔══██╗
 *    ███████║██████╔╝██████╔╝
 *    ██╔══██║██╔═══╝ ██╔═══╝
 *    ██║  ██║██║     ██║
 *    ╚═╝  ╚═╝╚═╝     ╚═╝
 *    ██████╗  ██████╗  ██████╗ ████████╗███████╗████████╗██████╗  █████╗ ██████╗
 *    ██╔══██╗██╔═══██╗██╔═══██╗╚══██╔══╝██╔════╝╚══██╔══╝██╔══██╗██╔══██╗██╔══██╗
 *    ██████╔╝██║   ██║██║   ██║   ██║   ███████╗   ██║   ██████╔╝███████║██████╔╝
 *    ██╔══██╗██║   ██║██║   ██║   ██║   ╚════██║   ██║   ██╔══██╗██╔══██║██╔═══╝
 *    ██████╔╝╚██████╔╝╚██████╔╝   ██║   ███████║   ██║   ██║  ██║██║  ██║██║
 *    ╚═════╝  ╚═════╝  ╚═════╝    ╚═╝   ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝
 *
 */

angular.bootstrap(document.body,["PARTICLE"]);

angular.element(document).ready(function() { });