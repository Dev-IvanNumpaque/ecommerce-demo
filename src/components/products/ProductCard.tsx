import { Box, Button, Icon, Image, Text, VStack } from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';

type Product = {
  id: number;
  name: string;
  brand: string;
  price: number;
  description: string;
  image: string;
  sizes: number[];
  colors: string[];
  category: string;
  style: string;
};

type ProductCardProps = {
  product: Product;
};

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="xl"
      overflow="hidden"
      bg="white"
      _hover={{ 
        transform: 'translateY(-4px)',
        shadow: 'xl',
      }}
      transition="all 0.3s ease-in-out"
    >
      <Image src={product.image} alt={product.name} />
      <VStack p={6} align="start" spacing={3}>
        <Text fontSize="xl" fontWeight="bold" letterSpacing="tight">
          {product.brand} - {product.name}
        </Text>
        <Text color="gray.600" fontSize="md">{product.description}</Text>
        <Text fontSize="sm" color="gray.500">
          Estilo: {product.style} | Categoría: {product.category}
        </Text>
        <Text fontSize="sm" color="gray.500">
          Tallas disponibles: {product.sizes.join(", ")}
        </Text>
        <Text fontSize="sm" color="gray.500">
          Colores: {product.colors.join(", ")}
        </Text>
        <Text fontSize="2xl" fontWeight="extrabold" color="teal.500">
          ${product.price.toFixed(2)}
        </Text>
        <Button
          width="full"
          size="lg"
          borderRadius="md"
          leftIcon={<Icon as={FiShoppingCart} />}
        >
          Agregar al carrito
        </Button>
      </VStack>
    </Box>
  );
};