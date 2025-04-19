import { Box, Container, Flex, IconButton, useColorMode, useColorModeValue, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, VStack, Text, useBreakpointValue } from '@chakra-ui/react';
import { MoonIcon, SunIcon, HamburgerIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import { FaHome, FaShoppingBag, FaShoppingCart, FaHeart } from 'react-icons/fa';

export const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const isMobile = useBreakpointValue({ base: true, md: false });

  const navItems = [
    { name: 'Inicio', path: '/', icon: FaHome },
    { name: 'Productos', path: '/productos', icon: FaShoppingBag },
    { name: 'Carrito', path: '/cart', icon: FaShoppingCart },
    { name: 'Favoritos', path: '/favoritos', icon: FaHeart },
  ];

  return (
    <Box as="header" bg={bgColor} borderBottom="1px" borderColor={borderColor} boxShadow="sm" py={3}>
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
          <IconButton
            size="sm"
            aria-label="Toggle color mode"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
            _hover={{
              bg: useColorModeValue('teal.50', 'teal.900'),
              color: useColorModeValue('teal.600', 'teal.200')
            }}
          />
          
          <Box as="img" src="/Logo AKJ.PNG" alt="AKJ Logo" height="60px" objectFit="contain" />
          
          {isMobile ? (
            <IconButton
              aria-label="Open menu"
              icon={<HamburgerIcon />}
              onClick={onOpen}
              variant="ghost"
              size="sm"
              _hover={{
                bg: useColorModeValue('teal.50', 'teal.900'),
                color: useColorModeValue('teal.600', 'teal.200')
              }}
            />
          ) : (
            <Flex gap={4} align="center">
              {navItems.map((item) => (
                <IconButton
                  key={item.path}
                  as={RouterLink}
                  to={item.path}
                  variant="ghost"
                  size="sm"
                  aria-label={item.name}
                  icon={<Box as={item.icon} boxSize={4} />}
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
                />
              ))}
            </Flex>
          )}
        </Flex>
      </Container>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Menú</DrawerHeader>
          <DrawerBody>
            <VStack spacing={4} align="stretch" mt={4}>
              {navItems.map((item) => (
                <Box
                  key={item.path}
                  as={RouterLink}
                  to={item.path}
                  onClick={onClose}
                  p={2}
                  borderRadius="md"
                  _hover={{
                    bg: useColorModeValue('teal.50', 'teal.900'),
                    color: useColorModeValue('teal.600', 'teal.200'),
                  }}
                >
                  <Flex align="center" gap={3}>
                    <Box as={item.icon} />
                    <Text>{item.name}</Text>
                  </Flex>
                </Box>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};