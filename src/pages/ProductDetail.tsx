import { useParams } from 'react-router-dom';
import { Box, Container, Flex, Image, Text, Button, Heading, Stack, Badge } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useProductStore } from '../store/productStore';
import type { Product } from '../models/Product';

export const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const productStore = useProductStore();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      const productData = await productStore.getProductById(parseInt(id));
      setProduct(productData);
      setLoading(false);
    };
    fetchProduct();
  }, [id, productStore]);

  if (loading) {
    return (
      <Container maxW="container.xl" py={8}>
        <Text>Cargando...</Text>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container maxW="container.xl" py={8}>
        <Text>Producto no encontrado</Text>
      </Container>
    );
  }

  const productDetails: Product = product;

  return (
    <Container maxW="container.xl" py={8}>
      <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
        <Box flex={1}>
          <Image
            src={productDetails.image}
            alt={productDetails.name}
            objectFit="cover"
            width="100%"
            borderRadius="lg"
          />
        </Box>
        <Stack flex={1} spacing={4}>
          <Badge colorScheme="green" alignSelf="start">
            {productDetails.category}
          </Badge>
          <Heading size="lg">{productDetails.name}</Heading>
          <Text fontSize="2xl" fontWeight="bold" color="blue.500">
            ${productDetails.price}
          </Text>
          <Text color="gray.600">{productDetails.description}</Text>
          <Stack direction="row" alignItems="center">
            <Text fontWeight="bold">Marca:</Text>
            <Text>{productDetails.brand}</Text>
          </Stack>
          <Stack direction="row" alignItems="center">
            <Text fontWeight="bold">Estilo:</Text>
            <Text>{productDetails.style}</Text>
          </Stack>
          <Button colorScheme="blue" size="lg">
            Agregar al carrito
          </Button>
        </Stack>
      </Flex>
    </Container>
  );
};