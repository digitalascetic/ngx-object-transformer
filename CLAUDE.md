## Overview
Angular library (`@digitalascetic/ngx-object-transformer`) that provides bidirectional object transformers for serialization/deserialization: dates, JSON, string arrays, property name mapping, and null exclusion.

## Stack
- Angular 18.2.0
- date-fns 4.1.0 (migrated from moment.js)
- TypeScript 5.5.4
- ng-packagr 18.2.0
- Karma 6.4.0 + Jasmine 5.2.0

## Commands
```
ng build          # Build library (output: dist/)
ng test           # Run unit tests (Karma)
ng serve          # Dev server at localhost:4200
```

## Structure
```
projects/digitalascetic/ngx-object-transformer/src/lib/
  object.transformer.ts         # Base interface (transformToObject / transformFromObject)
  date.transformer.ts           # Date ↔ string using date-fns
  simple-object.transformer.ts  # JSON serialization
  string-array.transformer.ts   # String[] ↔ CSV
  property.name.mapper.ts       # Property name mapping interface
  property.accessor.mapper.ts   # Private _prop ↔ public getter/setter mapping
  exclude-if-null.transformer.ts # Conditional null exclusion
  primarykey.object.ts          # PrimaryKey interface
  *.spec.ts                     # Unit tests alongside source files
```

## Gotchas
- `DateTransformer` auto-converts uppercase tokens (`YYYY`→`yyyy`, `DD`→`dd`) for date-fns compatibility.
- `ExcludeIfNullTransformer` has two independent flags: `excludeOut` (serialization) and `excludeIn` (deserialization).
- Root `tsconfig.json` has `strictNullChecks: false` — deliberate for backward compatibility.
- Test fixture class has a typo: `TestAcessorObject` (one 'c' in Accessor).
- Library version is in `projects/digitalascetic/ngx-object-transformer/package.json`; root `package.json` is the Angular workspace scaffold (version 0.0.0).
