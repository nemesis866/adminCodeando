/************************************************
Servicio para obtener las categorias
************************************************/

// Recurso para GET (todos) y POST
(function (){
	'use strict';

	function CategoryResource ($resource, storageFactory)
	{
		var url = storageFactory.urlServer+'/categories';

		return $resource(url, {}, {
  			'save': { method:'POST', isArray:false }
  		});
  		// return $resource(url);
	}

	angular
		.module('app')
			.service('categoryResource', [
				'$resource',
				'storageFactory',
				CategoryResource
			]);
})();

// Recurso para GET (uno solo) y DELETE
(function (){
	'use strict';

	function CategoryExtraResource ($resource, storageFactory)
	{
		var url = storageFactory.urlServer+'/categories/:id';

		return $resource(url, {}, {
			'update': { method: 'PUT' }
		});
	}

	angular
		.module('app')
			.service('categoryExtraResource', [
				'$resource',
				'storageFactory',
				CategoryExtraResource
			]);
})();