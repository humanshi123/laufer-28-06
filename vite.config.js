// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command, mode }) => {
  if (mode === 'production') {
    return {
      // Production-specific configuration
      build: {
        outDir: 'dist',
        // other build options
      },
    };
  } else {
    return {
      plugins: [react()],
      server: {
        // Development server options
        port: 5173, // Or any port you prefer
      },
    };
  }
});
