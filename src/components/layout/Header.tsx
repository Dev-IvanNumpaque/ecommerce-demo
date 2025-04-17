import { Box, Container, Flex, Heading, IconButton, useColorMode } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

export const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box as="header" py={4} bg="gray.100" _dark={{ bg: 'gray.900' }}>
      <Container maxW="container.xl">
        <Flex justify="space-between" align="center">
          <Heading size="lg">Sneaker Store</Heading>
          <IconButton
            aria-label="Toggle color mode"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            variant="ghost"
          />
        </Flex>
      </Container>
    </Box>
  );
};