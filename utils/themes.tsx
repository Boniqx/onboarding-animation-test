import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  components: {
    Button: {
      variants: {
        primary: {
          bg: 'purple.500',
          color: '#fff',
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
