module.exports = function(grunt) {

	grunt.initConfig({
		concat: {
				options: {
					separator: ';'
				},
				dist: {
					src: [
						'./app/js/async-youtube-widget-load.js',
						'./app/js/app.js',
						'./app/js/services.js',
						'./app/js/directives.js',
						'./app/js/controllers.js'
					],
					dest: './app/js/youtubeWidget-concat.js'
				},
		},
		uglify: {
			my_target: {
				files: {
					'./app/js/youtubeWidget-min.js': [
						'./app/js/async-youtube-widget-load.js',
						'./app/js/app.js',
						'./app/js/services.js',
						'./app/js/directives.js',
						'./app/js/controllers.js'
					]
				}
			}
		},
		cssmin: {
			combine: {
				files: {
					'./app/css/youtube-widget-min.css': ['./app/css/youtube-widget.css']
				}
			}
		}
	});

	// Load required modules
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');

	// Task definitions
	grunt.registerTask('default', ['concat', 'uglify', 'cssmin']);

};