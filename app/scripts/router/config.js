/*************************************
Configuración del router de la app
*************************************/

(function (){
	'use strict';

	function config ($routeProvider, $locationProvider)
	{
		// Configuramos las rutas
		$routeProvider
			.when('/', {
				template: '<inicio></inicio>'
			})
			.when('/courses', {
				template: '<cursos></cursos>'
			})
			.when('/courses/new', {
				template: '<curso-nuevo></curso-nuevo>'
			})
			.when('/page2', {
				controller: 'mainController',
				controllerAs: 'vm',
				templateUrl: 'views/page2.html'
			})
			// En caso de no existir la ruta redireccionamos aqui
			.otherwise({
				redirectTo: '/'
		    });

		// Quitamos el hashtag de las url
		if(window.history && window.history.pushState) {
	       $locationProvider.html5Mode(true);
	   }
	}

	angular
		.module('app')
			.config([
				'$routeProvider',
				'$locationProvider',
				config
			]);
})();