# Plantilla para cursos de Morelco

## 🛠️ Construido con

- [Vite](https://vitejs.dev/) -- Utilidades Frontend para la creación y ejecución del proyecto
- [React JS](https://es.react.dev/) -- Librería Frontend para el manejo de componentes
- [Bootstrap](https://getbootstrap.com/) -- Librería de estilos
- [TailwindCSS](https://tailwindcss.com/) -- Librería de estilos
- [FontAwesome](https://fontawesome.com/icons) -- Paquete de íconos
- [video-react](https://video-react.js.org/) -- Renderización de Videos moderna
- [Zustand](https://zustand-demo.pmnd.rs/) -- Manejador de estados globales
- [ESLint](https://eslint.org/) -- Herramienta para el análisis e identificación de errores y advertencias de código
- [Prettier](https://prettier.io/) -- Code Formatter

## 👨🏻‍💻 Cómo ejecutarlo? 
Debemos tener instalado `npm`, para eso, se puede seguir la guía adjunta:

https://www.cursosgis.com/como-instalar-node-js-y-npm-en-4-pasos/

Después de realizar los pasos de esa guía, se sugiere cerrar sesión y volver a iniciar, para que las variables del sistema se apliquen.

Seguidamente abriremos la carpeta del proyecto con Visual Studio Code

Desde VSCode podemos ejecutar la terminal en la parte inferior dando clic en `View > Terminal`

La terminal nos permitirá ejecutar los comandos necesarios para tener el proyecto funcionando en nuestra máquina local. Seguiremos estos pasos:

- Ejecutamos `npm install`, para que se instalen todas las dependencias que necesita el proyecto para funcionar.
- Ejecutamos `npm run dev` para ejecutar el proyecto. Al ejecutarse este comando, la respuesta será la URL en la que se está ejecutando el proyecto. Damos clic y se abrirá el navegador con el proyecto funcionando.

Con esto tendremos el proyecto funcional en nuestra máquina. Cada que modifiquemos el código y demos en guardar, se actualizarán automáticamente los cambios.

## 📚 Estructura del Proyecto

La estructura básica del proyecto es esta:

```
├── dist
├── node_modules
├── public
├── src
│   ├── assets
│   ├── pages
│   │   ├── components
│   │   ├── slides
│   ├── templates
├── .eslintrc.cjs
├── .gitignore
├── package.json
├── package-lock.json
├── README.md
├── tailwind.config.js
├── vite.config.js
└── postcss.config.js
```

Veamos los archivos con los que estaremos trabajando

### .gitignore
es un archivo en el que podemos poner los directorios y/o archivos que no queramos que se suban al repositorio. A veces tendremos que definir archivos que tendrán información sensible. Por seguridad no se subirán.

## tailwind.config.js
Aquí están definidos los colores y las tipografías. Si queremos cambiar estos, lo haremos desde este archivo y los cambios se verán reflejados en todo el proyecto. Ingresar al archivo para analizar sus comentarios y su estructura.

## src
En este directorio se encuentran todos los componentes que conforman el proyecto. Dentro encontraremos la carpeta `assets` que contendrá todos los archivos multimedia usados en el proyecto, la carpeta `pages` tendrá todos los componentes que definirán lo que verá el usuario. Dentro de Pages está `components` y `slides`. La primera tendrá los componentes que definen el Header, el Drawer y el manejador de las slides (Ingresar a estos archivos para analizar su estructura y ver los comentarios que hay allí), la segunda tendrá cada una de las slides separadas por componentes (indagar los archivos, también hay comentarios que ayudarán a entender qué hacen).

## templates
En este directorio estarán los componentes Plantilla. La idea es que esta carpeta vaya creciendo para ir estandarizando todo el contenido y que sea más fácil construir cursos cada vez. **No hay ningún problema en tener muchísimos componentes y elementos en el proyecto, ya que cuando vamos a contruir el proyecto para desplegarlo, el comando sólo incluirá los componentes que se están utilizando.**

## 🚀 Construir el proyecto para despliegue en servidores
Si deseamos tener un paquete que podamos subir a algún servidor, debemos ejecutar el siguiente comando:

- `npm run build`

Esto generará una carpeta `dist` en el directorio en el que estamos trabajando que contendrá todos los archivos para hacer despliegue. Accedemos al directorio y compartimos ese grupo de archivos para subirlos al servidor.

## 🤝 Contribuir

Este código está en la rama `main` del repositorio. Se debe clonar el repositorio en local, y se debe crear una nueva rama. Sugiero la siguiente estructura:

`desarrollador-caracteristica`

Quedaría así, por ejemplo:

`jaime-crearSlide11`

`jaime-correccionEstilos`

SIEMPRE hacer un Pull Request antes de hacer merge. ¡No hacer merge en Main sin PR!
El Pull Request es una herramienta que nos permitirá evaluar el código antes de combinarlo con la rama principal, y es una buena práctica que debemos hacer siempre.


