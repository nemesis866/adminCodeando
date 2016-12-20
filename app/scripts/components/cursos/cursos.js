/*************************************
Webcomponent para cursos
*************************************/

(function (){
	'use strict';

	// Controlador
	function Cursos()
	{
		var vm = this;

		vm.msg = 'Hola mundo';
	}

	// Configuracion del web component
	var cursos = {
		templateUrl: './scripts/components/cursos/cursos.html',
		controller: Cursos
	};

	angular
		.module('app')
			.component('cursos', cursos); // El nombre debe estar con camel case
})();