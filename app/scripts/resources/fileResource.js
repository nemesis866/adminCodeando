/************************************************
Servicio para obtener los archivos
************************************************/

// Recurso para GET (todos) y POST
(function (){
	'use strict';

	function FileResource ($resource, storageFactory)
	{
		var url = storageFactory.urlServer+'/files';

		return $resource(url, {}, {
  			'save': { method:'POST', isArray:false }
  		});
  		// return $resource(url);
	}

	angular
		.module('app')
			.service('fileResource', [
				'$resource',
				'storageFactory',
				FileResource
			]);
})();

// Recurso para GET (uno solo) y DELETE
(function (){
	'use strict';

	function FileExtraResource ($resource, storageFactory)
	{
		var url = storageFactory.urlServer+'/files/:id';

		return $resource(url, {}, {
			'update': { method: 'PUT' }
		});
	}

	angular
		.module('app')
			.service('fileExtraResource', [
				'$resource',
				'storageFactory',
				FileExtraResource
			]);
})();

// Recurso para GET (uno solo) y DELETE extras
(function (){ 
	'use strict';

	function FileTemaResource ($resource, storageFactory)
	{
		var url = storageFactory.urlServer+'/files/tema/:id';

		return $resource(url, {}, {
			'update': { method: 'PUT' }
		});
	}

	angular
		.module('app')
			.service('fileTemaResource', [
				'$resource',
				'storageFactory',
				FileTemaResource
			]);
})();