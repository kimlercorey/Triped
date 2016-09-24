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
	$scope.data = JSON.parse('{ "name":"the name", "order":40, "rule":"the rule" }');
	$scope.status = "Fake Status";

$http.post('/api/rules/', $scope.data)
.then(function(data, status) { // success
          console.log( "Success: ");
})   
.catch(function(data, status, headers, config) { // error
		  console.log( "Error" );    
}); 





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