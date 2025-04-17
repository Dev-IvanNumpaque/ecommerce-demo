import { Box } from '@chakra-ui/react';
import { Header } from './Header';
import { Navigation } from './Navigation';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Box minH="100vh">
      <Header />
      <Navigation />
      <Box as="main" py={8}>
        {children}
      </Box>
    </Box>
  );
};