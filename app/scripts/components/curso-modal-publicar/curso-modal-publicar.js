/*************************************
Webcomponent para curso modal publicar
*************************************/

(function (){
	'use strict';

	// Controlador
	function CursoModalPublicar($scope)
	{
		var vm = this;

		vm.modalWatch = function ()
		{

		};

		// Mandamos un curso a publicar
		vm.setPublic = function ()
		{
			// Obtenemos el ID del curso
			console.log(vm.publicData);
		};

		// Ventana modal para publicar
		$('#bs-publicar-modal-lg').on('show.bs.modal', function (event) {
			var button = $(event.relatedTarget); // Button that triggered the modal
  			var id = button.data('id'); // Extract info from data-* attributes

			vm.publicData = id; // Guardamos el ID del modal abierto
		});

		// Ponemos los cambios en escucha
		$scope.$watch(vm.modalWatch);
	}

	// Configuracion del web component
	var cursoModalPublicar = {
		templateUrl: './scripts/components/curso-modal-publicar/curso-modal-publicar.html',
		controller: [
			'$scope',
			CursoModalPublicar
		]
	};

	angular
		.module('app')
			.component('cursoModalPublicar', cursoModalPublicar); // El nombre debe estar con camel case
})();