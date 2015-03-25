<p align="center">
  <a href="http://gulpjs.com">
    <img height="250" width="" src="https://cloud.githubusercontent.com/assets/1455979/6810939/5fdf4716-d232-11e4-850a-67399c70d29e.png">
  </a>
</p>

Ignite
======
JSON based scaffolding system
_____________________________
[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] 



###Installation
    npm install -g bc-ignite

###Igniting your Project
    ignite scaffold {template-name}

###Listing Install Templates
    ignite list

###Describing templates
    ignite describe {template-name}

###Current Templates
#####Meteor - Standardized Meteor Application Template
#####React - A Flux-Based template for building React Applications

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

[downloads-image]: http://img.shields.io/npm/dm/bc-ignite.svg
[npm-url]: http://www.npmjs.com/package/bc-ignite
[npm-image]: http://img.shields.io/npm/v/bc-ignite.svg
