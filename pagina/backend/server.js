const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos desde la carpeta padre (raíz del proyecto)
const staticRoot = path.join(__dirname, '..');

app.use(cors());
app.use(express.json());
app.use(express.static(staticRoot));

// Archivo de productos dentro de backend/data
const PRODUCTS_FILE = path.join(__dirname, 'data', 'products.json');
const BANNER_FILE = path.join(__dirname, '..', 'banner.json');

function readProducts() {
  try {
    const raw = fs.readFileSync(PRODUCTS_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error leyendo productos:', err);
    return [];
  }
}

function writeProducts(products) {
  try {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error escribiendo productos:', err);
    return false;
  }
}

app.get('/api/products', (req, res) => {
  const products = readProducts();
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const products = readProducts();
  const product = products.find(p => String(p.id) === String(req.params.id));
  if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json(product);
});

// Agregar un nuevo producto (se guarda en backend/data/products.json)
app.post('/api/products', (req, res) => {
  const products = readProducts();
  const { name, price, image, discount, category, weeklyOffer } = req.body || {};

  if (!name || price === undefined) {
    return res.status(400).json({ error: 'Los campos "name" y "price" son obligatorios' });
  }

  const nextId = products.reduce((max, p) => Math.max(max, p.id || 0), 0) + 1;
  const newProduct = {
    id: nextId,
    name: String(name),
    price: Number(price),
    image: image || '',
    discount: Number(discount) || 0,
    category: category || '',
    weeklyOffer: weeklyOffer === true || weeklyOffer === 'true' || weeklyOffer === 1 || weeklyOffer === '1' || false
  };

  products.push(newProduct);
  const ok = writeProducts(products);
  if (!ok) return res.status(500).json({ error: 'No se pudo guardar el producto' });

  res.status(201).json(newProduct);
});

// Actualizar un producto existente (PUT parcial)
app.put('/api/products/:id', (req, res) => {
  const products = readProducts();
  const id = String(req.params.id);
  const idx = products.findIndex(p => String(p.id) === id);
  if (idx === -1) return res.status(404).json({ error: 'Producto no encontrado' });

  const body = req.body || {};
  // Campos permitidos para actualizar
  const fields = ['name', 'price', 'image', 'discount', 'category', 'weeklyOffer'];
  fields.forEach(f => {
    if (body[f] !== undefined) {
      if (f === 'price' || f === 'discount') {
        products[idx][f] = Number(body[f]);
      } else if (f === 'weeklyOffer') {
        products[idx][f] = body[f] === true || body[f] === 'true' || body[f] === 1 || body[f] === '1';
      } else {
        products[idx][f] = body[f];
      }
    }
  });

  const ok = writeProducts(products);
  if (!ok) return res.status(500).json({ error: 'No se pudo guardar el producto' });

  res.json(products[idx]);
});

// Endpoint para actualizar banner.json (archivo en la raíz del proyecto)
app.put('/api/banner', (req, res) => {
  const body = req.body;
  if (!body || !Array.isArray(body)) {
    return res.status(400).json({ error: 'Se espera un array con entradas de banner' });
  }
  try {
    fs.writeFileSync(BANNER_FILE, JSON.stringify(body, null, 2), 'utf8');
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Error escribiendo banner.json:', err);
    return res.status(500).json({ error: 'No se pudo guardar banner.json' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor (backend) escuchando en http://localhost:${PORT}`);
});
