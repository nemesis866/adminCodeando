/************************************************
Servicio para obtener las categorias
************************************************/

(function (){
	'use strict';

	function CategoryResource ($resource)
	{
		var url = 'http://127.0.0.1:5000/categories';

		return $resource(url, {}, {
  			'save': { method:'POST', isArray:true }
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