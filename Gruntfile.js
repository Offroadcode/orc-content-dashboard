
module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
  var path = require('path');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    pkgMeta: grunt.file.readJSON('config/meta.json'),
    dest: grunt.option('target') || 'dist',
    basePath: path.join('<%= dest %>', 'App_Plugins', '<%= pkgMeta.name %>'),

    watch: {
      options: {
        spawn: false,
        atBegin: true
      },
      dll: {
        files: ['ContentDashboard/OrcContentDashboard/bin/debug/*.dll'] ,
        tasks: [/*'msbuild:dist',*/ 'copy:dll']
      },
      js: {
        files: ['ContentDashboard/**/*.js'],
        tasks: ['concat:dist']
      },
      html: {
        files: ['ContentDashboard/**/*.html'],
        tasks: ['copy:html']
      },
	  sass: {
		files: ['ContentDashboard/**/*.scss'],
		tasks: ['sass', 'copy:css']
	  },
	  css: {
		files: ['ContentDashboard/**/*.css'],
		tasks: ['copy:css']
	  },
	  manifest: {
		files: ['ContentDashboard/package.manifest'],
		tasks: ['copy:manifest']
	  }
    },

    concat: {
      options: {
        stripBanners: false
      },
      dist: {
        src: [
            'ContentDashboard/controllers/orc.content.dashboard.controller.js'
        ],
        dest: '<%= basePath %>/js/orc.content.dashboard.js'
      }
    },

    copy: {
        dll: {
            cwd: 'ContentDashboard/OrcContentDashboard/bin/debug/',
            src: 'OrcContentDashboard.dll',
            dest: '<%= dest %>/bin/',
            expand: true
        },
        html: {
            cwd: 'ContentDashboard/views/',
            src: [
                'dashboard.html',
            ],
            dest: '<%= basePath %>/views/',
            expand: true,
            rename: function(dest, src) {
                return dest + src;
              }
        },
		css: {
			cwd: 'ContentDashboard/css/',
			src: [
				'style.css'
			],
			dest: '<%= basePath %>/css/',
			expand: true,
			rename: function(dest, src) {
				return dest + src;
			}
		},
        manifest: {
            cwd: 'ContentDashboard/',
            src: [
                'package.manifest'
            ],
            dest: '<%= basePath %>/',
            expand: true,
            rename: function(dest, src) {
                return dest + src;
            }
        },
       umbraco: {
        cwd: '<%= dest %>',
        src: '**/*',
        dest: 'tmp/umbraco',
        expand: true
      }
    },

    umbracoPackage: {
      options: {
        name: "<%= pkgMeta.name %>",
        version: '<%= pkgMeta.version %>',
        url: '<%= pkgMeta.url %>',
        license: '<%= pkgMeta.license %>',
        licenseUrl: '<%= pkgMeta.licenseUrl %>',
        author: '<%= pkgMeta.author %>',
        authorUrl: '<%= pkgMeta.authorUrl %>',
        manifest: 'config/package.xml',
        readme: 'config/readme.txt',
        sourceDir: 'tmp/umbraco',
        outputDir: 'pkg',
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      src: {
        src: ['app/**/*.js', 'lib/**/*.js']
      }
  },

  sass: {
		dist: {
			options: {
				style: 'compressed'
			},
			files: {
				'ContentDashboard/css/style.css': 'ContentDashboard/sass/style.scss'
			}
		}
	},

  clean: {
      // build: '<%= grunt.config("basePath").substring(0, 4) == "dist" ? "dist/**/*" : "null" %>',
      tmp: ['tmp'],
      html: [
        'ContentDashboard/views/*.html',
        '!ContentDashboard/views/dashboard.html'
        ],
      js: [
        'ContentDashboard/controllers/*.js',
        '!ContentDashboard/controllers/orc.content.dashboard.controller.js'
      ],
      css: [
        'ContentDashboard/css/*',
        '!ContentDashboard/css/style.css',
        '!ContentDashboard/css/style.css.map'
      ],
	  sass: [
      'ContentDashboard/sass/*.scss',
      '!ContentDashboard/sass/style.scss'
	  ]
  },
  msbuild: {
      options: {
        stdout: true,
        verbosity: 'quiet',
        maxCpuCount: 4,
        version: 4.0,
        buildParameters: {
          WarningLevel: 2,
          NoWarn: 1607
        }
    },
    dist: {
        src: ['ContentDashboard/OrcContentDashboard/OrcContentDashboard.csproj'],
        options: {
            projectConfiguration: 'Debug',
            targets: ['Clean', 'Rebuild'],
        }
    }
  }

  });

  grunt.registerTask('default', ['concat', 'sass:dist', 'copy:html', 'copy:manifest', 'copy:css',/*'msbuild:dist',*/ 'copy:dll', 'clean:html', 'clean:js', 'clean:sass', 'clean:css']);
  grunt.registerTask('umbraco', ['clean:tmp', 'default', 'copy:umbraco', 'umbracoPackage', 'clean:tmp']);
};
