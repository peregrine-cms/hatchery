const fs = require('fs');
const cheerio = require('cheerio');

const target = process.argv[2];
if(!target) {
    console.log('node convert.js <target>')
    process.exit(1);
}

async function convert() {
    const { El, Select, pre, post } = require('./hatch'+target+'.js');

    const template = fs.readFileSync('./public/fragments/sample/template.html').toString();
    let $ = cheerio.load(template);
    
    const code = fs.readFileSync('./public/fragments/sample/hatch.js').toString();
    
    const input = eval(code+'\nfunction get() { return { convert, selectors}; }; get()');
    
    const newSelectors = {};
    
    $ = pre($);
    
    for(let i = 0; i < input.selectors.length; i++) {
        newSelectors[input.selectors[i].name] = new Select(input.selectors[i], $);
    }
    
    const modifiedMethod = input.convert.toString().replace('convert()', 'convert(selectors)').replace(/^function[^{]+{/i,"")  
    .replace(/}[^}]*$/i, "");
    const funct = new Function('selectors, fields, computed', modifiedMethod)
    
    funct(newSelectors, { }, { style: 'style' })
    
    $ = await post($);
    
    console.log($('body').html())
} 

convert();
