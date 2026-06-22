# IamFit - Frontend

## Descripcion del proyecto

IamFit es una aplicacion movil enfocada en apoyar a los usuarios en el seguimiento de habitos relacionados con actividad fisica, alimentacion y progreso personal.

El frontend permite registrar usuarios, iniciar sesion, recuperar contrasena, visualizar informacion principal desde el home, revisar rutinas, gestionar datos de alimentacion y acceder al perfil del usuario. Tambien incluye componentes reutilizables para formularios, botones, navegacion, filtros, tarjetas de informacion y otros elementos de interfaz.

El proyecto esta desarrollado como una aplicacion Expo con React Native, lo que permite ejecutarla en Android, iOS y web durante el desarrollo.

## Tecnologias utilizadas

- **Expo**: framework principal para crear y ejecutar la aplicacion movil.
- **React Native**: tecnologia base para construir la interfaz movil.
- **React**: libreria utilizada para crear componentes y manejar la UI.
- **TypeScript**: lenguaje usado para mejorar el tipado y la mantenibilidad del codigo.
- **Expo Router**: sistema de navegacion basado en archivos dentro de la carpeta `app`.
- **React Navigation**: soporte para navegacion, tabs y pantallas.
- **Vitest y Testing Library**: herramientas para pruebas unitarias y de componentes.
- **ESLint y Prettier**: herramientas para mantener calidad y formato del codigo.
- **pnpm**: gestor de paquetes recomendado por el proyecto.

## Estructura general del proyecto

- `app/`: rutas y pantallas principales usando Expo Router.
- `src/screens/`: pantallas organizadas por modulo o flujo de usuario.
- `src/features/`: funcionalidades especificas del dominio, como rutina, home, alimentacion y M.I.A.
- `src/core/`: componentes reutilizables, hooks, utilidades, contexto y navegacion.
- `src/services/`: servicios de comunicacion con API, autenticacion, perfil, rutinas, ejercicios, alimentacion y M.I.A.
- `src/theme/`: configuracion visual de colores, fuentes y estilos base.
- `assets/`: imagenes, iconos y fuentes del proyecto.
- `test/`: configuraciones y mocks utilizados por las pruebas.

## Estructura del equipo

| Integrante        | Rol              |
| ----------------- | ---------------- |
| Camilo Mena       | Jefe de Proyecto |
| Nicolas Rivera    | QA               |
| Lucciano Martinez | DevOps           |
| Benjamin Lizama   | Desarrollador    |

## Comandos principales

Instalar dependencias:

```bash
pnpm install
```

Iniciar el proyecto:

```bash
pnpm start
```

Ejecutar en Android:

```bash
pnpm android
```

Ejecutar en iOS:

```bash
pnpm ios
```

Ejecutar pruebas:

```bash
pnpm test
```

Validar TypeScript:

```bash
pnpm ts:check
```
