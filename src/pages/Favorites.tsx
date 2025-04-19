import { Box, Container, SimpleGrid, Image, Text, IconButton, Heading, Stack } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

export const Favorites = () => {
  // Aquí se implementará la lógica para obtener y gestionar los favoritos
  const mockFavorites = [
    {
      id: 1,
      name: 'Zapatillas Deportivas',
      price: 99.99,
      image: '/adidas-performance-4117-6511462-1-zoom.webp'
    },
    {
      id: 2,
      name: 'Zapatillas Running',
      price: 89.99,
      image: '/adidas-performance-9190-8178862-1-zoom.webp'
    }
  ];

  const handleRemoveFavorite = (id: number) => {
    // Aquí se implementará la lógica para eliminar de favoritos
    console.log('Removing favorite:', id);
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Stack spacing={6}>
        <Heading>Mis Favoritos</Heading>
        
        {mockFavorites.length === 0 ? (
          <Text>No tienes productos favoritos guardados.</Text>
        ) : (
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6}>
            {mockFavorites.map((product) => (
              <Box
                key={product.id}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                position="relative"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width="100%"
                  height="200px"
                  objectFit="cover"
                />
                <IconButton
                  aria-label="Remove from favorites"
                  icon={<DeleteIcon />}
                  position="absolute"
                  top={2}
                  right={2}
                  colorScheme="red"
                  onClick={() => handleRemoveFavorite(product.id)}
                />
                <Box p={4}>
                  <Text fontWeight="semibold" fontSize="lg" mb={2}>
                    {product.name}
                  </Text>
                  <Text color="blue.500" fontSize="xl">
                    ${product.price}
                  </Text>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        )}
      </Stack>
    </Container>
  );
};