const { Compiler } = require('@adobe/htlengine');

class El {
    constructor(selector, field) {
        this.selector = selector;
        this.field = field;
    }

    hideIfUndefined(field) {
        field = field || this.field;
        this.selector.el.attr('data-sly-test', `\$\{${field}\}`);
        return this;
    }
}

class Select {
    constructor(selector, $) {
        this.selector = selector;
        this.$ = $;
        const segments = selector.path.split(' ');
        for(let i = 0; i < segments.length; i++) {
            const pseudo = segments[i].split(':');
            this.el = $(pseudo[0]);
            if(pseudo.length > 1) {
                this.el = eval(`this.el.${pseudo[1]}`);
            }
        }
    }

    bindText(field) {
        field = field || this.selector.name;
        this.el.text(`\$\{${field}\}`); 
        return new El(this, field);
    }

    bindHTML(field) {
        field = field || this.selector.name;
        this.el.text(`\$\{${field}\}`); 
        return new El(this, field);
    }

    bind(field) {
        return new El(this, field);
    }

    hideIfUndefined(field) {
        field = field || this.selector.name;
        this.el.attr('data-sly-test', `\$\{${field}\}`);
        return new El(this, field);
    }

    bindAttr(name, field) {
        field = field || this.selector.name;
        this.el.attr(name, `\$\{${field}\}`);
        return new El(this, field);
    }
}

function pre($) {
    return $;
}

async function post($) {
    $('<sly data-sly-use.model="model"/>').prependTo('body');

    const html = $('body').html();
    const compiler = new Compiler()
      .withOutputDirectory('.')
      .includeRuntime(true)
//      .withRuntimeGlobalName('it')
      .withOutputFile('htl.js')


    const js = await compiler.compileToFile(html);

    console.log(js)
    return $;
}


module.exports = {
    El, Select, pre, post
}