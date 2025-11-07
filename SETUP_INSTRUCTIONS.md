# Instrucciones de Configuración - Music Generator

## Cómo obtener SESSION_ID y COOKIE de Suno.ai

Para usar esta aplicación, necesitas obtener tus credenciales de Suno.ai. Sigue estos pasos:

### Paso 1: Inicia sesión en Suno.ai
1. Ve a [https://suno.ai](https://suno.ai)
2. Inicia sesión con tu cuenta

### Paso 2: Abre las Herramientas de Desarrollador
1. Una vez que hayas iniciado sesión, presiona `F12` en tu teclado (o `Ctrl+Shift+I` en Windows/Linux, `Cmd+Option+I` en Mac)
2. Esto abrirá las herramientas de desarrollador del navegador

### Paso 3: Ve a la pestaña Network (Red)
1. Haz clic en la pestaña "Network" o "Red" en las herramientas de desarrollador
2. Actualiza la página (F5) para capturar las peticiones

### Paso 4: Busca una petición a la API
1. En la lista de peticiones, busca cualquier petición que vaya a `studio-api.suno.ai`
2. Haz clic en esa petición

### Paso 5: Encuentra los Headers (Encabezados)
1. En el panel derecho, busca la sección "Headers" o "Encabezados"
2. Desplázate hasta encontrar "Request Headers" o "Encabezados de Solicitud"

### Paso 6: Copia las credenciales

#### Para obtener el COOKIE:
1. Busca el campo `Cookie:` en los Request Headers
2. Copia TODO el valor después de `Cookie:`
3. Debería verse algo como: `__client=...; __client_uat=...; __session=...`

#### Para obtener el SESSION_ID:
1. Dentro del valor del Cookie, busca la parte que dice `__session=`
2. El SESSION_ID es el valor que viene después de `__session=`
3. Copia ese valor hasta el siguiente `;` o hasta el final

### Ejemplo Visual:
```
Cookie: __client=abc123; __client_uat=xyz789; __session=def456ghi789
                                                          ^^^^^^^^^^^
                                                          Este es tu SESSION_ID
```

### Paso 7: Ingresa los valores en la aplicación
1. Abre la aplicación Music Generator
2. En la sección "Configuration", pega:
   - El SESSION_ID en el campo "Session ID"
   - El COOKIE completo en el campo "Cookie"

## Nota Importante
- Estas credenciales son privadas y personales
- NO las compartas con nadie
- Expiran periódicamente, así que si la app deja de funcionar, repite estos pasos para obtener nuevas credenciales

## Uso de la Aplicación

Una vez configuradas las credenciales:

1. **Título**: Escribe el título de tu canción
2. **Prompt**: Describe la música que quieres generar (ej: "Una canción alegre de pop con guitarra acústica")
3. **Tags**: Agrega etiquetas de género (ej: "pop, acoustic, upbeat")
4. Haz clic en "Generate Music"

El historial de tus generaciones se guardará automáticamente y podrás verlo en la sección inferior.
