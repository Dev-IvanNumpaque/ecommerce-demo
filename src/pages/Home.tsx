import { Box, Container, Grid, Heading, Text, useColorModeValue, Spinner, Center } from '@chakra-ui/react';
import { ProductCard } from '../components/products/ProductCard';
import { HeroCarousel } from '../components/layout/HeroCarousel';
import { useProductStore } from '../store/productStore';
import { useEffect } from 'react';

export const Home = () => {
  const { products, loading, error, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center h="100vh">
        <Text color="red.500">{error}</Text>
      </Center>
    );
  }

  return (
    <Box>
      <HeroCarousel />
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