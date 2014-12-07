var gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    sass        = require('gulp-ruby-sass'),
    prefix      = require('gulp-autoprefixer'),
    minifyCSS   = require('gulp-minify-css'),
    plumber     = require('gulp-plumber'),
    cmq         = require('gulp-combine-media-queries');
    svgSprites  = require('gulp-svg-sprites');
    clean       = require('del');

//Folder / files variables
var devFolder     = 'html-dev',
    assetsFolder  = devFolder + '/assets',
    bowerFolder   = devFolder + '/bower',
    distFolder    = devFolder + '/dist',
    sassFolder    = assetsFolder + '/scss',
    imgFolder     = assetsFolder + '/images',
    tempFolder    = imgFolder + '/temp',
    copyFiles     = [],
    files = {
      scripts: [
      	bowerFolder + '/jquery/dist/jquery.min.js',
        bowerFolder + '/jquery-placeholder/jquery.placeholder.js',
        bowerFolder + '/iCheck/icheck.js',
        bowerFolder + '/magnific-popup/dist/jquery.magnific-popup.min.js',

        //JS
        assetsFolder + '/js/!(custom)*.js',
        assetsFolder + '/js/customMaps.js',
        assetsFolder + '/js/custom.js',
      ],
      sass: [
      	assetsFolder + '/scss/**/*.scss',
      ]
    };

/*
*
*
*
* Sass
*
*
*
*/

gulp.task('sass-dev', function() {
    return gulp.src(sassFolder + '/core.scss')
      .pipe(plumber())
      .pipe(sass())
      .pipe(concat('style.min.css'))
      .pipe(gulp.dest(distFolder));
});

gulp.task('sass', function() {
    return gulp.src(sassFolder + '/core.scss')
      .pipe(plumber())
      .pipe(sass())
      .pipe(cmq())
      .pipe(minifyCSS())
      .pipe(concat('style.min.css'))
      .pipe(prefix(["last 2 version", "ie8"]))
      .pipe(gulp.dest(distFolder));
});

/*
*
*
*
* Sass fallbacks
*
*
*
*/

gulp.task('sass-fallbacks-dev', ['sass'], function(){
  return gulp.src(sassFolder + '/fallbacks/*.scss')
      .pipe(plumber())
      .pipe(sass())
      .pipe(concat('fallback.min.css'))
      .pipe(gulp.dest(distFolder));
});

gulp.task('sass-fallbacks', ['sass'], function(){
  return gulp.src(sassFolder + '/fallbacks/*.scss')
      .pipe(plumber())
      .pipe(sass({sourcemap:false}))
      .pipe(cmq())
      .pipe(minifyCSS())
      .pipe(concat('fallback.min.css'))
      .pipe(prefix(["last 2 version", "ie 8"]))
      .pipe(gulp.dest(distFolder));
});

/*
*
*
*
* Scripts
*
*
*
*/

gulp.task('scripts-dev', function() {
    return gulp.src(files.scripts)
      .pipe(concat('scripts.min.js'))
      .pipe(gulp.dest(distFolder))
});

gulp.task('scripts', function() {
    return gulp.src(files.scripts)
      .pipe(concat('scripts.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest(distFolder))
});

/*
*
*
*
* Sprite function
*
*
*
*/

function generateSprite(taskName){
  var svg = svgSprites.svg;
      png = svgSprites.png;
      spriteFolder = imgFolder + '/sprites/' + taskName + '.svg';

  gulp.task('generate-' + taskName, function () {
    return gulp.src(imgFolder + '/original-sprite-images/' + taskName + '/*.svg')
      .pipe(svg({
        padding:5,
        cssFile:'_' + taskName + '.scss',
        svg:{
          sprite:taskName + '.svg',
        },
        svgPath:'images/sprites/%f',
        pngPath:'images/sprites/fallback/%f',
      }))
      .pipe(gulp.dest(tempFolder))
      .pipe(png())
  });

  gulp.task('copy-sprite-scss', ['generate-' + taskName], function(){
    return gulp.src([tempFolder + '/*.scss'])
      .pipe(gulp.dest(sassFolder + '/sprites'));
  });

  gulp.task('copy-svg-sprite', ['copy-sprite-scss'], function(){
    return gulp.src([tempFolder + '/*.svg'])
      .pipe(gulp.dest(imgFolder + '/sprites'));
  });

  gulp.task('copy-png-sprite', ['copy-svg-sprite'], function(){
    return gulp.src([tempFolder + '/*.png'])
      .pipe(gulp.dest(imgFolder + '/sprites/fallback'));
  });

  gulp.task('clean-sprites', ['copy-png-sprite'], function(){
      clean([tempFolder + '/*.*']);
  });

  gulp.start(['generate-' + taskName, 'copy-sprite-scss', 'copy-svg-sprite', 'copy-png-sprite', 'clean-sprites' ]);
}

/*
*
*
*
* Generate sprite
*
*
*
*/

gulp.task('base-sprite', function(){ return generateSprite('base-sprite'); });



/*
*
*
*
* Gulp watch
*
*
*
*/

gulp.task('watch', function () {
  gulp.watch(files.scripts, ['scripts']);
  gulp.watch(files.sass, ['sass']);
  gulp.watch(sassFolder + '/fallbacks/*.scss');
});

/*
*
*
*
* Gulp base tasks
*
*
*
*/

gulp.task('default', ['scripts-dev', 'base-sprite', 'sass-dev', 'sass-fallbacks-dev']);
gulp.task('dev', ['scripts', 'base-sprite', 'sass', 'sass-fallbacks', 'watch'] );