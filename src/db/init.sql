CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  brand VARCHAR(100) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  description TEXT,
  image VARCHAR(255),
  sizes INTEGER[] NOT NULL,
  colors TEXT[] NOT NULL,
  category VARCHAR(100) NOT NULL,
  style VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar datos de ejemplo
INSERT INTO products (name, brand, price, description, image, sizes, colors, category, style) VALUES
('Air Max 270', 'Nike', 149.99, 'Zapatillas deportivas con tecnología Air Max para máximo confort', '/public/adidas-originals-9516-1367152-1-zoom.webp', ARRAY[7, 7.5, 8, 8.5, 9, 9.5, 10], ARRAY['Negro/Blanco', 'Gris/Rojo', 'Azul/Blanco'], 'Running', 'Deportivo'),
('Superstar', 'Adidas', 89.99, 'Clásico diseño con puntera de concha y tres rayas distintivas', '/public/adidas-performance-4117-6511462-1-zoom.webp', ARRAY[6, 6.5, 7, 7.5, 8, 8.5, 9], ARRAY['Blanco/Negro', 'Negro/Blanco', 'Blanco/Dorado'], 'Casual', 'Clásico'),
('RS-X', 'Puma', 119.99, 'Diseño retro-futurista con tecnología Running System', '/public/adidas-performance-9190-8178862-1-zoom.webp', ARRAY[7, 8, 9, 10, 11], ARRAY['Blanco/Azul', 'Negro/Rojo', 'Gris/Verde'], 'Lifestyle', 'Retro');