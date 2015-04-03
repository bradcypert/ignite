<p align="center">
    <img height="250" width="" src="https://cloud.githubusercontent.com/assets/1455979/6810939/5fdf4716-d232-11e4-850a-67399c70d29e.png">
</p>

Ignite
======
JSON based scaffolding system
_____________________________
[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url]

[![Join the chat at https://gitter.im/bc-ignite/ignite](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/bc-ignite/ignite?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

<a href="https://trello.com/b/YdN3XhFs/ignite">
    <img src="https://img.shields.io/badge/Roadmap-Trello-blue.svg">
</a>



###Installation
    npm install -g bc-ignite

###Igniting your Project
    ignite scaffold {template-name}

###Listing Install Templates
    ignite list

###Describing templates
    ignite describe {template-name}

###Advanced usage can be found below

###Current Templates
* **angular** - Minimal baseline, leaving developer to decide folder structure based on type (i.e, Controllers, Directives, Services) or component (e.g., Home, Search, Admin)

* **express** - A seed structure for building robust express apps

* **marionette** - A folder structure for use with Marionette and Backbone.js, creates scripts directory.

* **meteor** - Standardized Meteor Application Template

* **react** - A Flux-Based template for building React Applications

* **drupal** - Standardized Drupal 7 Template folder & file structure

* **wordpress** - Standardized WordPress Template folder & file structure

* **node** - folder & file structure for creating Node.js & io.js modules

* **joomla** - Joomla Template folder & file structure

* **harp** - Harp.js folder & file structure scaffold

* **nwjs** - NW.js application folder & file structure scaffold

* **sublime** - Sublime Text scaffold for creating snippets and packages

* **atom** - Atom.io scaffold for creating packages in CSON and coffeescript.

###Want to Contribute a Template?
Just fork the repo, add one, and submit a pull request.

Why do that instead of generators? Because with generator based solutions like Yeoman and Slush, everyone and their grandma has created generators. The plan for Ignite is to have community standardized templates so there's not 50 different angular scaffolds to choose from.

###Vision.
The plan for Ignite is simple. I want a solution that doesn't scaffold a project for you, but instead scaffolds the structure of a project. Why? Because you'll be able to do things like this...

    ignite scaffold rails
    cd public
    ignite scaffold angular

instead of...

    ignite scaffold rails-angular

This allows you to scaffold only the pieces you need and hopefully will give you a solution more specific to your actual needs, instead of installing all the junk someone else thought they needed when they created the generator.

##Advanced Usage
###Using custom templates
Ignite can be used with user-created templates as well. All you have to do is specify a folder on your file system and use the -d flag when calling the command.

Simply create the template in a directory

    touch /path/to/my/templates/rails.json

Create the JSON appropriately, and then run

    ignite scaffold rails -d /path/to/my/templates/

[travis-image]: https://travis-ci.org/bradcypert/ignite.svg?branch=master
[travis-url]: https://travis-ci.org/bradcypert/ignite
[downloads-image]: http://img.shields.io/npm/dm/bc-ignite.svg
[npm-url]: http://www.npmjs.com/package/bc-ignite
[npm-image]: http://img.shields.io/npm/v/bc-ignite.svg
