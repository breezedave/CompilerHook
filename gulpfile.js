const gulp = require("gulp");
const path = require("path");
const buildDir = path.resolve(__dirname, "./build/");
const appDir = path.resolve(__dirname, "src");
const webpackStream = require("webpack-stream");
const DavesCompilerHook = require("./compilerHook.js");
const webpack = require("webpack");

let webpackSettings = {
    mode: "development",
    devtool: "source-map",
    watch: true,
    entry: appDir + "/index.js",
    output: {
        path: buildDir,
        filename: "bundle.js"
    },
    resolve: {
        extensions: [".js", ".jsx" ]
    },
    plugins: [
        new DavesCompilerHook({
            "A":"A",
            "B":"B",
            "C":"C"
        }),
        new webpack.WatchIgnorePlugin([
          /(A|B|C)\.js$/,
          /node_modules\//
        ])
    ]
};

gulp.task("watchOn", function() {
    webpackSettings.watch = true;
});

gulp.task("watchOff", function() {
    webpackSettings.watch = false;
});

gulp.task("default", ["watchOff"], function() {
    return webpackStream(webpackSettings)
        .pipe(gulp.dest(buildDir));
});

gulp.task("watch", ["watchOn"], function() {
    return webpackStream(webpackSettings)
        .pipe(gulp.dest(buildDir));
});


//const webpack = require("webpack");
//const browserSync = require("browser-sync");
//const webpackDevMiddleware = require("webpack-dev-middleware");
//const webpackHotMiddleware = require("webpack-hot-middleware");
//const bundler = webpack(webpackSettings);
//gulp.task("webby", function() {
//    browserSync({
//        server: {
//            baseDir: [ "./Src/"],
//            middleware: [
//                webpackDevMiddleware(bundler, {
//                    publicPath: webpackSettings.output.publicPath,
//                    stats: { colors: true }
//                }),
//                webpackHotMiddleware(bundler)
//            ]
//        },
//        files: [
//            "./Src/**/*.css",
//            "./Src/**/*.html"
//        ]
//    });
//});
