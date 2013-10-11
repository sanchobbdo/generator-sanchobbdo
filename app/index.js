'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var SanchobbdoGenerator = module.exports = function SanchobbdoGenerator(args, options) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        this.installDependencies({ skipInstall: options['skip-install'] });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(SanchobbdoGenerator, yeoman.generators.Base);

SanchobbdoGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    // have Yeoman greet the user.
    console.log(this.yeoman);
    console.log('This is Sancho BBDO Front-end Project Generator');
    console.log('Out of the box this include SASS support for Bourbon/Neat.');

    var prompts = [{
        type: 'input',
        name: 'siteName',
        message: 'What do you want to call the site?'
    },
    {
        type: 'list',
        name: 'projectKind',
        message: 'What kind of project do yo want to create?',
        choices: [{
            name: 'Client-side Web Application (Website)',
            value: 'websiteProject',
            checked: true
        }, {
            name: 'Mobile Webapp (Home Screen App)',
            value: 'webappProject',
            checked: false
        }]
    },
    {
        type: 'checkbox',
        name: 'addons',
        message: 'What of the following would you like to add to the project?',
        choices: [{
            name: 'HTML Tags for responsive websites',
            value: 'responsiveTags',
            checked: true
        }, {
            name: 'Open Graph Tags',
            value: 'openGraphTags',
            checked: true
        }, {
            name: 'Google Analytics',
            value: 'gAnalytics',
            checked: true
        }, {
            name: 'Google Fonts',
            value: 'gFonts',
            checked: false
        }, {
            name: 'Facebook JS SDK',
            value: 'fbSdk',
            checked: false
        }, {
            name: 'HTML Inspector (for development)',
            value: 'htmlInspect',
            checked: false
        }]
    },
    {
        type: 'list',
        name: 'frameworks',
        message: 'Which Framework would you want to use?',
        choices: [{
            name: 'AngularJS',
            value: 'angular',
            checked: true
        }, {
            name: 'jQuery',
            value: 'jquery',
            checked: false
        }]
    }];

    this.prompt(prompts, function (props) {
        var
        projectKind = props.projectKind,
        addons = props.addons,
        frameworks = props.frameworks;

        function hasFeature(answers, feat) { return answers.indexOf(feat) !== -1; }

        this.siteName = props.siteName;

        this.websiteProject = hasFeature(projectKind, 'websiteProject');
        this.webappProject = hasFeature(projectKind, 'webappProject');

        this.responsiveTags = hasFeature(addons, 'responsiveTags');
        this.openGraphTags = hasFeature(addons, 'openGraphTags');
        this.gAnalytics = hasFeature(addons, 'gAnalytics');
        this.gFonts = hasFeature(addons, 'gFonts');
        this.fbSdk = hasFeature(addons, 'fbSdk');
        this.htmlInspect = hasFeature(addons, 'htmlInspect');

        this.angular = hasFeature(frameworks, 'angular');
        this.jquery = hasFeature(frameworks, 'jquery');

        cb();
    }.bind(this));
};

SanchobbdoGenerator.prototype.gruntfile = function gruntfile() {
    this.template('Gruntfile.js');
};

SanchobbdoGenerator.prototype.packageJSON = function packageJSON() {
    this.template('_package.json', 'package.json');
};

SanchobbdoGenerator.prototype.git = function git() {
    this.copy('gitignore', '.gitignore');
};

SanchobbdoGenerator.prototype.bower = function bower() {
    this.copy('bowerrc', '.bowerrc');
    this.copy('_bower.json', 'bower.json');
};

SanchobbdoGenerator.prototype.jshint = function jshint() {
    this.copy('jshintrc', '.jshintrc');
};

SanchobbdoGenerator.prototype.editorConfig = function editorConfig() {
    this.copy('editorconfig', '.editorconfig');
};

SanchobbdoGenerator.prototype.stylesheetsDirectory = function stylesheetsDirectory() {
    this.directory('css', 'app/assets/css');
};

SanchobbdoGenerator.prototype.webappSplash = function webappSplash() {
    if (this.webappProject) {
        this.directory('splash', 'app/assets/i/splash');
    }
};

SanchobbdoGenerator.prototype.scriptsDirectory = function scriptsDirectory() {
    if (this.angular) {
        this.directory('js', 'app/assets/js');
    } else if (this.jquery) {
        this.copy('_simple.js', 'app/assets/js/app.js');
        this.copy('plugins.js', 'app/assets/js/plugins.js');
    }
};

SanchobbdoGenerator.prototype.templateFiles = function templateFiles() {
    this.copy('apple-touch-icon-precomposed.png', 'app/apple-touch-icon-precomposed.png');
    this.copy('favicon.ico', 'app/favicon.ico');
    this.template('humans.txt', 'app/humans.txt');
};

SanchobbdoGenerator.prototype.partialsDirectory = function partialsDirectory() {
    if (this.angular) {
        this.mkdir('app/partials');
        this.copy('partial1.html', 'app/partials/partial1.html');
        this.copy('partial2.html', 'app/partials/partial2.html');
    }
};

SanchobbdoGenerator.prototype.app = function app() {
    this.mkdir('app/assets');
    this.mkdir('app/assets/js');
    this.mkdir('app/assets/i');
    this.template('index.html', 'app/index.html');
};
