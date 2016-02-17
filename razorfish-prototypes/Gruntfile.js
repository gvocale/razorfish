module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        compass: {
            dev: {
                options: {
                    httpPath: "/",
                    cssDir: "dist/css",
                    sassDir: "src/css/sass",
                    imagesDir: "src/img",
                    javascriptsDir: "src/js",
                    generatedImagesDir: "dist/img/sprites",
                    generatedImagesPath: "dist/img/sprites",
                    httpGeneratedImagesPath: "dist/img/sprites",
                    outputStyle: "expanded",
                    force: true
                }
            },
            prod: {
                options: {
                    httpPath: "/",
                    cssDir: "dist/css",
                    sassDir: "src/css/sass",
                    imagesDir: "src/img",
                    javascriptsDir: "src/js",
                    generatedImagesDir: "dist/img/sprites",
                    generatedImagesPath: "dist/img/sprites",
                    httpGeneratedImagesPath: "dist/img/sprites",
                    outputStyle: "compressed",
                    force: true
                }
            }
        },

        uglify: {
            dev: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
                    sourceMap: true
                },
                files: {
                    'dist/js/min/razorfish.min.js': ['src/js/razorfish.js'],

                }
            },
            prod: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
                },
                files: {
                    'dist/js/min/razorfish.min.js': ['src/js/razorfish.js']
                }
            }
        },

        browserify: {
            dev: {
                files: {
                    'src/js/razorfish.js': ['src/js/main.js'],
                }
            },
            prod: {
                files: {
                    'src/js/razorfish.js': ['src/js/main.js'],
                }
            },
        },

        watch: {
            compass: {
                files: ['src/css/sass/**/*.scss'],
                tasks: ['compass:dev'],
                options: {
                    livereload: false,
                    force: true
                }
            },
            browserify: {
                files: ['src/js/modules/**/*.js'],
                tasks: ['browserify:dev'],
            },
            uglify: {
                files: ['src/js/razorfish.js'],
                tasks: ['uglify:dev']
            },
        },


        browserSync: {
            bsFiles: {
                src: [
                    'dist/css/*.css',
                    'dist/*.html'
                ]
            },
            options: {
                watchTask: true,
                server: {
                    baseDir: "dist",
                    index: 'home.html'
                }
            }

        },



    });

    var target = ['Authoring', 'Production'].indexOf(grunt.option('target')) !== -1 ? 'prod' : 'dev';

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-browser-sync');


    grunt.registerTask('default', ['watch']);
    grunt.registerTask('giovanni', ['browserSync','watch']);
    grunt.registerTask('build', ['compass:' + target, 'browserify:' + target, 'uglify:' + target]);

};
