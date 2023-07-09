const core = require('@actions/core');

const name = core.getInput('who-to-greet');
console.log(`Hello ${name}`)

const time = new Date()
core.setOutput("time", time.toTimeString())