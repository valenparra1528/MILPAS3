# Proyecto `pagina`

El backend fue movido a la carpeta `backend/` para separar frontend y backend.

Requisitos:
- Node.js 14+

Ejecución (PowerShell):

```powershell
# Ve a la carpeta del backend
cd "C:\Users\Valentina\Desktop\pagina\backend"

# Instala dependencias
npm install

# Arranca el backend
npm run start

# Abre en el navegador:
# http://localhost:3000/pagina.html

# O prueba la API desde otro PowerShell:
Invoke-RestMethod -Uri http://localhost:3000/api/products
```

Endpoints expuestos por el backend:
- `GET /api/products` - lista de productos
- `GET /api/products/:id` - detalle de un producto

Los assets estáticos (HTML, CSS, imágenes) se sirven desde la carpeta raíz del proyecto, así que el backend debe ejecutarse desde `backend/` y servirá `../pagina.html` y demás archivos.
