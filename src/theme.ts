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
  breakpoints: {
    sm: '320px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
    '2xl': '1536px',
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'teal',
        size: { base: 'sm', md: 'md' },
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
          width: { base: '100%', sm: 'auto' },
          fontSize: { base: 'sm', md: 'md' },
        }),
      },
    },
    Heading: {
      baseStyle: {
        fontWeight: 'bold',
        letterSpacing: '-0.02em',
        fontSize: { base: 'xl', sm: '2xl', md: '3xl', lg: '4xl' },
        textAlign: { base: 'center', md: 'left' },
      },
    },
    Text: {
      baseStyle: {
        lineHeight: 'tall',
        fontSize: { base: 'sm', md: 'md' },
        textAlign: { base: 'center', md: 'left' },
      },
    },
    Container: {
      baseStyle: {
        px: { base: 4, md: 6, lg: 8 },
        py: { base: 4, md: 6, lg: 8 },
        maxW: { base: '100%', md: '90%', lg: '1200px' },
        borderWidth: '3px',
        borderStyle: 'solid',
        borderColor: 'black',
      },
    },
  },
});