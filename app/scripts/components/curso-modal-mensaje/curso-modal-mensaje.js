/*************************************
Webcomponent para curso modal mensajes
*************************************/

(function (){
	'use strict';

	// Controlador
	function CursoModalMensaje()
	{
		var vm = this;

		vm.msg = 'holamundo';

		// Ventana modal para mensajes
		$('#bs-mensaje-modal-lg').on('show.bs.modal', function (event) {
			var button = $(event.relatedTarget); // Button that triggered the modal
  			var id = button.data('id'); // Extract info from data-* attributes

			var modal = $(this);
			modal.find('.modal-title').text('New message to '+id);
		});
	}

	// Configuracion del web component
	var cursoModalMensaje = {
		templateUrl: './scripts/components/curso-modal-mensaje/curso-modal-mensaje.html',
		controller: [
			CursoModalMensaje
		]
	};

	angular
		.module('app')
			.component('cursoModalMensaje', cursoModalMensaje); // El nombre debe estar con camel case
})();