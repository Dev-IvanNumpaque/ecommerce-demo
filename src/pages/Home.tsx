import { Box, Container, Grid, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import { ProductCard } from '../components/products/ProductCard';

export const Home = () => {
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

  return (
    <Box>
      <Box
        as="section"
        h="70vh"
        position="relative"
        backgroundImage="url('/adidas-originals-9516-1367152-1-zoom.webp')"
        backgroundSize="cover"
        backgroundPosition="center"
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="blackAlpha.600"
        />
        <Container
          maxW="container.xl"
          h="full"
          position="relative"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          color="white"
        >
          <Heading
            fontSize={{ base: '4xl', md: '6xl' }}
            fontWeight="bold"
            mb={4}
          >
            AKJ - Tu Tienda de Moda
          </Heading>
          <Text
            fontSize={{ base: 'xl', md: '2xl' }}
            maxW="lg"
            mb={8}
          >
            Descubre nuestra exclusiva colección de calzado deportivo y casual en AKJ
          </Text>
          <Box
            as="button"
            px={8}
            py={4}
            bg="teal.500"
            rounded="lg"
            fontWeight="semibold"
            width="fit-content"
            _hover={{ bg: 'teal.600' }}
            transition="all 0.2s"
          >
            Ver Productos
          </Box>
        </Container>
      </Box>
      <Box bg={useColorModeValue('gray.50', 'gray.900')} py={12}>
        <Container maxW="container.xl">
          <Heading 
            mb={4} 
            fontSize={{ base: '3xl', md: '4xl' }}
          textAlign="center"
          color={useColorModeValue('gray.900', 'white')}
        >
          Las Mejores Marcas de Tenis
        </Heading>
        <Text 
          mb={12} 
          fontSize={{ base: 'lg', md: 'xl' }}
          textAlign="center"
          color={useColorModeValue('gray.600', 'gray.400')}
        >
          Encuentra tu par perfecto entre nuestra selección de tenis deportivos y casuales
        </Text>
      <Grid
        templateColumns={{
          base: '1fr',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)',
        }}
        gap={6}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Grid>
      </Container>
    </Box>
    </Box>
  );
};