export default {
    input: 'tmp/esm5/ngx-object-transformer.js',
    output: {
        file: 'dist/bundles/ngx-object-transformer.umd.js',
        format: 'umd'
    },
    name: 'ng.ngx-object-transformer',
    external: ['moment', '@angular/core'],
    globals: {
        '@angular/core': 'ng.core',
        'moment': 'moment'
    }
}
