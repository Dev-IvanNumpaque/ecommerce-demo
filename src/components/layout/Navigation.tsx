import { Box, Container, Flex, Button, useColorModeValue, Icon } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaHome, FaShoppingBag, FaShoppingCart, FaHeart } from 'react-icons/fa';

export const Navigation = () => {
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const navItems = [
    { name: 'Inicio', path: '/', icon: FaHome },
    { name: 'Productos', path: '/productos', icon: FaShoppingBag },
    { name: 'Carrito', path: '/carrito', icon: FaShoppingCart },
    { name: 'Favoritos', path: '/favoritos', icon: FaHeart },
  ];

  return (
    <Box
      as="nav"
      position="sticky"
      top={0}
      zIndex={1000}
      bg={bgColor}
      borderBottom="1px"
      borderColor={borderColor}
      boxShadow="sm"
      py={2}
    >
      <Container maxW="container.xl">
        <Flex justify="space-around" align="center">
          {navItems.map((item) => (
            <Button
              key={item.path}
              as={RouterLink}
              to={item.path}
              variant="ghost"
              display="flex"
              flexDirection={{ base: 'column', md: 'row' }}
              alignItems="center"
              gap={2}
              py={2}
              px={4}
              fontSize={{ base: 'sm', md: 'md' }}
              _hover={{
                bg: useColorModeValue('teal.50', 'teal.900'),
                color: useColorModeValue('teal.600', 'teal.200'),
                transform: 'translateY(-2px)',
              }}
              _active={{
                bg: useColorModeValue('teal.100', 'teal.800'),
                transform: 'translateY(0)',
              }}
              transition="all 0.2s"
            >
              <Icon as={item.icon} boxSize={{ base: 5, md: 6 }} />
              {item.name}
            </Button>
          ))}
        </Flex>
      </Container>
    </Box>
  );
};