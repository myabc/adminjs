module.exports = {
  app: {
    src: ['tmp/transpiled/app/**/*.js'],
    dest: 'tmp/result/assets/app.js',
    options: {
      sourcesContent: true
    },
  },

  config: {
    src: ['tmp/result/config/**/*.js'],
    dest: 'tmp/result/assets/config.js',
    options: {
      sourcesContent: true
    },
  },

  lib: {
    src: ['tmp/transpiled/lib/**/*.js'],
    dest: 'tmp/dist/adminjs.js',
    options: {
      sourcesContent: true
    }
  },

  test: {
    src: 'tmp/transpiled/tests/**/*.js',
    dest: 'tmp/result/tests/tests.js',
    options: {
      sourcesContent: true
    }
  },

  "vendorCss": {
    src: ['vendor/**/*.css'],
    dest: 'tmp/result/assets/vendor.css'
  }

  //  "distCss": {
  //    src: ['tmp/dist/**/*.css'],
  //    dest: 'dist/adminjs.css'
  //  },
  //
  //  // TODO: clean this up and put elsewhere
  //  "publicCss": {
  //    src: ['tmp/dist/**/*.css'],
  //    dest: 'tmp/public/assets/adminjs.css'
  //  }
};
