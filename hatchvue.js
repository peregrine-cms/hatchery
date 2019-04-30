export class El {
    constructor(selector, field) {
        this.selector = selector;
        this.field = field;
    }

    hideIfUndefined(field) {
        field = field || this.field;
        this.selector.el.attr('v-if', `${field}`);
        return this;
    }
}

export class Select {
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
        this.el.text(`{{${field}}}`); 
        return new El(this, field);
    }

    bindHTML(field) {
        field = field || this.selector.name;
        this.el.attr('v-html',`${field}`); 
        this.el.text(''); 
        return new El(this, field);
    }

    // bind(field) {
    //     return this;
    // }

    hideIfUndefined(field) {
        field = field || this.selector.name;
        this.el.attr('v-if', `${field}`)
        return this;
    }

    bindAttr(name, field) {
        field = field || this.selector.name;
        this.el.attr('v-bind:'+name,`${field}`); 
        return new El(this, field);
    }
}

export function pre($) {
    return $
}

export function post($) {
    // wrap multi lines into a single one
    return $.load('<div>'+$('body').html()+'</div>');
}

