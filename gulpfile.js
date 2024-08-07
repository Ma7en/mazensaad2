// ========= Mazen Saad ==================

// ====================
// --Start Package
// ====================

const gulp = require("gulp");
const { parallel, src, dest, watch } = require("gulp");
const babel = require("gulp-babel");
// const autoprefixer = require("gulp-autoprefixer");
// const imagemin = require("gulp-imagemin");

// -start livereload
const livereload = require("gulp-livereload");

// -start gulp plugin to minify HTML.
// const htmlmin = require("gulp-htmlmin");

// -start gulp plugin to minify CSS, using clean-css
const cleanCSS = require("gulp-clean-css");

// -start Concatenates files
const concat = require("gulp-concat");

// -Prefix CSS with Autoprefixer
// import autoprefixer from "gulp-autoprefixer";

// -start Sass compiler.
const sass = require("gulp-sass")(require("sass"));

// -Enabling you to compile your Pug templates into HTML
const pug = require("gulp-pug");

// -start sourcemaps
const sourcemaps = require("gulp-sourcemaps");

// -start Minify JavaScript with UglifyJS3.
// -var pipeline = require('readable-stream').pipeline;
// const uglify = require("gulp-uglify");

// -start Minify JavaScript with terser.
const minify = require("gulp-minify");

// -start notification plugin for gulp
const notify = require("gulp-notify");

// start ZIP compress files
// const zip = require("gulp-zip");

// -start Blazing fast vinyl adapter for FTP
// const ftp = require("vinyl-ftp");

// -start minify images
// const imagemin = import("gulp-imagemin");

// ====================
// --Start Coverd Code
// ====================

// -start html pug
function html(done) {
    return (
        gulp
            .src([
                "src/**/*.pug",
                "!src/compontents/*.pug",
                "!src/compontents/**/*",
                "!src/compontents",
                "!src/includes/*.pug",
                "!src/includes/**/*",
                "!src/ui",
                "!src/ui/**/*",
                "!src/ui/**/*.pug",
                "!src/utils/",
                "!src/utils/**/*",
                "!src/0/*.pug",
            ])
            .pipe(pug())
            .pipe(gulp.dest("build/"))
            // .pipe(notify("HTML() Done"))
            .pipe(livereload())
            .on("end", done)
    );
}

// -start html to pug pages
function pages(done) {
    return (
        gulp
            .src(["src/pages/**/*.pug"])
            .pipe(pug())
            .pipe(gulp.dest("build/pages/"))
            // .pipe(notify("pages() Done"))
            .pipe(livereload())
            .on("end", done)
    );
}

// -start css
function css(done) {
    return (
        gulp
            .src(["src/styles/*.scss"])
            .pipe(sourcemaps.init())
            .pipe(sass({ outputStyle: "compressed" }))
            // .pipe(autoprefixer("last 2 versions"))
            // .pipe(autoprefixer())
            .pipe(concat("style.css"))
            .pipe(sourcemaps.write("."))
            .pipe(gulp.dest("build/css/"))
            // .pipe(notify("CSS() Done"))
            .pipe(livereload())
            .on("end", done)
    );
}

// -start public
function styleAll(done) {
    return (
        gulp
            .src([
                // "src/styles/public/all.min.css",
                // "src/styles/public/normalize.css",
                // "src/styles/public/bootstrap.min.css",
                // "src/styles/public/bootstrap.min.css.map",
                "src/styles/public/**/*",
            ])
            // .pipe(concat("all.min.css"))
            .pipe(cleanCSS({ compatibility: "ie8" }))
            .pipe(gulp.dest("build/css/"))
            // .pipe(notify("styleAll() Done"))
            .pipe(livereload())
            .on("end", done)
    );
}

// -start js
function scriptJS(done) {
    return (
        gulp
            .src([
                // "src/js/**/*",
                // "!src/js/global/",
                // "!src/js/global/*.pug",
                // "!src/js/global/**/*",
                // // "!src/js/**/*",
                // "!src/js/public/",
                // "!src/js/public/.js",
                // "!src/js/public/**/*",
                "src/js/*.js",
            ])
            // .pipe(concat("main.js"))
            .pipe(sourcemaps.init())
            .pipe(sourcemaps.write())
            .pipe(minify())
            .pipe(gulp.dest("build/js/"))
            // .pipe(notify("scriptJS() Done"))
            .pipe(livereload())
            .on("end", done)
    );
}

// -start All JS
function scriptAllJS(done) {
    return (
        gulp
            .src([
                // "src/js/public/bootstrap.bundle.min.js",
                // "src/js/public/bootstrap.bundle.min.js.map",
                // "src/js/public/jquery-3.6.0.min.js",
                "src/js/public/**/*",
            ])
            // .pipe(concat("main.js"))
            // .pipe(minify())
            .pipe(gulp.dest("build/js/"))
            // .pipe(notify("scriptAllJS() Done"))
            .pipe(livereload())
            .on("end", done)
    );
}

// -start webfonts
function webfonts(done) {
    return (
        gulp
            .src(["src/webfonts/**/*"])
            .pipe(gulp.dest("build/webfonts/"))
            // .pipe(notify("webfonts() Done"))
            .pipe(livereload())
            .on("end", done)
    );
}

// -start webfonts
function fonts(done) {
    return (
        gulp
            .src(["src/styles/fonts/**/*"])
            .pipe(gulp.dest("build/css/fonts/"))
            // .pipe(notify("webfonts() Done"))
            .pipe(livereload())
            .on("end", done)
    );
}

// -start images task
function moveimages(done) {
    return (
        gulp
            .src(["src/images/**/*"])
            .pipe(gulp.dest("build/images/"))
            // .pipe(notify("moveimages() Done"))
            .pipe(livereload())
            .on("end", done)
    );
}

// تحويل وحدات ES إلى CommonJS
function js() {
    return src("src/**/*.js")
        .pipe(
            babel({
                presets: ["@babel/preset-env"],
            })
        )
        .pipe(dest("build/"));
}

// -start build
// exports.build = function () {
//     // Call your existing tasks in the desired order to build your project
//     return parallel(
//         html,
//         pages,
//         css,
//         styleAll,
//         scriptJS,
//         scriptAllJS,
//         webfonts,
//         fonts,
//         moveimages
//     )();
// };
exports.build = gulp.series(
    html,
    pages,
    css,
    styleAll,
    scriptJS,
    scriptAllJS,
    webfonts,
    fonts,
    moveimages
);

// => gulp localhost
exports.default = function () {
    require("./server");
    livereload.listen();

    gulp.watch(["src/**/*.js"], parallel(js));

    gulp.watch(["src/**/*.pug"], parallel(html));
    gulp.watch(["src/**/*.pug"], parallel(pages));
    gulp.watch(["src/styles/**/*.scss"], parallel(css));
    gulp.watch(["src/**/*.js"], parallel(scriptJS));

    gulp.watch(["src/0/css.pug"], parallel(styleAll));
    gulp.watch(["src/0/js.pug"], parallel(scriptAllJS));
    gulp.watch(["src/0/font.pug"], parallel(webfonts, fonts));
    gulp.watch(["src/0/img.pug"], parallel(moveimages));
};

// => npm run start
exports.server = function () {
    require("./server");
    livereload.listen();

    gulp.watch(["src/**/*.js"], parallel(js));

    gulp.watch(["src/**/*.pug"], parallel(html));
    gulp.watch(["src/**/*.pug"], parallel(pages));
    gulp.watch(["src/styles/**/*.scss"], parallel(css));
    gulp.watch(["src/**/*.js"], parallel(scriptJS));

    gulp.watch(["src/0/css.pug"], parallel(styleAll));
    gulp.watch(["src/0/js.pug"], parallel(scriptAllJS));
    gulp.watch(["src/0/font.pug"], parallel(webfonts, fonts));
    gulp.watch(["src/0/img.pug"], parallel(moveimages));
};
