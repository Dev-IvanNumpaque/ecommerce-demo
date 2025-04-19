import { useParams } from 'react-router-dom';
import { Box, Container, Flex, Image, Text, Button, Heading, Stack, Badge } from '@chakra-ui/react';

export const ProductDetail = () => {
  const { id } = useParams();

  // Aquí se implementará la lógica para obtener los detalles del producto según el ID
  const mockProduct = {
    id: 1,
    name: 'Zapatillas Deportivas',
    price: 99.99,
    description: 'Zapatillas deportivas de alta calidad para running y entrenamiento.',
    brand: 'Adidas',
    category: 'Deportes',
    image: '/adidas-performance-4117-6511462-1-zoom.webp',
    stock: 10
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
        <Box flex={1}>
          <Image
            src={mockProduct.image}
            alt={mockProduct.name}
            objectFit="cover"
            width="100%"
            borderRadius="lg"
          />
        </Box>
        <Stack flex={1} spacing={4}>
          <Badge colorScheme="green" alignSelf="start">
            {mockProduct.category}
          </Badge>
          <Heading size="lg">{mockProduct.name}</Heading>
          <Text fontSize="2xl" fontWeight="bold" color="blue.500">
            ${mockProduct.price}
          </Text>
          <Text color="gray.600">{mockProduct.description}</Text>
          <Stack direction="row" alignItems="center">
            <Text fontWeight="bold">Marca:</Text>
            <Text>{mockProduct.brand}</Text>
          </Stack>
          <Stack direction="row" alignItems="center">
            <Text fontWeight="bold">Stock disponible:</Text>
            <Text>{mockProduct.stock} unidades</Text>
          </Stack>
          <Button colorScheme="blue" size="lg">
            Agregar al carrito
          </Button>
        </Stack>
      </Flex>
    </Container>
  );
};