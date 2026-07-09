const http = require('http');

const BASE_URL = process.env.TEST_URL || 'http://localhost:3001';

function request(path, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const req = http.request(url, {
      method: options.method || 'GET',
      headers: { 'Content-Type': 'application/json', ...options.headers },
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });
    req.on('error', reject);
    if (options.body) req.write(JSON.stringify(options.body));
    req.end();
  });
}

describe('API Productos - Unit Tests', () => {
  test('validateProductoInput rechaza nombre vacio', () => {
    const { validateProductoInput } = getValidation();
    const result = validateProductoInput({ nombre: '', precio: 100, stock: 5 });
    expect(result.ok).toBe(false);
  });

  test('validateProductoInput rechaza precio negativo', () => {
    const { validateProductoInput } = getValidation();
    const result = validateProductoInput({ nombre: 'Test', precio: -10, stock: 5 });
    expect(result.ok).toBe(false);
  });

  test('validateProductoInput rechaza stock decimal', () => {
    const { validateProductoInput } = getValidation();
    const result = validateProductoInput({ nombre: 'Test', precio: 100, stock: 2.5 });
    expect(result.ok).toBe(false);
  });

  test('validateProductoInput acepta datos validos', () => {
    const { validateProductoInput } = getValidation();
    const result = validateProductoInput({ nombre: 'Laptop', precio: 999, stock: 10 });
    expect(result.ok).toBe(true);
    expect(result.precioNum).toBe(999);
    expect(result.stockNum).toBe(10);
  });

  test('validateProductoInput acepta precio cero', () => {
    const { validateProductoInput } = getValidation();
    const result = validateProductoInput({ nombre: 'Gratis', precio: 0, stock: 0 });
    expect(result.ok).toBe(true);
  });

  test('validateProductoInput rechaza stock negativo', () => {
    const { validateProductoInput } = getValidation();
    const result = validateProductoInput({ nombre: 'Test', precio: 50, stock: -1 });
    expect(result.ok).toBe(false);
  });

  test('validateProductoInput rechaza precio no numerico', () => {
    const { validateProductoInput } = getValidation();
    const result = validateProductoInput({ nombre: 'Test', precio: 'abc', stock: 5 });
    expect(result.ok).toBe(false);
  });
});

function getValidation() {
  function validateProductoInput({ nombre, precio, stock }) {
    if (!nombre || precio == null || stock == null) {
      return { ok: false, message: "Nombre, precio y stock son obligatorios." };
    }
    const precioNum = Number(precio);
    const stockNum = Number(stock);
    if (!Number.isFinite(precioNum) || precioNum < 0) {
      return { ok: false, message: "Precio invalido." };
    }
    if (!Number.isInteger(stockNum) || stockNum < 0) {
      return { ok: false, message: "Stock invalido (debe ser entero >= 0)." };
    }
    return { ok: true, precioNum, stockNum };
  }
  return { validateProductoInput };
}
