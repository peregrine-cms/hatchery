const selectors = [
    { name: 'title', path: 'h1' },
    { name: 'subtitle', path: 'h2' },
    { name: 'intro', path: '.intro' },
    { name: 'text', path: 'p:eq(1)' }
];

function convert() {
    // bind the field and hide it if value is undefined
    selectors.title.bindText().hideIfUndefined();

    // bind the field and hide it if value is undefined, explicit
    selectors.subtitle.bindText();
    selectors.subtitle.hideIfUndefined();
    
    // bind the field as html
    selectors.intro.bindHTML(fields.intro).hideIfUndefined();

    // bind the field as html
    selectors.text.bindHTML(fields.text).hideIfUndefined();

    // bind an attribute to a computed value
    selectors.title.bindAttr('style', computed.style);
}