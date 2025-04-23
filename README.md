# 👟 E-Commerce de Tenis

¡Bienvenido a este demo de un e-commerce! 🎉

## 🚀 Características Principales

- ✨ Interfaz moderna y responsive
- 🎨 Modo claro/oscuro automático
- 🛍️ Catálogo de productos
- 🛒 Carrito de compras
- 💳 Proceso de pago seguro

## 🛠️ Tecnologías Utilizadas

- ⚛️ React + TypeScript
- 🎨 Chakra UI para diseño moderno
- 🔄 Vite para desarrollo rápido
- 🛣️ React Router para navegación
- 🎭 Tema personalizado y modos de color
- 🖥️ Express para el servidor backend
- 🗄️ PostgreSQL para la base de datos

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone [url-del-repositorio]
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

## 🔧 Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo frontend
- `npm run server` - Inicia el servidor backend
- `npm run dev:full` - Inicia tanto el frontend como el backend simultáneamente
- `npm run build` - Construye la aplicación para producción
- `npm run preview` - Vista previa de la versión de producción

## 🌐 Estructura del Proyecto

- `/src/components` - Componentes reutilizables
- `/src/pages` - Páginas de la aplicación
- `/src/services` - Servicios para comunicación con la API
- `/src/models` - Interfaces y modelos de datos
- `/src/theme.ts` - Configuración del tema
- `/src/assets` - Recursos estáticos
- `/server` - Servidor backend con Express

## 🔄 Solución al Error de Conexión a PostgreSQL

Se ha implementado una arquitectura cliente-servidor para resolver el error de conexión directa a PostgreSQL desde el frontend. El error ocurría porque el módulo `pg.js` de Vite intentaba importar `cloudflare:sockets`, lo cual no es posible en un entorno de navegador.

La solución implementada consiste en:

1. Crear un servidor backend con Express que maneja la conexión a PostgreSQL
2. Modificar el frontend para comunicarse con el backend a través de una API REST
3. Actualizar la configuración de Vite para usar un proxy que redirija las peticiones a la API

Para ejecutar correctamente el proyecto, asegúrate de usar `npm run dev:full` para iniciar tanto el frontend como el backend.

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Por favor, sigue estos pasos:

1. 🍴 Haz un fork del proyecto
2. 🔧 Crea una rama para tu feature
3. 📝 Realiza tus cambios
4. 📫 Envía un pull request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE para más detalles.

---

⭐️ ¡No olvides dar una estrella si te gusta el proyecto! ⭐️
