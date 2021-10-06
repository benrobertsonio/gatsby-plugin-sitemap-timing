# gatsby-plugin-sitemap-timing

This is a proof of concept plugin for limiting when certain plugins run to certain hours of the day.

In the example here, we are limiting gatsby-plugin-sitemap to only run between the hours of 8pm and 4am ET.

This plugin isn't installable as is - it's more of a proof of concept so you can base a plugin off of it, as the code in here may not be generic enough for your use case.

To use this properly with incremental / Gatsby Cloud builds, you need to remove gatsby-plugin-sitemap from your gatsby-config.js and replace with gatsby-plugin-sitemap-timing.

The logic for the plugin is in `plugins/gatsby-plugin-sitemap-timing/src/gatsby-node.js`.

The sample configuration is in `gatsby-config.js`