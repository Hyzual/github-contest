# github-contest

Challenge your friends on Github to see who is the best open-source social coder!

## Development

You need to have NodeJS with npm and bower installed to build this project.

```bash
# First run npm install
npm install

# Then run bower install
bower install

# Then run grunt serve to start a webserver and run the tests with Karma
grunt serve
```

## Build

To build the `dist/` folder which contains the minified source, run `grunt`

## Testing

Running `grunt test` will run the unit tests with karma. In this configuration, Karma will run the tests on Chrome, Firefox and IE.

## Deploy

Copy the `dist/` folder in the static files dir of any webserver to deploy github-contest.
