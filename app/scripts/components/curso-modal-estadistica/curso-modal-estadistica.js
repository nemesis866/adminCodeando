/*************************************
Webcomponent para curso modal estadistica
*************************************/

(function (){
	'use strict';

	// Controlador
	function CursoModalEstadistica()
	{
		var vm = this;

		vm.msg = 'holamundo';

		// Ventana modal para estadistica
		$('#bs-estadistica-modal-lg').on('show.bs.modal', function () {
			// var button = $(event.relatedTarget); // Button that triggered the modal
  			// var id = button.data('id'); // Extract info from data-* attributes

			// var modal = $(this);
			// modal.find('.modal-title').text('New message to '+id);
		});
	}

	// Configuracion del web component
	var cursoModalEstadistica = {
		templateUrl: './scripts/components/curso-modal-estadistica/curso-modal-estadistica.html',
		controller: [
			CursoModalEstadistica
		]
	};

	angular
		.module('app')
			.component('cursoModalEstadistica', cursoModalEstadistica); // El nombre debe estar con camel case
})();