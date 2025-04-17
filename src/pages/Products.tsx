import {
  Box,
  Container,
  Grid,
  Heading,
  Text,
  useColorModeValue,
  Stack,
  Select,
  Input,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Flex,
  Badge,
  IconButton,
} from '@chakra-ui/react';
import { useState } from 'react';
import { ProductCard } from '../components/products/ProductCard';
import { FaThList, FaThLarge } from 'react-icons/fa';

export const Products = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState([0, 200]);

  // Simulación de datos de productos
  const products = [
    {
      id: 1,
      name: 'Air Max 270',
      brand: 'Nike',
      price: 149.99,
      description: 'Zapatillas deportivas con tecnología Air Max para máximo confort',
      image: './public/adidas-originals-9516-1367152-1-zoom.webp',
      sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10],
      colors: ['Negro/Blanco', 'Gris/Rojo', 'Azul/Blanco'],
      category: 'Running',
      style: 'Deportivo',
    },
    {
      id: 2,
      name: 'Superstar',
      brand: 'Adidas',
      price: 89.99,
      description: 'Clásico diseño con puntera de concha y tres rayas distintivas',
      image: './public/adidas-performance-4117-6511462-1-zoom.webp',
      sizes: [6, 6.5, 7, 7.5, 8, 8.5, 9],
      colors: ['Blanco/Negro', 'Negro/Blanco', 'Blanco/Dorado'],
      category: 'Casual',
      style: 'Clásico',
    },
    {
      id: 3,
      name: 'RS-X',
      brand: 'Puma',
      price: 119.99,
      description: 'Diseño retro-futurista con tecnología Running System',
      image: './public/adidas-performance-9190-8178862-1-zoom.webp',
      sizes: [7, 8, 9, 10, 11],
      colors: ['Blanco/Azul', 'Negro/Rojo', 'Gris/Verde'],
      category: 'Lifestyle',
      style: 'Retro',
    },
  ];

  const brands = ['Todas', 'Nike', 'Adidas', 'Puma'];
  const categories = ['Todas', 'Running', 'Casual', 'Lifestyle'];

  return (
    <Box bg={useColorModeValue('gray.50', 'gray.900')} minH="100vh" py={8}>
      <Container maxW="container.xl">
        <Stack spacing={8}>
          <Box>
            <Heading
              mb={4}
              fontSize={{ base: '2xl', md: '3xl' }}
              color={useColorModeValue('gray.900', 'white')}
            >
              Catálogo de Productos
            </Heading>
            <Text
              color={useColorModeValue('gray.600', 'gray.400')}
              fontSize={{ base: 'md', md: 'lg' }}
            >
              Explora nuestra colección de tenis deportivos y casuales
            </Text>
          </Box>

          <Stack
            direction={{ base: 'column', md: 'row' }}
            spacing={4}
            align={{ base: 'stretch', md: 'center' }}
            justify="space-between"
          >
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4} flex={1}>
              <Select placeholder="Marca" variant="filled">
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </Select>
              <Select placeholder="Categoría" variant="filled">
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Select>
              <Input placeholder="Buscar productos..." variant="filled" />
            </Stack>
            <Stack direction="row" spacing={2}>
              <IconButton
                aria-label="Vista en cuadrícula"
                icon={<FaThLarge />}
                onClick={() => setViewMode('grid')}
                colorScheme={viewMode === 'grid' ? 'teal' : 'gray'}
              />
              <IconButton
                aria-label="Vista en lista"
                icon={<FaThList />}
                onClick={() => setViewMode('list')}
                colorScheme={viewMode === 'list' ? 'teal' : 'gray'}
              />
            </Stack>
          </Stack>

          <Box>
            <Text mb={2}>Rango de Precio: ${priceRange[0]} - ${priceRange[1]}</Text>
            <RangeSlider
              aria-label={['min', 'max']}
              defaultValue={[0, 200]}
              min={0}
              max={200}
              onChange={setPriceRange}
            >
              <RangeSliderTrack>
                <RangeSliderFilledTrack />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
              <RangeSliderThumb index={1} />
            </RangeSlider>
          </Box>

          <Grid
            templateColumns={{
              base: '1fr',
              md: viewMode === 'grid' ? 'repeat(2, 1fr)' : '1fr',
              lg: viewMode === 'grid' ? 'repeat(3, 1fr)' : '1fr',
            }}
            gap={6}
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Grid>
        </Stack>
      </Container>
    </Box>
  );
};