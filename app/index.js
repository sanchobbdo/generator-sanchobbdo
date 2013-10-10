'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var SanchobbdoGenerator = module.exports = function SanchobbdoGenerator(args, options, config) {
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
    // console.log('Out of the box this include SASS support for Bourbon/Neat and jQuery.');

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

SanchobbdoGenerator.prototype.app = function app() {
    this.mkdir('app');
    this.mkdir('app/assets');
    this.directory('css', 'app/assets/css');
    this.mkdir('app/assets/js');
    this.mkdir('app/assets/i');
    this.mkdir('app/partials');
    this.copy('partial1.html', 'app/partials/partial1.html');
    this.copy('partial2.html', 'app/partials/partial2.html');

    this.copy('apple-touch-icon-precomposed.png', 'apple-touch-icon-precomposed.png');
    this.copy('favicon.ico', 'favicon.ico');

    this.template('humans.txt', 'humans.txt');

    this.template('index.html', 'index.html');

    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
};

SanchobbdoGenerator.prototype.projectfiles = function projectfiles() {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
};
