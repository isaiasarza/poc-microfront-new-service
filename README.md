# POC Microfrontend

Este repositorio contiene un template básico que pueda ser de utilidad para cualquier Prueba de Concepto (POC) que se deba realizar con el framework nextjs.

## Componentes

Consta de dos microfront (login y home), más el componente orquestador o contenedor (shell).

## Dependencias

- **webpack: 5.89.0**
- **react: ^18**
- **next: 14.0.2**
- **tailwindcss: ^3.3.5**
- **@nextui-org/react: ^2.2.9**
- **@module-federation/nextjs-mf: ^8.1.0-canary.1**.

## Ejecutar

```shell
    yarn install #Instalar las dependencias necesarias en cada componente.
    yarn run start #Ejecutar desde la carpeta raíz, esto levanta todos los componentes.
    yarn run build #Ejecutar desde la carpeta raíz, esto "buildea" todos los componentes.
```
