// Gulp file is something you run on the JS commandline using Node
// this is what is used to compile and minify all our files

// import all the npm packages, and initialise the modules
const { src, dest, watch, series } = require('gulp');
//const sass =  require('gulp-sass');
const sass =  require('gulp-sass')(require('sass'))
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
//const autoprefixer = require('autoprefixer');
const browsersync = require('browser-sync').create();


var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
 
gulp.task('deploy', function() {
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});


// setting the sass compiler to use dart-sass
//sass.compiler = require('gulp-sass')(require('sass'));

// compile the sass into JS
// pipe() is a Gulp function, used to run each task one after the other
// sass sourcemaps is an extra file that is generated, it maps where a css component is written in code, useful for debugging
function scssTask() {
  return src('app/scss/style.scss', { sourcemaps: true }) // create style.css file in specified location
    .pipe(sass()) // from the Gulp-sass module, compiles the sass into css
    // autoprefixer will add the browser prefixes to support older browsers for particular css properties like 'transform'
    // cssnano will 'minify' the css file
    .pipe(postcss([autoprefixer(), cssnano()])) 
    // set the destination of the final compiled file into the 'dist' folder, sourcemape location is set to be the same as dist
    .pipe(dest('dist', { sourcemaps: '.' })); 
}


function jsTask() {
  return src('app/js/script.js', { sourcemaps: true }) // create script.js file in specified location
    // babel is used to compile any modern JS into an older version, for older browser support
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(terser()) // terser is used to minify the JS file
    // set the destination of the final compiled file into the 'dist' folder, sourcemape location is set to be the same as dist
    .pipe(dest('dist', { sourcemaps: '.' }));
}


// Browsersync build tool -- start up a local server to show locally made changes
// cb -- callback function to indicate it has finished running
function browserSyncServe(cb) {
  browsersync.init({
    server: {
      baseDir: '.',
    },
    notify: {
      styles: {
        top: 'auto',
        bottom: '0',
      },
    },
  });
  cb();
}
function browserSyncReLoad(cb) {
  browsersync.reload();
  cb();
}

// Watch Task: watch specified files, when any changes are made to the file types, run a reload
function watchTask() {
  watch('*.html', browserSyncReLoad); 
  watch(
    ['app/scss/**/*.scss', 'app/**/*.js'],
    series(scssTask, jsTask, browserSyncReLoad)
  );
}

// Defualt Gulp Task -- what Gulp will run when gulp is run on the cmd
exports.default = series(scssTask, jsTask, browserSyncServe, watchTask);