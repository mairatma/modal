module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],

    frameworks: ['jspm', 'mocha', 'chai'],

    jspm: {
      // ES6 files need to go through jspm for module loading.
      loadFiles: ['test/**/*.js'],
      serveFiles: ['src/**/*.js']
    },

    files: [
      'node_modules/closure-templates/soyutils.js',
    ],

    preprocessors: {
      // All src files should be included in the coverage report. These
      // files don't need to go through the `6to5` preprocessor, as the
      // `coverage` preprocessor already does the necessary conversion.
      'src/**/!(*.soy).js': ['coverage'],

      // Since tests, soy files and jspm packages are not going through
      // the `coverage` preprocessor we need to explicitly make them go
      // through `6to5`.
      'src/**/*.soy.js': ['6to5'],
      'test/**/*.js': ['6to5'],
      'jspm_packages/?*/**/*.js': ['6to5']
    },

    '6to5Preprocessor': {
      options: {
        sourceMap: true,
        modules: 'system'
      }
    },

    reporters: ['coverage', 'progress'],

    coverageReporter: {
      instrumenters: { isparta : require('isparta') },
      instrumenter: {
        '**/*.js': 'isparta'
      },
      instrumenterOptions: {
        isparta: {
          babel: {
            sourceMap: true,
            modules: 'system'
          }
        }
      },
      reporters: [
        {
          type : 'text-summary'
        },
        {
          type : 'html'
        },
        {
          type: 'lcov',
          subdir: 'lcov'
        },
      ]
    }
  });
};
