/* eslint-disable */
const cheerio = require('cheerio');
const { pre, post, Select } = require('../hatchvue.js');

export default function convert(html) {
    let $ = cheerio.load(html);

//    console.log(code)
    const input = eval(window.code+'\nfunction get() { return { convert, selectors}; }; get()');
    
    const newSelectors = {};
    
    $ = pre($);
    
    for(let i = 0; i < input.selectors.length; i++) {
        newSelectors[input.selectors[i].name] = new Select(input.selectors[i], $);
    }
    
    const modifiedMethod = input.convert.toString().replace('convert()', 'convert(selectors)').replace(/^function[^{]+{/i,"")  
    .replace(/}[^}]*$/i, "");
    const funct = new Function('selectors, fields, computed', modifiedMethod)
    
//    console.log(sample)
    funct(newSelectors, sample, { style: 'style' })

    $ = post($);

    const ret = $('body').html();
//    console.log(ret);
    return ret;
}