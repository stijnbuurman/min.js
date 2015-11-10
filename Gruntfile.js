module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    concat: {
      build: {
        src: 'src/$.js',
        dest: 'dist/$.js'
      }
    },

    uglify: {
      options: {
        compress: true
      },
      build: {
        src: 'src/$.js',
        dest: 'dist/$.min.js'
      }
    },

    watch: {
      src: {
        files: ['src/*.js', 'test/*.js'],
        tasks: ['concat:build']
      }
    }
  });

  grunt.registerTask('build', ['concat:build', 'uglify:build']);
  grunt.registerTask('default', ['build']);
};
