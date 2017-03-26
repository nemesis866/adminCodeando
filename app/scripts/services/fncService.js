/************************************************
Servicio para funciones repetitivas
************************************************/

(function (){
	'use strict';

	function FncService ()
	{
		// Funcion para verificar solo tamaño
		this.checkSize = function (data, size, title)
		{
			var text = '';

			if(data.length < size){
				text = 'Debe ingresar minimo '+size+' caracteres para el campo '+title;
			}

			if(!this.isEmpty(text)){
				this.error(text);

				return true;
			} else {
				return false;
			}
		};
		// Funcion para verificar los input
		this.checkInput = function (data, size, title)
		{
			var text = '';

			if(data.length === 0){
				text = '* Debe llenar todos los campos del formulario';
			} else if(data.indexOf('<') !== -1){
				text = 'Esta ingresando caracteres no permitidos "<"';
			} else if(data.indexOf('>') !== -1){
				text = 'Esta ingresando caracteres no permitidos ">"';
			} else if(data.indexOf(';') !== -1){
				text = 'Esta ingresando caracteres no permitidos ";"';
			} else if(data.length < size){
				text = 'Debe ingresar minimo '+size+' caracteres para el campo '+title;
			}

			if(!this.isEmpty(text)){
				this.error(text);

				return true;
			} else {
				return false;
			}
		};

		// Funcion que verifica si una clase existe en un elemento html
		this.thereClass = function (elem, cls)
		{
		    return elem.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
		};

		//Función para agregar una clase, si no existe la clase enviada - agrega la clase.
		this.addClass = function (elem, cls)
		{
		    if(!this.thereClass(elem, cls)){
		        elem.className += ' '+cls;
		    }
		};

		// Función para Eliminar una clase
		this.removeClass = function (elem, cls)
		{
		    if(this.thereClass(elem, cls)){
		        var exp = new RegExp('(\\s|^)'+cls);

		        elem.className = elem.className.replace(exp, '');
		    }
		};

		// Funcion que comprueba que un string contenga el formato de un email
		this.checkEmail = function (email){
			if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
				return true; // Si es un email
			} else {
				return false; // Si no es un email
			}
		};

		// Muestra un error en pantalla
		this.error = function (msg)
		{
			document.querySelector('.error').innerHTML = msg;
			document.querySelector('.error').style.transform = 'translateY(0)';
			document.querySelector('.error').style.webkitTransform = 'translateY(0)';
			setTimeout(function(){
				document.querySelector('.error').innerHTML = '';
				document.querySelector('.error').style.transform = 'translateY(-60px)';
				document.querySelector('.error').style.webkitTransform = 'translateY(-60px)';
			}, 3000);
		};

		// Verifica si un objeto esta vacio
		this.isEmpty = function (obj)
		{
		    // null and undefined are "empty"
		    if(obj === null){
		    	return true;
		    }

		    // Assume if it has a length property with a non-zero value
		    // that that property is correct.
		    if(obj.length > 0){
		    	return false;
		    }
		    if(obj.length === 0){
		    	return true;
		    }

		    // Otherwise, does it have any properties of its own?
		    // Note that this doesn't handle
		    // toString and valueOf enumeration bugs in IE < 9
		    for(var key in obj){
		        if(hasOwnProperty.call(obj, key)){
		        	return false;
		        }
		    }

		    return true;
		};

		// Muestra un suceso en pantalla
		this.success = function (msg)
		{
			document.querySelector('.success').innerHTML = msg;
			document.querySelector('.success').style.transform = 'translateY(0)';
			document.querySelector('.success').style.webkitTransform = 'translateY(0)';
			setTimeout(function(){
				document.querySelector('.success').innerHTML = '';
				document.querySelector('.success').style.transform = 'translateY(-60px)';
				document.querySelector('.success').style.webkitTransform = 'translateY(-60px)';
			}, 3000);
		};

		// Funcion para obtener un elemento ID
		this.getElement = function (id)
		{
			if(document.querySelectorAll(id)){
				return document.querySelectorAll(id);
			}
			return null;
		};

		// Funcion para fijar el cursor del textarea
		this.setCursorPosition = function (element, pos)
		{
		    if(element.setSelectionRange){
		        element.setSelectionRange(pos, pos);
		    } else if(element.createTextRange) {
		        var range = element.createTextRange();
		        range.collapse(true);
		        range.moveEnd('character', pos);
		        range.moveStart('character', pos);
		        range.select();
		    }

		    return element;
		};

		// Funcion para obtener la posicion de un cursor en el textarea
		this.getCursorPosition = function (elem){
		    var pos = 0;
		    if('selectionStart' in elem){
		        pos = elem.selectionStart;
		    } else if('selection' in document){
		        elem.focus();
		        var sel = document.selection.createRange();
		        var selLength = document.selection.createRange().text.length;
		        sel.moveStart('character', -elem.value.length);
		        pos = sel.text.length - selLength;
		    }
		    return pos;
		};

		// Funcion para obtener el texto seleccionado de un textarea
		this.getCursorSelection = function (elem){
		    if('selectionStart' in elem){
		        var startPos = elem.selectionStart;
		        var endPos = elem.selectionEnd;
		        return elem.value.substr(startPos, endPos - startPos);
		    } else if('selection' in document){
		        elem.focus();
		        var selection = document.selection.createRange();
		        return selection.text;
		    }
		};

		// Funcion para transformar cadenas para guardar en la base de datos
		this.prepareCode = function (content)
		{
			// Cadena para valorar
			//var codigo = Array("<", ">","){","(",")","\n", "[b]", "[/b]", "[I]", "[/I]",
			//	"[u]", "[/u]","[t]","[/t]","'","javascript:","array:","text/html");
			var codigo = Array('[code]', '[/code]', "'", '\n', '[b]', '[/b]', '[I]', '[/I]', '[u]', '[/u]','[t]','[/t]');
			// Cadena para transformar
			//var replace = Array("[-","-]",") {","&-","-&","<br>","<b>","</b>","<i>","</i>",
			//	"<u>","</u>","<strike>","</strike>",'"',"javascript :","array :","text/htm");
			var replace = Array('<pre class="code">','</pre>', '"', '<br>', '<strong>', '</strong>', '<i>', '</i>', '<u>', '</u>', '<strike>', '</strike>');

			if(content.length > 0){
				// Reemplazamos en el contenido
				for(var i = 0; i <= codigo.length; i++){
					while(content.indexOf(codigo[i]) >= 0){
						content = content.replace(codigo[i], replace[i]);
					}
				}
			}

			// Retornamos el resultado
			return content;
		};

		// Funcion para transformar cadenas desde la base de datos
		this.getCode = function (content)
		{
			// Cadena para valorar
			// var codigo = Array("[-","-]",") {","&-","-&","<br>","<b>","</b>","<i>","</i>",
			//	"<u>","</u>","<strike>","</strike>",'"',"javascript :","array :","text/htm");
			var codigo = Array('<pre class="code">','</pre>', '<br>', '<strong>', '</strong>', '<i>', '</i>', '<u>', '</u>', '<strike>', '</strike>');
			// Cadena para transformar
			// var replace = Array("<", ">","){","(",")","\n", "[b]", "[/b]", "[I]", "[/I]",
			//	"[u]", "[/u]","[t]","[/t]","'","javascript:","array:","text/html");
			var replace = Array('[code]', '[/code]', '\n', '[b]', '[/b]', '[I]', '[/I]', '[u]', '[/u]','[t]','[/t]');

			// Reemplazamos en el contenido
			for(var i = 0; i <= codigo.length; i++){
				while(content.indexOf(codigo[i]) >= 0){
					content = content.replace(codigo[i], replace[i]);
				}
			}

			// Retornamos el resultado
			return content;
		};

		// Funcion que comprueba que una url sea de youtube
		this.checkYouTube = function (url){
			if(/^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=))([\w-]{11})(?:.+)?$/.test(url)){
				return true; // Si es
			} else {
				return false; // Si no es
			}
		};

		// Funcion que comprueba que una url sea de github
		this.checkGithub = function (url){
			if(/^(?:https?:\/\/)?(?:www\.)?(?:github\.com)+(\/[0-9a-zA-Z]{1,}\/)(?:.+)?$/.test(url)){
				return true; // Si es
			} else {
				return false; // Si no es
			}
		};

		// Funcion que coloca el primer texto en mayusculas
		this.upperCase = function (string){
			return string.charAt(0).toUpperCase() + string.slice(1);
		};
	}

	angular
		.module('app')
			.service('fncService', FncService);
})();