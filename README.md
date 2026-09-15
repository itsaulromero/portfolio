# Portfolio

Portfolio profesional de Saúl Romero Cruz, desarrollado con Nuxt, Vue y TypeScript.

> Proyecto en desarrollo como prueba técnica de Frontend para Alebat Education.

## Stack inicial

- Nuxt 4
- Vue 3
- TypeScript
- pnpm

## Requisitos

- Node.js 24.20.0
- pnpm 12.3.4

## Instalación

```powershell
pnpm install
```

## Desarrollo

```powershell
pnpm dev
```

## Validaciones

Ejecutar todas las validaciones del proyecto:

```powershell
pnpm validate
```

También pueden ejecutarse individualmente:

```powershell
pnpm lint
pnpm format:check
pnpm stylelint
pnpm typecheck
pnpm build
```

Para corregir automáticamente problemas compatibles:

```powershell
pnpm lint:fix
pnpm format
pnpm stylelint:fix
```

Los hooks de Git validan automáticamente los archivos preparados y el mensaje de commit mediante Husky, lint-staged y Commitlint.
