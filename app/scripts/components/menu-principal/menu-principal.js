/*************************************
Webcomponent para menu de la app
*************************************/

(function (){
	'use strict';

	// Controlador
	function Controller(fncService)
	{
		var vm = this;

		// Clases para el menu
		vm.menu = [
			'active',
			'',
			''
		];

		// cambios de menu
		vm.change = function (id)
		{
			// Obtenemos los elementos del menu
			var elems = $('.items');
		};
	}

	// Configuracion del web component
	var menuPrincipal = {
		templateUrl: './scripts/components/menu-principal/menu-principal.html',
		controller: ['fncService', Controller]
	};

	angular
		.module('app')
			.component('menuPrincipal', menuPrincipal); // El nombre debe estar con camel case
})();