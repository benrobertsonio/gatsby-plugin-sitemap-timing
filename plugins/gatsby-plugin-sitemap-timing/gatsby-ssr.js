"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

const {
  onRenderBody
} = require('gatsby-plugin-sitemap/gatsby-ssr');

exports.onRenderBody = (args, pluginOptions) => {
  const {
    gatsbyPlugins = []
  } = pluginOptions;

  for (const plugin of gatsbyPlugins) {
    if (plugin.name === 'gatsby-plugin-sitemap') {
      onRenderBody(args, plugin.options);
    }
  }
};