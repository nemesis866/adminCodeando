/************************************************
Servicio para obtener las categorias
************************************************/

// Recurso para GET (todos) y POST
(function (){
	'use strict';

	function CategoryResource ($resource)
	{
		var url = 'http://127.0.0.1:5000/categories';

		return $resource(url, {}, {
  			'save': { method:'POST', isArray:false }
  		});
  		// return $resource(url);
	}

	angular
		.module('app')
			.service('categoryResource', [
				'$resource',
				CategoryResource
			]);
})();

// Recurso para GET (uno solo) y DELETE
(function (){
	'use strict';

	function CategoryExtraResource ($resource)
	{
		var url = 'http://127.0.0.1:5000/categories/:id';

		return $resource(url, {}, {
			'update': { method: 'PUT' }
		});
	}

	angular
		.module('app')
			.service('categoryExtraResource', [
				'$resource',
				CategoryExtraResource
			]);
})();