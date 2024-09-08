# Frontend (Angular)

## Requisitos previos

- Node.js 18 o superior
- npm 6.x o superior
- Angular CLI 15 o superior

## Instalación

1. Clona el repositorio (si aún no lo has hecho):
   ```
   git clone [URL_DEL_REPOSITORIO]
   ```

2. Navega al directorio del proyecto frontend:
   ```
   cd [NOMBRE_DEL_DIRECTORIO_FRONTEND]
   ```

3. Instala las dependencias:
   ```
   npm install
   ```

## Ejecución

Para iniciar el servidor de desarrollo, ejecuta:
```
ng serve
```

El servidor de desarrollo estará disponible en `http://localhost:4200`.

Para abrir automáticamente el navegador al iniciar, usa:
```
ng serve --open
```

## Compilación para producción

Para construir el proyecto para producción, ejecuta:
```
ng build --prod
```

Los archivos compilados se generarán en el directorio `dist/`.

## Estructura del proyecto

- `src/app/` - Componentes, servicios y módulos de la aplicación
- `src/assets/` - Imágenes, fuentes y otros recursos estáticos
- `src/environments/` - Archivos de configuración de entorno
- `src/styles.css` - Estilos globales

## Comandos útiles

- `ng generate component component-name` - Genera un nuevo componente
- `ng generate service service-name` - Genera un nuevo servicio
- `ng test` - Ejecuta las pruebas unitarias
- `ng e2e` - Ejecuta las pruebas end-to-end

## Solución de problemas comunes

1. Si encuentras errores de dependencias, intenta borrar `node_modules` y `package-lock.json`, luego ejecuta `npm install` nuevamente.

2. Para problemas de compilación, asegúrate de que tu versión de Node.js sea compatible con la versión de Angular que estás usando.

3. Si tienes problemas con CORS al conectar con el backend, verifica la configuración de CORS en tu servidor backend.

## Mejores prácticas

- Utiliza la arquitectura de componentes de Angular para una mejor organización del código.
- Implementa lazy loading para módulos grandes para mejorar el rendimiento.
- Utiliza servicios para la lógica de negocio y las llamadas a API.
- Sigue las guías de estilo de Angular para mantener un código consistente.

## Contribuir

Si deseas contribuir al proyecto, por favor sigue estas pautas:
1. Haz un fork del repositorio
2. Crea una nueva rama para tu feature
3. Haz tus cambios y commitea
4. Envía un pull request

¡Gracias por contribuir!

## Soporte

Si encuentras algún problema o tienes alguna pregunta, por favor abre un issue en el repositorio de GitHub.

¡Listo! Tu aplicación Angular está configurada y en funcionamiento.
