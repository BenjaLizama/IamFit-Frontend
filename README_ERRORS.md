# IamFit - Frontend

Esta es una aplicación móvil desarrollada con **React Native** y **Expo** para la gestión y seguimiento de entrenamientos y vida saludable.

Este documento sirve como guía oficial para el equipo de desarrollo. Sigue estas instrucciones para asegurar que tu entorno local esté sincronizado y evitar conflictos de caché o dependencias.

---

## 🚀 1. Configuración Inicial (Get Started)

### Requisitos Previos
Antes de clonar el proyecto, asegúrate de tener instalado:
* **Node.js**: Versión LTS recomendada (v18 o superior).
* **pnpm**: Nuestro gestor de paquetes oficial (`npm install -g pnpm`).
* **Expo Go** (Opcional): Instalado en tu dispositivo móvil para pruebas rápidas, o un emulador configurado (Android Studio / Xcode).

### Pasos para Instalar
1. **Clona el repositorio:**
   ```bash
   git clone [https://github.com/BenjaLizama/IamFit-Frontend.git](https://github.com/BenjaLizama/IamFit-Frontend.git)
   cd IamFit-Frontend
Instala las dependencias:⚠️ REGLA DE ORO: Usa ÚNICAMENTE pnpm. No utilices npm install ni yarn para evitar romper el archivo de bloqueo (pnpm-lock.yaml).Bashpnpm install
Inicia el servidor de desarrollo:Bashpnpm start
Escanea el código QR con la app Expo Go o presiona a para Android / i para iOS si usas emulador.🛠️ 2. Solución de Problemas y Limpieza de Caché (Troubleshooting)Si la aplicación no compila, se queda pegada en el logo de Expo, no reconoce una librería recién instalada o arroja errores extraños tras un git pull, sigue estos pasos en orden.🔄 Nivel 1: El reinicio rápido (Caché de Expo)Cierra el servidor actual en tu terminal (Ctrl + C) y vuelve a levantarlo forzando la limpieza de caché:Bashpnpm start -c
¿Qué hace? El flag -c (clear) limpia la caché interna de Metro Bundler, resolviendo problemas de rutas, imágenes corruptas o cambios rápidos de código no reflejados.🔥 Nivel 2: Limpieza Profunda (Hard Reset)Si el nivel 1 no fue suficiente, ejecuta este bloque de comandos para limpiar el proyecto por completo y reconstruir el entorno desde cero:Bash# 1. Elimina la carpeta de caché local de Expo
rm -rf .expo

# 2. Borra los módulos de Node existentes
rm -rf node_modules

# 3. Reinstala todas las dependencias en limpio
pnpm install

# 4. Levanta el proyecto limpiando la caché de Metro
pnpm start -c
💡 Tip para usuarios de Windows (PowerShell): El comando rm -rf no funciona nativamente en PowerShell. Si usas esa terminal, ejecuta el equivalente:PowerShellRemove-Item -Recurse -Force .expo, node_modules
(O puedes usar Git Bash/WSL donde rm -rf funciona sin problemas).📋 3. Diccionario de Comandos del ProyectoUtiliza exclusivamente estos comandos durante el flujo de trabajo diario:AcciónComandoDescripciónInstalación inicialpnpm installDescarga las dependencias exactas del proyecto.Agregar dependenciapnpm add <paquete>Añade una librería normal al proyecto.Agregar devDependencypnpm add -D <paquete>Añade librerías de desarrollo (linters, tipos, etc).Iniciar Bundlerpnpm startCorre el entorno de desarrollo estándar.Iniciar con Limpiezapnpm start -cRecomendado tras cambiar de rama o hacer git pull.
