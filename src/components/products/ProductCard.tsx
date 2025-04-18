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
      maxW={{ base: '100%', sm: '320px', md: '280px', lg: '320px' }}
      mx="auto"
    >
      <Image 
        src={product.image} 
        alt={product.name} 
        width="100%"
        height={{ base: '200px', md: '250px' }}
        objectFit="cover"
      />
      <VStack p={{ base: 4, md: 6 }} align="start" spacing={3} w="100%">
        <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight="bold" letterSpacing="tight">
          {product.brand} - {product.name}
        </Text>
        <Text color="gray.600" fontSize={{ base: 'sm', md: 'md' }} noOfLines={2}>{product.description}</Text>
        <Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.500">
          Estilo: {product.style} | Categoría: {product.category}
        </Text>
        <Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.500">
          Tallas disponibles: {product.sizes.join(", ")}
        </Text>
        <Text fontSize={{ base: 'xs', md: 'sm' }} color="gray.500">
          Colores: {product.colors.join(", ")}
        </Text>
        <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="extrabold" color="teal.500">
          ${product.price.toFixed(2)}
        </Text>
        <Button
          width="full"
          size={{ base: 'md', md: 'lg' }}
          borderRadius="md"
          leftIcon={<Icon as={FiShoppingCart} />}
        >
          Agregar al carrito
        </Button>
      </VStack>
    </Box>
  );
};