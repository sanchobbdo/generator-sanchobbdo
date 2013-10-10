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
    console.log('Out of the box this include SASS support for Bourbon/Neat and jQuery.');

    var prompts = [{
        name: 'siteName',
        message: 'What do you want to call the site?'
    },
    {
        type: 'confirm',
        name: 'siteResponsive',
        message: 'Would you like to include HTML tags for a responsive site?',
        default: true
    },
    {
        type: 'confirm',
        name: 'openGraph',
        message: 'Would you like to include HTML tags for Open Graph?',
        default: true
    }];

    this.prompt(prompts, function (props) {
        this.siteName = props.siteName;
        this.siteResponsive = props.siteResponsive;
        this.openGraph = props.openGraph;

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

SanchobbdoGenerator.prototype.scriptsDirectory = function scriptsDirectory() {
    this.directory('js', 'app/assets/js');
};

SanchobbdoGenerator.prototype.templateFiles = function templateFiles() {
    this.copy('apple-touch-icon-precomposed.png', 'app/apple-touch-icon-precomposed.png');
    this.copy('favicon.ico', 'app/favicon.ico');
    this.template('humans.txt', 'app/humans.txt');
};

SanchobbdoGenerator.prototype.partialsDirectory = function partialsDirectory() {
    this.mkdir('app/partials');
    this.copy('partial1.html', 'app/partials/partial1.html');
    this.copy('partial2.html', 'app/partials/partial2.html');
};

SanchobbdoGenerator.prototype.app = function app() {
    this.mkdir('app/assets');
    this.mkdir('app/assets/js');
    this.mkdir('app/assets/i');
    this.template('index.html', 'app/index.html');
};
