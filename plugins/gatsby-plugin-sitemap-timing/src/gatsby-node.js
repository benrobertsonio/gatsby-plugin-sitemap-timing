const { onPostBuild: sitemapOnPostBuild } = require('gatsby-plugin-sitemap/gatsby-node');
const internalSitemapFunctions = require('gatsby-plugin-sitemap/internals');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
const isBetween = require('dayjs/plugin/isBetween');
dayjs.extend(isBetween);
dayjs.extend(utc);
dayjs.extend(timezone);


let fullBuild = true;

internalSitemapFunctions.filterPages =
  internalSitemapFunctions.defaultFilterPages;

exports.onPostBuild = async (args, pluginOptions) => {
  const { gatsbyPlugins = [] } = pluginOptions;
  const pluginMap = new Map([
    ['gatsby-plugin-sitemap', sitemapOnPostBuild]
  ]);


  // Set after hours time to be between 8 PM and four AM EST.
  // If the current time is between 8 PM EST and 11:59 PM EST,
  // OR the current time is between midnight and 4:00 AM EST,
  // Then it is after hours.
  const afterStart = dayjs().tz('America/New_York').hour(20).minute(0);
  const afterEnd = dayjs().tz('America/New_York').hour(4).minute(0);
  const IS_AFTER_HOURS = dayjs().tz('America/New_York').isBetween(afterStart, dayjs().tz('America/New_York').hour(23).minute(59))
    || dayjs().tz('America/New_York').isBetween(dayjs().tz('America/New_York').hour(0).minute(0), afterEnd);


  // We only want to generate a sitemap when:
  // - we are not running in preview mode AND
  // - it is a full build OR
  // - it is after hours
  if (process.env.GATSBY_IS_PREVIEW !== 'true' && (fullBuild || IS_AFTER_HOURS)) {
    for (const plugin of gatsbyPlugins) {
      if (pluginMap.has(plugin.name)) {

        const postBuild = pluginMap.get(plugin.name);

        // Time the sitemap generation step.
        const timer = args.reporter.activityTimer(
          `Running ${plugin.name} onPostBuild`
        );
        timer.start();

        // Generate the sitemap.
        try {
          let options = plugin.options;
          if (plugin.name === 'gatsby-plugin-sitemap') {
            options = {
              ...internalSitemapFunctions,
              ...plugin.options
            };
          }
          await postBuild(args, options);
        }
        catch (e) {
          timer.panic(e);
        }
        // End the timer.
        timer.end();
      }
    }
    fullBuild = false;
  }
};