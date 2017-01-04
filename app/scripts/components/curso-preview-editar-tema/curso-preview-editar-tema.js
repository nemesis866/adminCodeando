/*************************************
Webcomponent para curso modal editar tema
*************************************/

(function (){
	'use strict';

	// Controlador
	function CursoPreviewEditarTema (storageFactory, themeService)
	{
		var vm = this;
		vm.control = 0; // Control para la ventana modal

		// Actualizamos el tema
		vm.updateTheme = function (model)
		{
			// Acciones para model
			if(typeof(model) === 'undefined'){
				model = {};
				model.titulo = '';
			}

			var control = themeService.updateTheme(model, vm.themeId);

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

			// Cerramos
			$('#bs-tema-editar-modal-lg').modal('hide');

			// Actualizamos el control
			vm.control = 0;
		};

		// Ventana modal para formulario de capitulo
		$('#bs-tema-editar-modal-lg').on('show.bs.modal', function (event) {
			var button = $(event.relatedTarget); // Button that triggered the modal
  			var id = button.data('id'); // Extract info from data-* attributes

			vm.themeId = id; // Guardamos el ID del modal abierto

			// Obtenemos el titulo del tema a editar
			for(var i = 0; i < storageFactory.themes.length; i++){
				if(storageFactory.themes[i]._id === vm.themeId){
					document.getElementById('editTheme').value = storageFactory.themes[i].titulo;
				}
			}
		});

		// Evento llamado antes de cerrar la ventana
		$('#bs-tema-editar-modal-lg').on('hide.bs.modal', function (event) {
			// Verificamos el control
			if(vm.control === 0){
				// Evitamos que la ventana se cierre
				event.preventDefault();
			}
		});
	}

	// Configuracion del web component
	var cursoPreviewEditarTema = {
		templateUrl: './scripts/components/curso-preview-editar-tema/curso-preview-editar-tema.html',
		controller: [
			'storageFactory',
			'themeService',
			CursoPreviewEditarTema
		]
	};

	angular
		.module('app')
			.component('cursoPreviewEditarTema', cursoPreviewEditarTema); // El nombre debe estar con camel case
})();