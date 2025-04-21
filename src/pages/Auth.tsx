import { useState } from 'react';
import { Box, Container, Stack, Heading, FormControl, FormLabel, Input, Button, useToast, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

export const Auth = () => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Aquí se implementará la lógica de login
    try {
      // Simulación de login
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: 'Inicio de sesión exitoso',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Error al iniciar sesión',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Aquí se implementará la lógica de registro
    try {
      // Simulación de registro
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: 'Registro exitoso',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Error al registrarse',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW="container.sm" py={8}>
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>Iniciar Sesión</Tab>
          <Tab>Registrarse</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Box as="form" onSubmit={handleLogin}>
              <Stack spacing={4}>
                <Heading size="lg">Iniciar Sesión</Heading>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" placeholder="tu@email.com" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Contraseña</FormLabel>
                  <Input type="password" placeholder="********" />
                </FormControl>
                <Button
                  type="submit"
                  colorScheme="blue"
                  size="lg"
                  isLoading={isLoading}
                >
                  Iniciar Sesión
                </Button>
              </Stack>
            </Box>
          </TabPanel>
          <TabPanel>
            <Box as="form" onSubmit={handleRegister}>
              <Stack spacing={4}>
                <Heading size="lg">Crear Cuenta</Heading>
                <FormControl isRequired>
                  <FormLabel>Nombre</FormLabel>
                  <Input placeholder="Tu nombre" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" placeholder="tu@email.com" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Contraseña</FormLabel>
                  <Input type="password" placeholder="********" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Confirmar Contraseña</FormLabel>
                  <Input type="password" placeholder="********" />
                </FormControl>
                <Button
                  type="submit"
                  colorScheme="blue"
                  size="lg"
                  isLoading={isLoading}
                >
                  Registrarse
                </Button>
              </Stack>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};