export default {
  entry: 'dist/index.js',
  dest: 'dist/bundles/ngx-object-transformer.umd.js',
  sourceMap: false,
  format: 'umd',
  moduleName: 'ngx-object-transformer',
  globals: {
    '@angular/core': 'ng.core'
  }
}
