# Async/Dynamic JAMstack Examples

This repo is a collection of demos to accompany an article for Smashing Magazine.

## A note about Sharp

Sharp is extremely powerful, but it’s also kinda... finicky. This demo was built using Node v12.8.0, so if you’re _not_ using Node v12.8.0, there’s a non-zero chance you’ll get errors from Sharp during install.

You can fix this in two ways:

1. If you’re using `nvm`, just run `nvm` in the project root to switch to Node v12.8.0
2. If you want to use a different version of Node, delete `yarn.lock` and `node_modules`, then run a fresh `yarn` to build Sharp against your preferred Node version
