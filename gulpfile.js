var gulp = require('gulp'),
    eventStream = require('event-stream'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    fs = require('fs'),
    path = require('path'),
    s = require('underscore.string'),
    glob = require('glob'),
    path = require('path'),
    size = require('gulp-size'),
    s = require('underscore.string'),
    argv = require('yargs').argv,
    del = require('del'),
    runSequence = require('run-sequence');

var plugins = gulpLoadPlugins({});

var config = {
  main: '.',
  ts: ['plugins/**/*.ts'],
  testTs: ['test-plugins/**/*.ts'],
  less: ['plugins/**/*.less'],
  testLess: ['test-plugins/**/*.less'],
  templates: ['plugins/**/*.html'],
  testTemplates: ['test-plugins/**/*.html'],
  templateModule: 'hawtio-ui-templates',
  testTemplateModule: 'hawtio-ui-test-templates',
  dist: 'dist/',
  testDist: 'test-dist/',
  js: 'hawtio-ui.js',
  testJs: 'hawtio-ui-test.js',
  css: 'hawtio-ui.css',
  testCss: 'hawtio-ui-test.css',
  dts: 'hawtio-ui.d.ts',
  tsProject: plugins.typescript.createProject('tsconfig.json'),
  testTsProject: plugins.typescript.createProject('test-tsconfig.json'),
  vendorJs: 'plugins/vendor/*.js'
};

gulp.task('clean-defs', function() {
  return del(config.dist + 'hawtio-ui.d.ts');
});

gulp.task('example-tsc', ['tsc'], function() {
  var tsResult = gulp.src(config.testTs)
    .pipe(config.testTsProject());

    return tsResult.js.pipe(gulp.dest('.'));
});

gulp.task('example-template', ['example-tsc'], function() {
  return gulp.src(config.testTemplates)
    .pipe(plugins.angularTemplatecache({
      filename: 'test-templates.js',
      root: 'test-plugins/',
      standalone: true,
      module: config.testTemplateModule,
      templateFooter: '}]); hawtioPluginLoader.addModule("' + config.testTemplateModule + '");'
    }))
    .pipe(gulp.dest('.'));
});

gulp.task('example-concat', ['example-template'], function() {
  return gulp.src(['test-compiled.js', 'test-templates.js'])
    .pipe(plugins.concat(config.testJs))
    .pipe(gulp.dest(config.testDist));
});

gulp.task('example-clean', ['example-concat'], function() {
  return del(['test-templates.js', 'test-compiled.js']);
});

gulp.task('tsc', ['clean-defs'], function() {
  var tsResult = gulp.src(config.ts)
    .pipe(config.tsProject());
  return eventStream.merge(
    tsResult.js
      .pipe(plugins.ngAnnotate())
      .pipe(gulp.dest('.')),
    tsResult.dts
      .pipe(plugins.rename(config.dts))
      .pipe(gulp.dest(config.dist)));
});

gulp.task('less', function () {
  return gulp.src(config.less)
    .pipe(plugins.less({
      paths: [
        path.join(__dirname, 'less', 'includes')
      ]
    }))
    .pipe(plugins.concat(config.css))
    .pipe(gulp.dest(config.dist));
});

gulp.task('test-less', function () {
  return gulp.src(config.testLess)
    .pipe(plugins.less({
      paths: [
        path.join(__dirname, 'less', 'includes'),
      ]
    }))
    .pipe(plugins.concat(config.testCss))
    .pipe(gulp.dest(config.dist));
});

gulp.task('template', ['tsc'], function() {
  return gulp.src(config.templates)
    .pipe(plugins.angularTemplatecache({
      filename: 'templates.js',
      root: 'plugins/',
      standalone: true,
      module: config.templateModule,
      templateFooter: '}]); hawtioPluginLoader.addModule("' + config.templateModule + '");'
    }))
    .pipe(gulp.dest('.'));
});

gulp.task('concat', ['template'], function() {
  return gulp.src(['compiled.js', 'templates.js', config.vendorJs])
    .pipe(plugins.concat(config.js))
    .pipe(gulp.dest(config.dist));
});

gulp.task('clean', ['concat'], function() {
  return del(['templates.js', 'compiled.js']);
});

gulp.task('watch', ['build', 'build-example'], function() {
  gulp.watch([config.less, config.ts, config.templates], ['build']);
  gulp.watch([config.testLess, config.testTs, config.testTemplates], ['build-example']);
  gulp.watch([config.dist + '*'], ['reload']);
});

gulp.task('connect', ['watch'], function() {
  plugins.connect.server({
    root: '.',
    livereload: true,
    port: 2772,
    fallback: 'index.html',
    middleware: function(connect, options) {
      return [
        function(req, res, next) {
          var path = req.originalUrl;
          // avoid returning these files, they should get pulled from js
          if (s.startsWith(path, '/plugins/')) {
            console.log("returning 404 for: ", path);
            res.statusCode = 404;
            res.end();
            return;
          } else {
            //console.log("allowing: ", path);
            next();
          }
        }];
    }
  });
});

gulp.task('reload', function() {
  setTimeout(() => {
    gulp.src('.').pipe(plugins.connect.reload());
  });
});

gulp.task('embed-images', ['concat'], function() {

  var replacements = [];

  var files = glob.sync('img/**/*.{png,svg,gif,jpg}');
  //console.log("files: ", files);
  function escapeRegExp(str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
  }

  function getDataURI(filename) {
    var relative = path.relative('.', filename);
    var ext = path.extname(filename);
    var mime = 'image/jpg';
    switch (ext) {
      case '.png':
        mime = 'image/png';
      break;
      case '.svg':
        mime = 'image/svg+xml';
      break;
      case '.gif':
        mime='image/gif';
      break;
    }
    var buf = fs.readFileSync(filename);
    return 'data:' + mime + ';base64,' + buf.toString('base64');
  }

  files.forEach(function(file) {
    replacements.push({
      match: new RegExp(escapeRegExp(file), 'g'),
      replacement: getDataURI(file)
    });
  });

  gulp.src(config.dist + config.js)
  .pipe(plugins.replaceTask({
    patterns: replacements
  }))
  .pipe(gulp.dest(config.dist));
});

gulp.task('site', ['build', 'build-example'], function() {
  gulp.src('website/*', { dot: true })
    .pipe(gulp.dest('site'));
  gulp.src('index.html')
    .pipe(plugins.rename('404.html'))
    .pipe(gulp.dest('site'));
  gulp.src('README.md')
    .pipe(gulp.dest('site'));
  gulp.src(['index.html', 'hawtio-nav-example.js', 'test/**', 'css/**', 'images/**', 'img/**', 'node_modules/**/*.js', 'node_modules/**/*.css', 'node_modules/**/*.swf', 'node_modules/**/*.woff','node_modules/**/*.woff2', 'node_modules/**/*.ttf', 'node_modules/**/*.map', 'dist/**', 'test-dist/**'], {base: '.'})
    .pipe(gulp.dest('site'));

  // var dirs = fs.readdirSync('./node_modules');
  // dirs.forEach(function(dir) {
  //   var path = './node_modules/' + dir + "/img";
  //   try {
  //     if (fs.statSync(path).isDirectory()) {
  //       console.log("found image dir: " + path);
  //       var pattern = 'node_modules/' + dir + "/img/**";
  //       gulp.src([pattern]).pipe(gulp.dest('site/img'));
  //     }
  //   } catch (e) {
  //     // ignore, file does not exist
  //   }
  // });
});

gulp.task('deploy', function() {
  return gulp.src(['site/**', 'site/**/*.*', 'site/*.*'], { base: 'site', dot: true })
    .pipe(plugins.debug({title: 'deploy'}))
    .pipe(plugins.ghPages({
      message: "[ci skip] Update site"
    }));
});

gulp.task('build-clean', function() {
  return del(['dist/hawtio-ui.*']);
});

gulp.task('build-example-clean', function() {
  return del(['dist/hawtio-ui-test.*', 'test-dist/*']);
});

gulp.task('build', function(callback) {
  runSequence('build-clean',
              ['tsc', 'less', 'template', 'concat', 'clean', 'embed-images'],
              callback);
});

gulp.task('build-example', function(callback) {
  runSequence('build-example-clean',
              ['example-tsc', 'test-less', 'example-template', 'example-concat', 'example-clean'],
              callback);
});

gulp.task('default', ['connect']);



