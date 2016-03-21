module.exports = function(grunt) {
  grunt.initConfig({
    copy: {
      main: {
        files: [
          {expand: true, src: 'fonts/*', dest: 'dist/', cwd: 'src'},
          {expand: true, src: 'css/*', dest: 'dist/', cwd: 'src'}
        ]
      }
    },
    clean: ["dist/index.html"],
    jade: {
      compile: {
        options: {
          pretty: true,
          debug: false,
          data: function(dest, src) {
            return require('./config.json');
          }
        },
        files: {
          "dist/index.html": ["src/jade/index.jade"]
        }
      }
    },
    connect: {
      server: {
        options: {
          livereload: true,
          port: 3000,
          base: 'dist'
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      copy: {
        files: ['src/css/*.css'],
        tasks: ['copy:main']
      },
      jade: {
        files: ['src/jade/**', 'config.json'],
        tasks: ['jade:compile'],
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  
  grunt.registerTask('build', ['clean', 'copy', 'jade']);
  grunt.registerTask('default', ['clean', 'copy', 'jade', 'connect:server', 'watch']);
};
