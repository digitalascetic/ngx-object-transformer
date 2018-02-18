export default {
    input: 'tmp/esm5/ngx-object-transformer.js',
    output: {
        file: 'dist/esm5/ngx-object-transformer.js',
        format: 'es'
    },
    external: ['moment', '@angular/core']
}
