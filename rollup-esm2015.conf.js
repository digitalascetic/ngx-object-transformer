export default {
    input: 'tmp/esm2015/ngx-object-transformer.js',
    output: {
        file: 'dist/esm2015/ngx-object-transformer.js',
        format: 'es'
    },
    external: ['moment', '@angular/core']
}
