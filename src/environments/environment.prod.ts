export const environment = {
  production: true,
  hmr: false,
  version: require('../../package.json').version,

  ////////////// PROD /////////////////
  // API root for prod
  // api_root: 'https://whispers.usgs.gov/whispersservices/',
  // banner for prod
  // banner_content: 'Welcome to WHISPers 2.0. This website is a LIVE BETA site and contains REAL DATA.',
  // banner color for prod
  // banner_text_color: '#40b244',

  ////////////// TEST /////////////////
  // banner for test
  // banner_content: 'This website is under development and CONTAINS FICTICIOUS DATA. ',
  // banner color for test
  // banner_text_color: '#FFFF00'
  // API root for test
  api_root: 'https://whisperstest.wim.usgs.gov/whispersservices/',


};
