import { Box, Container, Flex, Link, Stack, Text, IconButton } from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export const Footer = () => {
  const socialLinks = [
    { icon: FaFacebook, label: 'Facebook', url: 'https://facebook.com' },
    { icon: FaTwitter, label: 'Twitter', url: 'https://twitter.com' },
    { icon: FaInstagram, label: 'Instagram', url: 'https://instagram.com' },
  ];

  const quickLinks = [
    { label: 'Inicio', url: '/' },
    { label: 'Productos', url: '/products' },
    { label: 'Sobre Nosotros', url: '/about' },
    { label: 'Contacto', url: '/contact' },
  ];

  return (
    <Box as="footer" mt="auto" py={8}>
      <Container maxW="container.xl">
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align="center"
          gap={8}
        >
          <Stack spacing={4} align={{ base: 'center', md: 'flex-start' }}>
            <Text fontSize="lg" fontWeight="bold">
              AKJ Store
            </Text>
            <Text>
              Tu destino para la moda deportiva
            </Text>
          </Stack>

          <Stack spacing={4} align={{ base: 'center', md: 'flex-start' }}>
            <Text fontSize="lg" fontWeight="bold">
              Enlaces Rápidos
            </Text>
            {quickLinks.map((link) => (
              <Link key={link.url} href={link.url}>
                {link.label}
              </Link>
            ))}
          </Stack>

          <Stack spacing={4} align={{ base: 'center', md: 'flex-start' }}>
            <Text fontSize="lg" fontWeight="bold">
              Síguenos
            </Text>
            <Flex gap={4}>
              {socialLinks.map((social) => (
                <IconButton
                  key={social.label}
                  as={Link}
                  href={social.url}
                  aria-label={social.label}
                  icon={<social.icon />}
                  variant="ghost"
                  size="lg"
                  isRound
                  _hover={{
                    transform: 'translateY(-2px)',
                    color: 'teal.500',
                  }}
                />
              ))}
            </Flex>
          </Stack>
        </Flex>

        <Text
          mt={8}
          pt={8}
          borderTop="1px"
          borderColor="gray.200"
          textAlign="center"
          fontSize="sm"
        >
          © {new Date().getFullYear()} AKJ Store. Todos los derechos reservados.
        </Text>
      </Container>
    </Box>
  );
};