// Generated on 2014-10-26 using generator-angular 0.9.8
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'app/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'app/**/*.js'

module.exports = function (grunt) {

  // Lazy-load grunt tasks automatically
  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin'
  });

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: 'dist'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    yeoman: appConfig,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      js: {
        files: ['<%= yeoman.app %>/**/*.js', '!<%= yeoman.app %>/**/*_test.js'],
        tasks: ['karma:continuous:run'],
        options: {
          livereload: '<%= connect.options.livereload %>'
        }
      },
      jsTest: {
        files: ['<%= yeoman.app %>/**/*_test.js'],
        tasks: ['karma:continuous:run'],
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        files: [
          '<%= yeoman.app %>/**/*.html',
          '<%= yeoman.app %>/styles/{,*/}*.css',
          '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      },
      options: {
        livereload: '<%= connect.options.livereload %>'
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      test: {
        options: {
          port: 9001,
          middleware: function (connect) {
            return [
              connect().use(
                '/bower_components',
                connect.static('./bower_components')
              ),
              connect.static(appConfig.app)
            ];
          }
        }
      },
      coverage: {
        options: {
          open: true,
          port: 9003,
          keepalive: true,
          base: './coverage/'
        }
      },
      dist: {
        options: {
          port: 9002,
          open: true,
          base: '<%= yeoman.dist %>'
        }
      }
    },

    // Test settings
    karma: {
      options: {
        configFile: './karma.conf.js',
      },
      unit: {
        singleRun: true,
        browsers: ['Chrome', 'IE', 'Firefox'],
        reporters: ['notify', 'coverage']
      },
      continuous: {
        singleRun: false,
        background: true,
        browsers: ['Chrome'],
        reporters: ['progress', 'notify']
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= yeoman.app %>/index.html'],
        ignorePath: /\.\.\//
      },
      test: {
        src: 'karma.conf.js',
        fileTypes: {
          js: {
            block: /(([\s\t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi,
            detect: {
                js: /'(.*\.js)'/gi
            },
            replace: {
                js: '\'{{filePath}}\','
            }
          }
        },
        devDependencies: true
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/{,*/}*',
            '!<%= yeoman.dist %>/.git*'
          ]
        }]
      },
      coverage: {
        files: [{
            dot: true,
            src: ['./coverage']
        }]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      options: {
        assetsDirs: ['<%= yeoman.dist %>','<%= yeoman.dist %>/images', '<%= yeoman.dist %>/styles']
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= yeoman.dist %>/scripts/{,*/}*.js',
          '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          '<%= yeoman.dist %>/styles/{,*/}*.css',
          '<%= yeoman.dist %>/styles/*.{png,jpg,jpeg,gif,webp,svg}', // images user by vendor plugins
          '<%= yeoman.dist %>/styles/fonts/*'
        ]
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/images'
        },
        {
          expand: true,
          cwd: '.tmp/styles',
          src: '*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/styles'
        }]
      }
    },

    // Minify our CSS files but do not merge them, we still want to have two
    cssmin: {
      styles: {
        files: [{
          expand: true,
          cwd: '.tmp/styles',
          src: ['*.css', '!*.min.css'],
          dest: '<%= yeoman.dist %>/styles',
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true,
          removeOptionalTags: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['{,*/}*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          src: [
          '*.{ico,png,txt}',
          '.htaccess',
          '**/*.html',
          '**/*.json'
          ],
          dest: '<%= yeoman.dist %>'
        },
        {
          expand: true,
          cwd: '<%= yeoman.app %>',
          src: ['styles/{,*/}*.css'],
          dest: '.tmp'
        },
        {
          expand: true,
          cwd: 'bower_components/bootstrap/fonts',
          dest: '<%= yeoman.dist %>/fonts',
          src: '*.*'
        }]
      }
    }
  });

  grunt.registerTask('serve', 'Compile then start a connect web server', function(target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.task.run([
        'wiredep',
        'karma:continuous',
        'connect:livereload',
        'watch'
      ]);
  });

  grunt.registerTask('test', 'Run unit tests', function() {
    return grunt.task.run([
      'karma:unit'
    ]);
  });

  grunt.registerTask('coverage', 'Run unit tests and display test coverage results on browser', function() {
    return grunt.task.run([
      'clean:coverage',
      'karma:unit',
      'connect:coverage'
    ]);
  });

  grunt.registerTask('build', 'Concatenate all JS files, minify all JS, CSS, HTML and image files and version all static assets', function() {
    return grunt.task.run([
      'clean:dist',
      'wiredep:app',
      'useminPrepare',
      'concat:generated',
      'copy:dist',
      'imagemin',
      //'ngAnnotate',
      'cssmin',
      'uglify:generated',
      'filerev',
      'usemin',
      'htmlmin'
    ]);
  });

  grunt.registerTask('default', [
    'test',
    'build'
  ]);
};
