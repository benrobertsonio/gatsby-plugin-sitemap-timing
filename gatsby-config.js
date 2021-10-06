module.exports = {
    siteMetadata: {
        siteUrl: 'https://www.example.com',
        title: 'sitemap-timing-plugin',
    },
    plugins: [

        {
            resolve: 'gatsby-plugin-sitemap-timing',
            options: {
                gatsbyPlugins: [
                    {
                        name: 'gatsby-plugin-sitemap',
                        // these options should be whatever you would normally pass into gatsby-plugin-sitemap.
                        options: {
                            // This is the default query from gatsby-plugin-sitemap
                            query: `
                            {
                                site {
                                  siteMetadata {
                                    siteUrl
                                  }
                                }
                                allSitePage {
                                  nodes {
                                    path
                                  }
                                }
                              }`,
                            excludes: [],
                            output: '/',
                            entryLimit: '45000', //
                            createLinkInHead: true,

                            resolveSiteUrl: () => `https://www.example.com`,

                        }
                    }
                ]
            }
        }

    ],
}
