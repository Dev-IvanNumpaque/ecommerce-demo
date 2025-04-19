import { Box, Container, Stack, Heading, FormControl, FormLabel, Input, Button, Divider, Text, useToast } from '@chakra-ui/react';

export const Checkout = () => {
  const toast = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí se implementará la lógica de procesamiento de pago
    toast({
      title: 'Pedido realizado',
      description: 'Tu pedido ha sido procesado exitosamente',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.md" py={8}>
      <Stack spacing={8}>
        <Heading>Finalizar Compra</Heading>
        
        <Box as="form" onSubmit={handleSubmit}>
          <Stack spacing={6}>
            <Heading size="md">Información de Envío</Heading>
            <FormControl isRequired>
              <FormLabel>Nombre completo</FormLabel>
              <Input placeholder="Ingresa tu nombre completo" />
            </FormControl>
            
            <FormControl isRequired>
              <FormLabel>Dirección</FormLabel>
              <Input placeholder="Ingresa tu dirección" />
            </FormControl>
            
            <FormControl isRequired>
              <FormLabel>Ciudad</FormLabel>
              <Input placeholder="Ingresa tu ciudad" />
            </FormControl>
            
            <FormControl isRequired>
              <FormLabel>Código postal</FormLabel>
              <Input placeholder="Ingresa tu código postal" />
            </FormControl>

            <Divider />
            
            <Heading size="md">Información de Pago</Heading>
            <FormControl isRequired>
              <FormLabel>Número de tarjeta</FormLabel>
              <Input placeholder="1234 5678 9012 3456" />
            </FormControl>
            
            <Stack direction="row" spacing={4}>
              <FormControl isRequired>
                <FormLabel>Fecha de expiración</FormLabel>
                <Input placeholder="MM/AA" />
              </FormControl>
              
              <FormControl isRequired>
                <FormLabel>CVV</FormLabel>
                <Input placeholder="123" type="password" maxLength={3} />
              </FormControl>
            </Stack>

            <Divider />
            
            <Box>
              <Text fontSize="lg" fontWeight="bold" mb={2}>Resumen del pedido</Text>
              <Stack spacing={2}>
                <Text>Subtotal: $99.99</Text>
                <Text>Envío: $10.00</Text>
                <Text fontWeight="bold">Total: $109.99</Text>
              </Stack>
            </Box>

            <Button type="submit" colorScheme="blue" size="lg">
              Confirmar Pedido
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};