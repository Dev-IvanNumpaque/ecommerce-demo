import { Box, Flex } from '@chakra-ui/react';
import { Header } from './Header';
import { Footer } from './Footer';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Flex minH="100vh" direction="column">
      <Header />
      <Box as="main" py={8} flex="1">
        {children}
      </Box>
      <Footer />
    </Flex>
  );
};