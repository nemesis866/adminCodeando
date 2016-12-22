/************************************************
Factory para compartir datos entre los controladores
************************************************/

(function (){
	'use strict';

	function StorageFactory()
	{
    var storage = {
    	categories: {}, // Objeto para almacenas categorias
    	categoryEdit: ''
    };

    return storage;
	}

	angular
		.module('app')
			.factory('storageFactory', [
				StorageFactory
			]);
})();