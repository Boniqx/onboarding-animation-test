import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  components: {
    Button: {
      variants: {
        secondary: {
          bg: 'gray.100',
        },
        primary: {
          bg: 'purple.500',
          color: '#fff',
        },
        primaryAction: {
          bg: 'purple.500',
          color: '#fff',
          padding: '10px 20.5px',
        },
      },
    },
    Container: {
      variants: {
        floating: {
          bg: '#fff',
          w: 'xl',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '30px 0px',
          margin: 'auto',
          borderRadius: '8px',
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.06)',
        },
      },
    },
  },
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: '#F7FAFC',
      },
    },
  },
});

export default theme;
