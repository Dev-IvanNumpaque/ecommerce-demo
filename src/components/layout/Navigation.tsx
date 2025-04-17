import { Box, Button, Container, Flex, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

export const Navigation = () => {
  return (
    <Box as="nav" bg="gray.200" _dark={{ bg: 'gray.800' }} py={2}>
      <Container maxW="container.xl">
        <Flex gap={4}>
          <Link as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
            <Button variant="ghost">Inicio</Button>
          </Link>
          <Link as={RouterLink} to="/productos" _hover={{ textDecoration: 'none' }}>
            <Button variant="ghost">Productos</Button>
          </Link>
          <Link as={RouterLink} to="/carrito" _hover={{ textDecoration: 'none' }}>
            <Button variant="ghost">Carrito</Button>
          </Link>
        </Flex>
      </Container>
    </Box>
  );
};