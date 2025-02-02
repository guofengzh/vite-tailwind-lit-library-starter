# Reference

- Modify [Vite + Lit Library Starter](https://github.com/ms-fadaei/vite-lit-library-starter) to use latest versions of packages.
- Integrate Tailwind CSS v4. 

TODO:

1. type declaration

if the settings in tsconfig.json has:
```
    "declaration": true,
    "declarationMap": true,
```
VS Code emit compilation errors for Lit components.

2. d.mts file


For the following statement:
```
import tailwindcss from '@tailwindcss/vite'
```
VS Code emit `Cannot find module '@tailwindcss/vite' or its corresponding type declarations`.

`@tailwindcss/vite` has only `d.mts` file defined, no `d.ts` file defined.