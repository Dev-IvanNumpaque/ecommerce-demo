import { useState } from 'react';
import { Box, Button, Container, FormControl, FormLabel, Input, VStack, Text, useToast, InputGroup, InputRightElement } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const login = useAuthStore(state => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      toast({
        title: 'Inicio de sesión exitoso',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/');
    } catch (error: any) {
      toast({
        title: 'Error al iniciar sesión',
        description: error.message || 'Por favor, verifica tus credenciales',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW="container.sm" py={8}>
      <VStack spacing={8} align="stretch">
        <Text fontSize="2xl" fontWeight="bold" textAlign="center">
          Iniciar Sesión
        </Text>

        <Box as="form" onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Correo Electrónico</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Contraseña</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="********"
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Button
              type="submit"
              colorScheme="teal"
              width="full"
              isLoading={isLoading}
            >
              Iniciar Sesión
            </Button>

            <Text textAlign="center">
              ¿No tienes una cuenta?{' '}
              <Link to="/register" style={{ color: 'teal' }}>
                Regístrate aquí
              </Link>
            </Text>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};