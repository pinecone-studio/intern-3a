import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';
import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'yarn nx run referu-expo-hr-fe:serve',
        production: 'yarn nx run referu-expo-hr-fe:serve',
      },
      ciWebServerCommand: 'yarn nx run referu-expo-hr-fe:serve',
      ciBaseUrl: 'http://localhost:4200',
    }),
    baseUrl: 'http://localhost:8081',
  },
});
