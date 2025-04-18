import { Box } from '@chakra-ui/react';
import { Header } from './Header';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Box minH="100vh">
      <Header />
      <Box as="main" py={8}>
        {children}
      </Box>
    </Box>
  );
};