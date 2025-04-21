import { Box, Button, Container, Flex, Menu, MenuButton, MenuItem, MenuList, Text, useColorMode } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaUser, FaSignInAlt, FaUserPlus } from 'react-icons/fa';

export const Navbar = () => {
  const { colorMode } = useColorMode();
  const isAuthenticated = false; // TODO: Implement authentication state

  return (
    <Box
      as="nav"
      bg={colorMode === 'light' ? 'white' : 'gray.800'}
      py={4}
      shadow="sm"
      position="sticky"
      top={0}
      zIndex="sticky"
    >
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
          <Link to="/">
            <Text fontSize="xl" fontWeight="bold">
              AKJ Store
            </Text>
          </Link>

          <Flex gap={4} align="center">
            <Link to="/products">
              <Button variant="ghost">Productos</Button>
            </Link>
            
            <Menu>
              <MenuButton
                as={Button}
                variant="ghost"
                leftIcon={<FaUser />}
                _hover={{ bg: 'teal.500', color: 'white' }}
              >
                {isAuthenticated ? 'Mi Cuenta' : 'Usuario'}
              </MenuButton>
              <MenuList>
                {isAuthenticated ? (
                  <>
                    <Link to="/profile">
                      <MenuItem icon={<FaUser />}>Mi Perfil</MenuItem>
                    </Link>
                    <MenuItem onClick={() => {/* TODO: Implement logout */}}>
                      Cerrar Sesión
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <MenuItem icon={<FaSignInAlt />}>Iniciar Sesión</MenuItem>
                    </Link>
                    <Link to="/register">
                      <MenuItem icon={<FaUserPlus />}>Crear Cuenta</MenuItem>
                    </Link>
                  </>
                )}
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
};