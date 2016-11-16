module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        frontend_path: "./frontend/",
        dist_path:     "./public/",
        bower_path:    "./bower_components/",

        assets_relative_path: "assets/",
        image_relative_path:  "<%= assets_relative_path %>img/",
        js_relative_path:     "<%= assets_relative_path %>js/",
        css_relative_path:    "<%= assets_relative_path %>css/",
        less_relative_path:   "<%= assets_relative_path %>less/",
        font_relative_path:   "<%= assets_relative_path %>fonts/",
        view_relative_path:   "<%= assets_relative_path %>view/",

        ngAnnotate: {
            options: {
                singleQuotes: true
            },
            production: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= frontend_path %>/<%= assets_relative_path %>/',
                        src: ['**/*.js'],
                        dest: '<%= frontend_path %>/<%= assets_relative_path %>/tmp/'
                    }
                ]
            }
        },

        less: {
            development: {
                files: {
                    '<%= dist_path %><%= css_relative_path %>app.css': '<%= frontend_path %><%= less_relative_path %>style.less'
                }
            },
            production: {
                options: {
                    compress: true
                },
                files: {
                    '<%= dist_path %><%= css_relative_path %>app.min.css': '<%= frontend_path %><%= less_relative_path %>style.less'
                }
            },
        },

        concat: {
            development: {
                src: [
                    '<%= frontend_path %>/<%= js_relative_path %>/app.js',
                    '<%= frontend_path %>/<%= js_relative_path %>/**/*.js'
                ],
                dest: '<%= dist_path %>/<%= js_relative_path %>/app.js'
            },
            development_vendor_css: {
                src: [
                    '<%= bower_path %>/roboto-condensed/css/roboto-condensed.css',
                    '<%= bower_path %>/font-awesome/css/font-awesome.css',
                    '<%= bower_path %>/sweetalert/dist/sweetalert.css',
                    '<%= bower_path %>/ngToast/dist/ngToast.min.css',
                    '<%= bower_path %>/ngToast/dist/ngToast-animations.min.css',
                    '<%= bower_path %>/angularjs-slider/dist/rzslider.min.css',
                    '<%= bower_path %>/chosen/chosen.css',
                ],
                dest: '<%= dist_path %>/<%= css_relative_path %>/vendor.css'
            },
            development_vendor_js: {
                src: [
                    '<%= bower_path %>/jquery/dist/jquery.min.js',
                    '<%= bower_path %>/angular/angular.js',
                    '<%= bower_path %>/angular-route/angular-route.js',
                    '<%= bower_path %>/angular-messages/angular-messages.js',
                    '<%= bower_path %>/angular-sanitize/angular-sanitize.js',
                    '<%= bower_path %>/ngstorage/ngStorage.min.js',
                    '<%= bower_path %>/ngToast/dist/ngToast.min.js',
                    '<%= bower_path %>/sweetalert/dist/sweetalert-dev.js',
                    '<%= bower_path %>/angularjs-slider/dist/rzslider.min.js',
                    '<%= bower_path %>/chosen/chosen.jquery.js',
                    '<%= bower_path %>/angular-chosen-localytics/dist/angular-chosen.min.js',
                ],
                dest: '<%= dist_path %>/<%= js_relative_path %>/vendor.js'
            },
            production: {
                src: [
                    '<%= frontend_path %>/<%= assets_relative_path %>/tmp/js/app.js',
                    '<%= frontend_path %>/<%= assets_relative_path %>/tmp/js/**/*.js'
                ],
                dest: '<%= dist_path %>/<%= js_relative_path %>/app.js'
            }
        },

        uglify: {
            production: {
                src: ['<%= dist_path %>/<%= js_relative_path %>/app.js'],
                dest: '<%= dist_path %>/<%= js_relative_path %>/app.min.js'
            }
        },

        htmlmin: {
            production: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    src: "<%= dist_path %>/index.html",
                    dest: "<%= dist_path %>/index.html"
                }, {
                    expand: true,
                    cwd: '<%= frontend_path %>/<%= view_relative_path %>/',
                    src: ['*.html'],
                    dest: '<%= dist_path %>/<%= view_relative_path %>/'
                }]
            }
        },

        jshint: {
            files: ['<%= frontend_path %>/**/*.js'],
            options: {
                globals: {
                    console: true
                }
            }
        },

        copy: {
            development: {
                files: [
                    {
                        src: '<%= frontend_path %>/favicon.ico',
                        dest: '<%= dist_path %>/favicon.ico'
                    },
                    {
                        expand: true,
                        cwd: '<%= frontend_path %>/<%= image_relative_path %>/',
                        src: ['**/*.{png,jpg,gif}'],
                        dest: '<%= dist_path %>/<%= image_relative_path %>/'
                    },
                    {
                        expand: true,
                        cwd: '<%= frontend_path %>/<%= view_relative_path %>/',
                        src: ['**/*.html'],
                        dest: '<%= dist_path %>/<%= view_relative_path %>/'
                    },
                    {
                        expand: true,
                        cwd: '<%= bower_path %>/font-awesome/fonts/',
                        src: ['**/*'],
                        dest: '<%= dist_path %>/<%= font_relative_path %>/'
                    },
                    {
                        expand: true,
                        cwd: '<%= bower_path %>/roboto-condensed/fonts/',
                        src: ['**/*'],
                        dest: '<%= dist_path %>/<%= font_relative_path %>/'
                    }
                ]
            },
            production: {
                files: [
                    {
                        src: '<%= frontend_path %>/favicon.ico',
                        dest: '<%= dist_path %>/favicon.ico'
                    }
                ]
            }
        },

        processhtml: {
            development: {
                options: {
                    process: true,
                    data: {
                        stylesheets: [
                            '<%= css_relative_path %>vendor.css',
                            '<%= css_relative_path %>app.css'
                        ],
                        javascripts: [
                            '<%= js_relative_path %>vendor.js',
                            '<%= js_relative_path %>app.js'
                        ]
                    }
                },
                files: [{
                    src: "<%= frontend_path %>/index.html",
                    dest: "<%= dist_path %>/index.html"
                }]
            },
            production: {
                options: {
                    process: true,
                    data: {
                        stylesheets: [
                            'https://fonts.googleapis.com/css?family=Roboto+Condensed:400,700',
                            'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css',
                            'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css',
                            'https://cdnjs.cloudflare.com/ajax/libs/sweetalert/1.1.3/sweetalert.min.css',
                            'https://cdnjs.cloudflare.com/ajax/libs/chosen/1.6.2/chosen.min.css',
                            'https://cdnjs.cloudflare.com/ajax/libs/angularjs-slider/5.5.1/rzslider.min.css',
                            '<%= css_relative_path %>app.min.css'
                        ],
                        javascripts: [
                            'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular.min.js',
                            'https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.8/angular-route.min.js',
                            'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js',
                            'https://cdnjs.cloudflare.com/ajax/libs/sweetalert/1.1.3/sweetalert.min.js',
                            'https://cdnjs.cloudflare.com/ajax/libs/angularjs-slider/5.5.1/rzslider.min.js',
                            '<%= js_relative_path %>app.min.js'
                        ]
                    }
                },
                files: [{
                    src: "<%= frontend_path %>/index.html",
                    dest: "<%= dist_path %>/index.html"
                }]
            }
        },

        clean: {
            dist: ['<%= dist_path %>/'],
            tmp: ['<%= frontend_path %>/<%= assets_relative_path %>/tmp'],
        },

        watch: {
            dist: {
                files: [
                    '<%= frontend_path %>/**/*',
                ],
                tasks: ['default'],
                options: {
                    livereload: true,
                }
            }
        },

        notify_hooks: {
            options: {
                enabled: true,
                max_jshint_notifications: 5,
                title: 'Grunt task manager',
                success: true,
                duration: 2
            }
        }

    });

    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-notify');

    grunt.registerTask('default', [
        'clean:dist',
        'concat:development',
        'concat:development_vendor_css',
        'concat:development_vendor_js',
        'less:development',
        'jshint',
        'copy:development',
        'processhtml:development',
        'clean:tmp',
        'notify_hooks'
    ]);

    grunt.registerTask('production', [
        'clean:dist',
        'ngAnnotate',
        'concat:production',
        'less:production',
        'jshint',
        'copy:production',
        'processhtml:production',
        'uglify',
        'htmlmin',
        'clean:tmp',
        'notify_hooks'
    ]);

    grunt.registerTask('w', ['watch']);
};
