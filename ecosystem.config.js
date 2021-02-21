module.exports = {
	apps: [
		{
			name: 'sipp-karhutla',
			script: 'yarn',
			args: 'prod:start',
			watch: 'src',
			watch_delay: 3000,
			max_restarts: 10,
			time: true
		}
	]
}
