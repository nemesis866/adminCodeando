/*************************************
Configuración del router de la app
*************************************/

(function (){
	'use strict';

	function config ($routeProvider, $locationProvider)
	{
		// Configuramos las rutas
		$routeProvider
			.when('/init', {
				template: '<inicio></inicio>'
			})
			.when('/courses', {
				template: '<cursos></cursos>'
			})
			.when('/courses/new', {
				template: '<curso-nuevo></curso-nuevo>'
			})
			.when('/courses/edit/:id', {
				template: '<curso-editar></curso-editar>'
			})
			.when('/courses/preview/:id', {
				template: '<curso-preview></curso-preview>'
			})
			.when('/categories', {
				template: '<categoria></categoria>'
			})
			.when('/categories/new', {
				template: '<categoria-nuevo></categoria-nuevo>'
			})
			.when('/categories/edit/:id', {
				template: '<categoria-editar></categoria-editar>'
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