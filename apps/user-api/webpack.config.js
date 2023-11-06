// const { composePlugins, withNx } = require('@nx/webpack');

// // Nx plugins for webpack.
// module.exports = composePlugins(withNx(), (config) => {
//   // Update the webpack config as needed here.
//   // e.g. `config.plugins.push(new MyPlugin())`
//   return config;
// });

import { composePlugins, withNx } from '@nx/webpack'

// Nx plugins for webpack.
export default composePlugins(withNx(), (config) => {
  // Update the webpack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`
  return config
})
