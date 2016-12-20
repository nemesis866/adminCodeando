Documentacion para la dependencia ngReact
=========================================

AngularJS es excelente como controlador. Pero su motor de visualización no es muy eficiente para generar vistas basadas en grandes colecciones de objetos que cambian constantemente. Este es un escenario muy común en aplicaciones en tiempo real. Pero, afortunadamente, ReactJS se enfoca en ese tipo de escenarios y nos ofrece hasta un 80% más de velocidad. Esto gracias a que primero calcula los cambios necesarios en el Virtual-DOM.

# Instalacion

Se recomienda instalarlo desde el gestor de dependencias de bower.-

```js
sudo npm install -g bower
```

despues instala ngReact.-

```js
bower install ngReact
```

Tendras acceso a la libreria desde.-

```js
bower_components/react/react.js
bower_components/react/react-dom.js
bower_components/ngReact/ngReact.min.js
```

Nota.- Al instalar ngReact mediante bower, asegurate de estar en el directorio principal de tu proyecto.

Incluimos la dependencia a nuestra app de angular.-

```js
angular
	.module('app', [
		'react'
	]);
```

# componentes de react

Las directivas de react-component nos ayuda a embeber nuestras directivas facilmente, por ejemplo declaramos un modulo de nuestra aplicacion.-

```js
(function (){
	'use strict';

	function MainController ($scope)
	{
		var vm = this;

		vm.person = { fname: 'Clark', lname: 'Kent' };
	}

	angular
		.module('app')
			.controller('mainController', ['$scope', MainController]);
})();
```

Creamos el componente.-

```js
var HelloComponent = React.createClass({
	propTypes: {
		fname : React.PropTypes.string.isRequired,
		lname : React.PropTypes.string.isRequired
	},
	render: function() {
		return <span>Hello {this.props.fname} {this.props.lname}</span>;
	}
})

app.value('HelloComponent', HelloComponent);
```

Lo usamos en nuestra plantilla.-

```html
<body ng-app="app">
<div ng-controller="helloController">
    <react-component name="HelloComponent" props="person" watch-depth="reference"/>
</div>
</body>
```

Los atributos de reac-component son los siguientes.-

* name.- Le indicamos el nombre de nuestro componente de react e inyectara los datos.
* props.- Le indicamos el objeto que contiene los datos para el componente.
* watch-depth.- Detecta cambios en el componente (esta en escucha). Los posibles valores son los siguientes.-
	* reference.
	* collection.
	* value (default).

# Servicio reactDirective

