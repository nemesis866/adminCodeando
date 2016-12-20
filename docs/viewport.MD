Documentacion para viewport
===========================

Se encarga del area visual en la que se muestran los documentos HTML.

# Atributos

	* width.-
		* device-width.
		* Numero de pixeles.
	* height.-
		* device-height.
		* Numero de pixeles.
	* initial-scale.-
		* De 0 a 1 (1 indica que es sin escala).
	* user-scale.- (indica si el usuario puede cambiar la escala)
		* yes.
		* no.
	* minimum-scale.-
		* De 0 a 1 (escala minima del viweport).
	* maximum-scale.-
		* De 0 a 1 (escala maxima del viewport).

# Para aplicar responsive desing.-

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

# En moviles conviene deshabilitar el zooming.-

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1-0, user-scalable=no"/>
```