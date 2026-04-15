# 🔐 JWT Authentication System

Aplicación fullstack para la gestión de usuarios con autenticación basada en JSON Web Tokens (JWT), control de acceso por roles y arquitectura REST.

---

## 📌 Descripción

Este proyecto implementa un sistema de autenticación y gestión de usuarios que permite:

- Registro de usuarios
- Inicio de sesión con JWT
- Control de acceso por roles (admin, trainer, user)
- CRUD de usuarios
- Protección de rutas en frontend y backend

---

## 🛠️ Tecnologías

### Backend

- Node.js
- Express
- MongoDB (Mongoose)
- JSON Web Token (JWT)
- Bcrypt

### Frontend

- Angular (Standalone Components)
- Bootstrap

---

## 🚀 Funcionalidades

- ✔ Registro de usuarios
- ✔ Login con generación de token
- ✔ Encriptación de contraseñas
- ✔ CRUD de usuarios
- ✔ Middleware de autenticación (JWT)
- ✔ Control de acceso por roles
- ✔ Interceptor HTTP en Angular
- ✔ Auth Guard para protección de rutas
- ✔ Logout de usuario

---

## 🔐 Control de Acceso

| Rol     | Permisos               |
|---------|------------------------|
| Admin   | Ver todos los usuarios |
| Trainer | Ver su propio usuario  |
| User    | Ver su propio usuario  |

El endpoint `/users` responde dinámicamente según el rol autenticado.

---

## 📂 Estructura del proyecto

bit-jwt-technical-test/
│
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── models/
│ │ ├── routes/
│ │ ├── middleware/
│ │ └── config/
│ └── package.json
│
├── frontend/
│ └── src/
│ ├── app/
│ │ ├── components/
│ │ ├── services/
│ │ └── core/
│
└── README.md

---

## ⚙️ Instalación

### 1. Clonar repositorio

```bash
git clone https://github.com/crberlin/bit-jwt-technical-test.git
cd bit-jwt-technical-test
```

---

### 2. Backend

```bash
cd backend
npm install
npm run dev
```

---

### 3. Frontend

```bash
cd frontend
npm install
ng serve
```

---

## 🔐 Variables de entorno

Crear archivo `.env` en `/backend`:

```.env
PORT=3000
MONGO_URI=your_mongo_connection
JWT_SECRET=your_secret_key
```

---

## 🔑 Endpoints principales

| Método | Endpoint        | Descripción                  |
|--------|-----------------|--------------------------    |
| POST   | /auth/register  | Registro de usuario          |
| POST   | /auth/login     | Login y generación JWT       |
| GET    | /users          | Obtener usuarios (según rol) |
| GET    | /users/:id      | Obtener usuario por ID       |
| PUT    | /users/:id      | Actualizar usuario           |
| DELETE | /users/:id      | Eliminar usuario             |

---

## 🔒 Seguridad

- Contraseñas hasheadas con bcrypt
- Autenticación con JWT
- Middleware de validación de token
- Control de acceso por roles

---

## 📌 Notas

Proyecto desarrollado como prueba técnica para demostrar habilidades en desarrollo fullstack, autenticación y buenas prácticas de arquitectura.

---

## 👨‍💻 Autor

Carlos Roberto  
CRSoftware Studio
