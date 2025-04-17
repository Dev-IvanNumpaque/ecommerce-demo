import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
};

export const theme = extendTheme({
  config,
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'light' ? 'gray.50' : 'gray.900',
        color: props.colorMode === 'light' ? 'gray.800' : 'whiteAlpha.900',
      },
    }),
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'teal',
        size: 'md',
      },
      variants: {
        solid: (props: any) => ({
          bg: props.colorMode === 'light' ? 'teal.500' : 'teal.200',
          color: props.colorMode === 'light' ? 'white' : 'gray.800',
          _hover: {
            bg: props.colorMode === 'light' ? 'teal.600' : 'teal.300',
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          },
          transition: 'all 0.2s',
        }),
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: 'bold',
        letterSpacing: '-0.02em',
      },
    },
    Text: {
      baseStyle: {
        lineHeight: 'tall',
      },
    },
    Container: {
      baseStyle: {
        px: { base: 4, md: 8 },
        py: { base: 4, md: 8 },
      },
    },
  },
});