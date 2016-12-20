/*************************************
Webcomponent para cursos nuevos
*************************************/

(function (){
	'use strict';

	// Controlador
	function CursoNuevo()
	{
		var vm = this;

		vm.msg = 'Hola mundo';
	}

	// Configuracion del web component
	var cursoNuevo = {
		templateUrl: './scripts/components/curso-nuevo/curso-nuevo.html',
		controller: CursoNuevo
	};

	angular
		.module('app')
			.component('cursoNuevo', cursoNuevo); // El nombre debe estar con camel case
})();