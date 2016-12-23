/************************************************
Factory para compartir datos entre los controladores
************************************************/

(function (){
	'use strict';

	function StorageFactory()
	{
    var storage = {
    	categories: {}, // Objeto para almacenas categorias
    	categoryEdit: '', // titulo de la categoria a editar
    	courses: {}, // Objeto para almacenar los cursos
    	courseEdit: {}, // Objeto para almacenar un curso en especifico
    	user: {
    		id: 1234567890, // ID del usuario
    		name: 'Paulo Andrade', // Nombre del usuario
    		nivel: 1, // Nivel de accesibilidad
    		userName: 'nemesis866' // User name
    	}
    };

    return storage;
	}

	angular
		.module('app')
			.factory('storageFactory', [
				StorageFactory
			]);
})();