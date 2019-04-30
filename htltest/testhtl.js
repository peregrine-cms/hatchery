const { Compiler, Runtime } = require('@adobe/htlengine');

const GLOBALS = {  use: { model: { title: 'bli' }}, test: 'bla'  }

async function exec(main, resource) {
    const runtime = new Runtime();
    runtime.use = function(url, globals) {
        return { test: 'ruben'};
    }
    runtime.setGlobal(resource);
    await main(runtime);
    return {
      body: runtime.stream
  };
} 

const model = {}

async function perform() {
    const compiler = new Compiler()
    .withOutputDirectory('.')
//    .includeRuntime(true)
    .withRuntimeVar(Object.keys(GLOBALS))
    .withOutputFile('./htl.js');

    const filename = await compiler.compileFile('./sample.htl');

    // eslint-disable-next-line import/no-dynamic-require,global-require
    const main = require(filename);
    
    const { body } = await exec(main,GLOBALS);
    console.log(body);
}

perform();