var gulp = require("gulp");
var watch = require("gulp-watch");
var browserSync = require("browser-sync").create();

gulp.task("watch", function() {
//initialise new browsersync method.
  browserSync.init({
    notify: false,
    server: {
      baseDir: "app"
    }
  });
  //watch the index.html file for changes.
  watch("./app/index.html", function() {
    gulp.start("html");
  });

//watch the for any changes to any css files in the styles directory and
//sub-directories.
  watch("./app/assets/styles/**/*.css", function() {
    gulp.start("cssInject");
  });
});

//inject new CSS without reloading the page, called on savedchange to CSS.
gulp.task("cssInject", ["styles"], function(){
  return gulp.src("./app/temp/styles/styles.css")
  .pipe(browserSync.stream());
});

//reload page for any new HTML, called by index.html savechange.
gulp.task("html", function() {
  browserSync.reload();
});
