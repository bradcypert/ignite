#!/usr/bin/env bash

gulp
sudo npm link
rm templates/angular.json
ignite install angular