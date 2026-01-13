# Backend (carpeta `backend`)

Este backend sirve los assets estáticos de la carpeta padre (la raíz del proyecto) y expone la API de productos.

Instrucciones (PowerShell):

```powershell
cd "C:\Users\Valentina\Desktop\pagina\backend"

# Instalar dependencias
npm install

# Arrancar el backend
npm run start

# Probar la API desde otro PowerShell
Invoke-RestMethod -Uri http://localhost:3000/api/products

# Abrir la página en el navegador
# http://localhost:3000/pagina.html
```

## Cómo obtener un enlace para abrir tu página desde el móvil

Tienes dos opciones sencillas:

1) Verla por tu red local (mismo Wi‑Fi)

- Arranca el backend:

```powershell
cd "C:\Users\Valentina\Desktop\pagina\backend"
npm install
npm start
```

- Averigua tu IP local (Windows PowerShell):

```powershell
ipconfig
```

- Busca la dirección IPv4 de tu adaptador Wi‑Fi (por ejemplo 192.168.1.10) y en tu móvil abre:

http://192.168.137.234:3000/pagina.html

Nota: tu dispositivo y tu ordenador deben estar en la misma red Wi‑Fi y Windows Defender / Firewall debe permitir el puerto 3000.


