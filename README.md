# ORC Content Dashboard &middot; ![version](https://img.shields.io/badge/version-1.0.0-green.svg)

A custom dashboard for Umbraco that lets you view all content nodes that haven't been updated in the last 6 months.

## Download for Umbraco

TODO when released.

## Contribute

Want to contribute to the ORC Content Dashboard package? You'll want to use Grunt (our task runner) to help you integrate with a local copy of Umbraco.

### Install Dependencies
*Requires Node.js to be installed and in your system path*

    npm install -g grunt-cli && npm install -g grunt
    npm install

### Build

    grunt

Builds the project to /dist/. These files can be dropped into an Umbraco 7 site, or you can build directly to a site using:

    grunt --target="D:\inetpub\mysite"

You can also watch for changes using:

    grunt watch
    grunt watch --target="D:\inetpub\mysite"

If you want to build the package file (into a pkg folder), use:

    grunt umbraco
