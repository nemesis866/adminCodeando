/*************************************
Webcomponent para curso modal crear tema
*************************************/

(function (){
	'use strict';

	// Controlador
	function CursoPreviewNuevoTema (themeService)
	{
		var vm = this;
		vm.control = 0; // Control para la ventana modal

		// Configuración del formulario
		vm.formConfig = {
			required: true,
			pattern: '/^[a-zA-Z]{3,60}$/'
		};

		// Guardamos un tema
		vm.setTheme = function (model)
		{
			// Acciones para model
			if(typeof(model) === 'undefined'){
				model = {};
				model.titulo = '';
			}

			var control = themeService.setTheme(model, vm.cursoId, vm.capituloID);

			// Verificamos el control
			if(control === 1){
				// Cerramos la ventana modal
				vm.closeTheme();
			}
		};

		// Cerramos la ventana modal
		vm.closeTheme = function ()
		{
			// Actualizamos control
			vm.control = 1;

			// Limpiamos el input
			document.getElementById('themeTitle').value = '';

			// Cerramos
			$('#bs-tema-nuevo-modal-lg').modal('hide');

			// Actualizamos el control
			vm.control = 0;
		};

		// Ventana modal para formulario de tema
		$('#bs-tema-nuevo-modal-lg').on('show.bs.modal', function (event) {
			var button = $(event.relatedTarget); // Button that triggered the modal
  			var curso = button.data('curso'); // Extract info from data-* attributes
  			var capitulo = button.data('capitulo');

			vm.cursoId = curso; // Guardamos el ID del modal abierto
			vm.capituloID = capitulo;
		});

		// Evento llamado antes de cerrar la ventana
		$('#bs-tema-nuevo-modal-lg').on('hide.bs.modal', function (event) {
			// Verificamos el control
			if(vm.control === 0){
				// Evitamos que la ventana se cierre
				event.preventDefault();
			}
		});
	}

	// Configuracion del web component
	var cursoPreviewNuevoTema = {
		templateUrl: './scripts/components/curso-preview-nuevo-tema/curso-preview-nuevo-tema.html',
		controller: [
			'themeService',
			CursoPreviewNuevoTema
		]
	};

	angular
		.module('app')
			.component('cursoPreviewNuevoTema', cursoPreviewNuevoTema); // El nombre debe estar con camel case
})();