import { Box, Button, Container, Flex, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface CarouselItem {
  id: number;
  title: string;
  description: string;
  price: number;
  discount: number;
  image: string;
}

const carouselItems: CarouselItem[] = [
  {
    id: 1,
    title: 'Adidas Originals',
    description: '¡Nueva colección! Estilo clásico reinventado',
    price: 129.99,
    discount: 20,
    image: '/adidas-originals-9516-1367152-1-zoom.webp'
  },
  {
    id: 2,
    title: 'Adidas Performance',
    description: 'Máximo rendimiento para tus entrenamientos',
    price: 159.99,
    discount: 15,
    image: '/adidas-performance-4117-6511462-1-zoom.webp'
  },
  {
    id: 3,
    title: 'Adidas Running',
    description: 'Tecnología de última generación para corredores',
    price: 189.99,
    discount: 25,
    image: '/adidas-performance-9190-8178862-1-zoom.webp'
  }
];

export const HeroCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.800', 'white');
  const buttonBgColor = useColorModeValue('teal.500', 'teal.200');
  const buttonHoverBgColor = useColorModeValue('teal.600', 'teal.300');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === carouselItems.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const currentItem = carouselItems[currentIndex];
  const discountedPrice = currentItem.price * (1 - currentItem.discount / 100);

  return (
    <Box bg={bgColor} py={8} position="relative" overflow="hidden">
      <Container maxW="container.xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <Flex
              direction={{ base: 'column', md: 'row' }}
              align="center"
              justify="space-between"
              gap={8}
            >
              <Box flex="1">
                <Heading
                  as="h1"
                  size="2xl"
                  color={textColor}
                  mb={4}
                >
                  {currentItem.title}
                </Heading>
                <Text fontSize="xl" color={textColor} mb={6}>
                  {currentItem.description}
                </Text>
                <Flex align="baseline" gap={4} mb={6}>
                  <Text
                    fontSize="3xl"
                    fontWeight="bold"
                    color="teal.500"
                  >
                    €{discountedPrice.toFixed(2)}
                  </Text>
                  <Text
                    fontSize="xl"
                    textDecoration="line-through"
                    color="gray.500"
                  >
                    €{currentItem.price.toFixed(2)}
                  </Text>
                  <Text
                    fontSize="xl"
                    color="red.500"
                    fontWeight="bold"
                  >
                    -{currentItem.discount}%
                  </Text>
                </Flex>
                <Button
                  size="lg"
                  bg={buttonBgColor}
                  color="white"
                  _hover={{ bg: buttonHoverBgColor }}
                  onClick={() => navigate('/productos')}
                >
                  Ver Productos
                </Button>
              </Box>
              <Box
                flex="1"
                position="relative"
                height={{ base: '300px', md: '400px' }}
              >
                <Box
                  as="img"
                  src={currentItem.image}
                  alt={currentItem.title}
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  maxH="100%"
                  objectFit="contain"
                />
              </Box>
            </Flex>
          </motion.div>
        </AnimatePresence>
        <Flex justify="center" mt={4} gap={2}>
          {carouselItems.map((_, index) => (
            <Box
              key={index}
              w="10px"
              h="10px"
              borderRadius="full"
              bg={index === currentIndex ? buttonBgColor : 'gray.300'}
              cursor="pointer"
              onClick={() => setCurrentIndex(index)}
              transition="background-color 0.2s"
            />
          ))}
        </Flex>
      </Container>
    </Box>
  );
};