/*************************************
Webcomponent para el inicio
*************************************/

(function (){
	'use strict';

	// Controlador
	function Inicio()
	{
		var vm = this;

		vm.msg = 'Hola mundo';
	}

	// Configuracion del web component
	var inicio = {
		templateUrl: './scripts/components/inicio/inicio.html',
		controller: Inicio
	};

	angular
		.module('app')
			.component('inicio', inicio); // El nombre debe estar con camel case
})();