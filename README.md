# MarketSoft API

Backend REST para la gestión de inventario y ventas de supermercado.  
Desarrollado con **Node.js**, **Express**, **PostgreSQL** y **Sequelize ORM**.

---

## Integrantes 

- Jhonathan Salazar Muñoz - Arquitecto de soluciones y desarrollador

## Requisitos

- Node.js v18+
- PostgreSQL 14+
- npm

---

## Instalación

```bash
git clone
cd supermarket
npm install
```

---

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
PORT=3000
DB_NAME=supermarket_db
DB_USER=postgres
DB_PASSWORD=tu_password
DB_HOST=localhost
DB_PORT=5432
```

---

## Ejecución

```bash
# Iniciar servidor
npm start
```

El servidor queda disponible en `http://localhost:3000`.

---

## Documentación interactiva (Swagger)

Una vez iniciado el servidor, accede a:

```
http://localhost:3000/api-docs
```

---

## Poblar la base de datos (seed)

```bash
curl -X POST http://localhost:3000/api/seed
```

---

## Endpoints

### Productos — `/api/products`

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/products` | Obtiene todos los productos |
| GET | `/api/products/:id` | Obtiene un producto por ID |
| POST | `/api/products` | Crea un nuevo producto |
| PUT | `/api/products/:id` | Actualiza un producto |
| DELETE | `/api/products/:id` | Elimina un producto |

**Crear producto**
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Arroz blanco",
    "description": "Arroz de grano largo",
    "price": 2.50,
    "stock": 100,
    "providerId": 1
  }'
```

**Obtener por ID**
```bash
curl http://localhost:3000/api/products/1
```

**Actualizar producto**
```bash
curl -X PUT http://localhost:3000/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{ "price": 3.00, "stock": 80 }'
```

**Eliminar producto**
```bash
curl -X DELETE http://localhost:3000/api/products/1
```

---

### Proveedores — `/api/providers`

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/providers` | Obtiene todos los proveedores |
| GET | `/api/providers/:id` | Obtiene un proveedor por ID |
| POST | `/api/providers` | Crea un nuevo proveedor |
| PUT | `/api/providers/:id` | Actualiza un proveedor |
| DELETE | `/api/providers/:id` | Elimina un proveedor |

**Crear proveedor**
```bash
curl -X POST http://localhost:3000/api/providers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Distribuidora Norte",
    "phone": "+56912345678",
    "email": "contacto@norte.cl",
    "city": "Santiago"
  }'
```

---

### Usuarios — `/api/users`

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/users` | Obtiene todos los usuarios |
| GET | `/api/users/:id` | Obtiene un usuario por ID |
| POST | `/api/users` | Crea un nuevo usuario |
| PUT | `/api/users/:id` | Actualiza un usuario |
| DELETE | `/api/users/:id` | Elimina un usuario |

**Crear usuario**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Pérez",
    "email": "juan@marketsoft.cl",
    "role": "vendedor"
  }'
```

---

### Ventas — `/api/sales`

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/api/sales` | Obtiene todas las ventas |
| GET | `/api/sales/:id` | Obtiene una venta con su detalle |
| POST | `/api/sales` | Registra una nueva venta |
| PUT | `/api/sales/:id` | Actualiza una venta |
| DELETE | `/api/sales/:id` | Elimina una venta |

**Registrar venta** (el `total` se calcula automáticamente)
```bash
curl -X POST http://localhost:3000/api/sales \
  -H "Content-Type: application/json" \
  -d '{
    "userId": 1,
    "items": [
      { "productId": 1, "quantity": 2 },
      { "productId": 3, "quantity": 1 }
    ]
  }'
```

**Obtener venta con detalle**
```bash
curl http://localhost:3000/api/sales/1
```

---

## Estructura del proyecto

```
supermarket/
├── server.js               # Punto de entrada
├── src/
│   ├── config/
│   │   └── db.js           # Conexión a PostgreSQL
│   ├── models/
│   │   ├── Product.js
│   │   ├── Provider.js
│   │   ├── User.js
│   │   ├── Sale.js
│   │   ├── SaleDetail.js
│   │   └── index.js        # Relaciones entre modelos
│   ├── controllers/
│   │   ├── ProductController.js
│   │   ├── ProviderController.js
│   │   ├── UserController.js
│   │   ├── SaleController.js
│   │   └── seedController.js
│   ├── routes/
│   │   ├── productRoutes.js
│   │   ├── providerRoutes.js
│   │   ├── userRoutes.js
│   │   ├── saleRoutes.js
│   │   └── seedRoutes.js
│   └── swagger/
│       └── swaggerConfig.js
└── .env
```
