export const environment = {
  production: true,
  hmr: false,
  version: require('../../package.json').version,
  ////////////// PROD /////////////////
  // API root for prod
  recaptcha_site_key: '',
  api_root: 'https://whispers.usgs.gov/api/',
};
