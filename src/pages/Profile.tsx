import { useState } from 'react';
import { Box, Button, Container, FormControl, FormLabel, Input, VStack, Text, useToast, Avatar, Divider } from '@chakra-ui/react';

export const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Usuario Demo',
    email: 'usuario@demo.com',
    phone: '',
    address: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Implement profile update logic
      toast({
        title: 'Perfil actualizado',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setIsEditing(false);
    } catch (error) {
      toast({
        title: 'Error al actualizar',
        description: 'Por favor, intenta nuevamente',
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
        <VStack>
          <Avatar size="2xl" name={formData.name} />
          <Text fontSize="2xl" fontWeight="bold">
            {formData.name}
          </Text>
          <Text color="gray.500">{formData.email}</Text>
        </VStack>

        <Divider />

        <Box as="form" onSubmit={handleSubmit}>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Nombre Completo</FormLabel>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                isReadOnly={!isEditing}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Correo Electrónico</FormLabel>
              <Input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                isReadOnly={!isEditing}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Teléfono</FormLabel>
              <Input
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                isReadOnly={!isEditing}
                placeholder="Agregar número de teléfono"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Dirección de Envío</FormLabel>
              <Input
                name="address"
                value={formData.address}
                onChange={handleChange}
                isReadOnly={!isEditing}
                placeholder="Agregar dirección de envío"
              />
            </FormControl>

            {isEditing ? (
              <Button
                type="submit"
                colorScheme="teal"
                width="full"
                isLoading={isLoading}
              >
                Guardar Cambios
              </Button>
            ) : (
              <Button
                colorScheme="teal"
                variant="outline"
                width="full"
                onClick={() => setIsEditing(true)}
              >
                Editar Perfil
              </Button>
            )}
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};