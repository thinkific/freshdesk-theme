/**
 * Require Browsersync
 */
var browserSync = require('browser-sync').create();

/**
 * Run Browsersync with server config
 * You can use an arrays for files to specify multiple files
 */

 function styleRemover(match) {
    return {
        match: match,
        fn: function (req, res, match) {
            return ''
        }
    }
 }

browserSync.init({
    proxy: "https://thinkificsandbox.freshdesk.com/support/home",
    serveStatic: ["app/static"],
    https: true,
    files: "app/static/custom.css",
    snippetOptions: {
        rule: {
            match: /<\/head>/i,
            fn: function (snippet, match) {
                return '<link rel="stylesheet" type="text/css" href="/custom.css"/>' + snippet + match;
            }
        }
    },
    rewriteRules: [
        styleRemover(/<link href="\/support\/theme.css\?v=1475186275" media="screen" rel="stylesheet" type="text\/css">/),
        styleRemover(/<link href="https:\/\/assets[0-20].freshdesk.com\/assets\/cdn\/portal_utils-df9def9c0a30f6c5db5e9dc6c7ecaf34.css" media="screen" rel="stylesheet" type="text\/css" \/>/),
        styleRemover(/<link href="https:\/\/assets[0-20].freshdesk.com\/assets\/cdn\/portal_print-262b6789aa974d42a8ce844dfdea193f.css" media="print" rel="stylesheet" type="text\/css" \/>/)
    ]
});