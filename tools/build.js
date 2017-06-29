import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
import colors from 'colors';

/* eslint-disable no-console */
//Babel dev config for hot loading doesn't apply
process.env.NODE_ENV = 'production';

console.log('Generating minified bundle for production via Webpack.'.blue);

webpack(webpackConfig).run((err, stats) => {
  if(err) {
    console.log(err.bold.red);
  }

  const jsonStats = stats.toJson();

  if(jsonStats.hasErrors) {
    return jsonStats.errors.map(error => console.log(error.red));
  }
  if(jsonStats.hasWarnings) {
    console.log('Webpack generated the following warnings: '.bold.yellow);
    jsonStats.warnings.map(w => console.log(w.yellow));
  }
  console.log(`Webpack stats: ${stats}`);

  console.log('Your app has been compiled in production mode and written to /dist. Ready to roll!'.green);

  return 0;
});
