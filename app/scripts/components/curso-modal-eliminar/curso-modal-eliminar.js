/*************************************
Webcomponent para eliminar curso
*************************************/

(function (){
	'use strict';

	// Controlador
	function CursoModalEliminar (storageFactory, courseService)
	{
		var vm = this;
		vm.control = 0; // Control para la ventana modal

		// Eliminamos un tema
		vm.deleteCourse = function ()
		{
			var control = courseService.deleteCourse(vm.courseId);

			// Verificamos el control
			if(control === 1){
				// Cerramos la ventana modal
				vm.closeCourse();
			}
		};

		// Cerramos la ventana modal
		vm.closeCourse = function ()
		{
			// Actualizamos control
			vm.control = 1;

			// Cerramos
			$('#bs-curso-eliminar-modal-lg').modal('hide');

			// Actualizamos el control
			vm.control = 0;
		};

		// Ventana modal para formulario de tema
		$('#bs-curso-eliminar-modal-lg').on('show.bs.modal', function (event) {
			var button = $(event.relatedTarget); // Button that triggered the modal
  			var id = button.data('id'); // Extract info from data-* attributes

			vm.courseId = id; // Guardamos el ID del modal abierto
		});

		// Evento llamado antes de cerrar la ventana
		$('#bs-course-eliminar-modal-lg').on('hide.bs.modal', function (event) {
			// Verificamos el control
			if(vm.control === 0){
				// Evitamos que la ventana se cierre
				event.preventDefault();
			}
		});
	}

	// Configuracion del web component
	var cursoModalEliminar = {
		templateUrl: './scripts/components/curso-modal-eliminar/curso-modal-eliminar.html',
		controller: [
			'storageFactory',
			'courseService',
			CursoModalEliminar
		]
	};

	angular
		.module('app')
			.component('cursoModalEliminar', cursoModalEliminar); // El nombre debe estar con camel case
})();