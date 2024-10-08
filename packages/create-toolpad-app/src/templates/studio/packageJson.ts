import { PackageJsonTemplate } from '../../types';

const packageJson: PackageJsonTemplate = (options) => ({
  name: options.name,
  version: '0.1.0',
  scripts: {
    dev: 'toolpad-studio dev',
    build: 'toolpad-studio build',
    start: 'toolpad-studio start',
  },
  dependencies: {
    '@toolpad/studio': 'latest',
  },
});

export default packageJson;
