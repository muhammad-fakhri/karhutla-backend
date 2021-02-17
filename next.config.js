const withPlugins = require('next-compose-plugins')
const optimizedImages = require('next-optimized-images')
const withSass = require('@zeit/next-sass')
const path = require('path')

module.exports = withPlugins(
	[
		[withSass],
		[
			optimizedImages,
			{
				optimizeImagesInDev: true
			}
		]
	],
	{
		webpack(config, options) {
			config.resolve.modules.push(path.resolve('./src'))
			return config
		}
	}
)
