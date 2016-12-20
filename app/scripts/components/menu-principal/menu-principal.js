/*************************************
Webcomponent para menu de la app
*************************************/

(function (){
	'use strict';

	// Configuracion del web component
	var menuPrincipal = {
		templateUrl: './scripts/components/menu-principal/menu-principal.html',
		controller: controller
	};

	// Controlador
	function controller()
	{
		var vm = this;

		vm.msg = 'Hola mundo';
	}

	angular
		.module('app')
			.component('menuPrincipal', menuPrincipal); // El nombre debe estar con camel case
})();