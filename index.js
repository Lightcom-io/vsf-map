#!/usr/bin/env node

const fs = require('fs');
const rimraf = require('rimraf');
const symlinkDir = require('symlink-dir');

fs.readFile('map.json', (err, data) => {
    if (err) {
        return console.warn('No map.json found.')
    }

    let map = JSON.parse(data);

    for (let source in map) {
        let target = map[source]

        rimraf(target, () => {
            symlinkDir(source, target).then(result => {
                console.info('Linked "%s" to "%s"', source, target)
            })
        })
    }
})
