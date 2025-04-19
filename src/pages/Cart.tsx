import { Box, Button, Flex, Heading, Table, Tbody, Td, Text, Th, Thead, Tr, useToast } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
};

export const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'Adidas Original',
      price: 99.99,
      quantity: 1,
      image: '/adidas-originals-9516-1367152-1-zoom.webp'
    },
    {
      id: 2,
      name: 'Adidas Performance',
      price: 129.99,
      quantity: 2,
      image: '/adidas-performance-4117-6511462-1-zoom.webp'
    }
  ]);

  const toast = useToast();

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) {
      toast({
        title: 'Error',
        description: 'La cantidad no puede ser menor a 1',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
    toast({
      title: 'Producto eliminado',
      description: 'El producto ha sido eliminado del carrito',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Box p={4}>
      <Heading mb={6}>Carrito de Compras</Heading>
      {cartItems.length === 0 ? (
        <Text>Tu carrito está vacío</Text>
      ) : (
        <>
          <Box overflowX="auto">
            <Table variant="simple" border="1px" borderColor="gray.200">
              <Thead>
                <Tr>
                  <Th>Producto</Th>
                  <Th>Precio</Th>
                  <Th>Cantidad</Th>
                  <Th>Subtotal</Th>
                  <Th>Acciones</Th>
                </Tr>
              </Thead>
              <Tbody>
                {cartItems.map(item => (
                  <Tr key={item.id}>
                    <Td>
                      <Flex align="center">
                        <Box
                          w="50px"
                          h="50px"
                          mr={3}
                          backgroundImage={`url(${item.image})`}
                          backgroundSize="cover"
                          backgroundPosition="center"
                        />
                        {item.name}
                      </Flex>
                    </Td>
                    <Td>${item.price.toFixed(2)}</Td>
                    <Td>
                      <Flex align="center">
                        <Button
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </Button>
                        <Text mx={2}>{item.quantity}</Text>
                        <Button
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </Button>
                      </Flex>
                    </Td>
                    <Td>${(item.price * item.quantity).toFixed(2)}</Td>
                    <Td>
                      <Button
                        colorScheme="red"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                      >
                        Eliminar
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
          <Flex justify="flex-end" mt={6}>
            <Box textAlign="right">
              <Text fontSize="xl" fontWeight="bold">
                Total: ${total.toFixed(2)}
              </Text>
              <Button colorScheme="blue" mt={4}>
                Proceder al pago
              </Button>
            </Box>
          </Flex>
        </>
      )}
    </Box>
  );
};