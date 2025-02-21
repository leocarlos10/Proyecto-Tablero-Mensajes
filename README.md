# 📌 Tablero de Mensajes

## 📖 Descripción

Tablero de Mensajes es una aplicación web donde los usuarios pueden comentar, editar y eliminar mensajes en un tablero compartido. Todos los usuarios pueden visualizar los comentarios en tiempo real, proporcionando una plataforma interactiva para la comunicación.

## 🛠 Tecnologías Utilizadas

- **Frontend:** React ⚛️
- **Backend:** Spring Boot 🏗️
- **Base de Datos:** MySQL 🗄️

## ✅ Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- **Java 17+** (para ejecutar Spring Boot)
- **Maven** (para manejar dependencias en Spring Boot)
- **Node.js y npm** (para ejecutar el frontend con React)
- **XAMPP** (o cualquier servidor MySQL)

## 🚀 Instalación y Ejecución

### 1️⃣ Clonar el Repositorio

```bash
    git clone <URL_DEL_REPOSITORIO>
    cd TableroMensajes
```

### 2️⃣ Configurar la Base de Datos

1. Iniciar XAMPP o el servicio de MySQL.
2. Acceder a **phpMyAdmin** y crear la base de datos.
3. Importar el archivo SQL que se encuentra en `TablaMensajesBackend`.

### 3️⃣ Ejecutar el Backend (Spring Boot)

1. Asegúrate de estar dentro de la carpeta del backend.

```bash
    cd TablaMensajesBackend
```

2. Ejecutar el backend con Maven:

```bash
    mvn spring-boot:run
```

### 4️⃣ Ejecutar el Frontend (React)

1. Moverse a la carpeta del frontend:

```bash
    cd ..
```

2. Instalar dependencias:

```bash
    npm install
```

3. Ejecutar el servidor de desarrollo:

```bash
    npm run dev
```

4. Acceder a la aplicación desde el enlace proporcionado en la terminal.

## 📂 Estructura del Proyecto

```
TableroMensajes/
│── node_modules/           # Dependencias de Node.js
│── public/                 # Archivos públicos
│── src/                    # Código fuente del frontend
│   │── assets/             # Recursos estáticos
│   │── Components/         # Componentes reutilizables
│   │── Context/            # Manejo de contexto
│   │── css/                # Archivos de estilos
│   │── pages/              # Páginas de la aplicación
│   │── App.css
│   │── App.jsx
│   │── index.css
│   │── main.jsx
│── TablaMensajesBackend/   # Backend con Spring Boot
│── .gitignore
│── eslint.config.js
│── index.html
│── package-lock.json
│── package.json
│── README.md
│── vite.config.js
```

## 📩 Contacto

Instagram https\://www\.instagram.com/leocarlos\_10/ . 🚀
