# Portafolio profesional — Saúl Romero

Portafolio bilingüe desarrollado con Nuxt, Vue y TypeScript para presentar mi perfil profesional, experiencia, tecnologías y proyectos de desarrollo web.

El proyecto fue creado como prueba técnica de Frontend para Alebat Education, aplicando una arquitectura basada en componentes, diseño responsive, accesibilidad, internacionalización e integraciones con servicios externos.

## Características

- Página principal organizada en secciones.
- Diseño responsive para dispositivos móviles y escritorio.
- Modos claro y oscuro con persistencia de la preferencia.
- Contenido disponible en español e inglés.
- Integración con la API pública de GitHub.
- Tecnologías organizadas mediante datos reutilizables.
- Listado de proyectos generado dinámicamente.
- Páginas de detalle mediante rutas dinámicas.
- Formulario de contacto conectado a Formspree.
- Validación accesible y estados de envío.
- Página personalizada para errores 404 y errores generales.
- Metadatos SEO localizados.
- Compatibilidad con reducción de movimiento.
- Flujo automatizado de calidad y validación.

## Tecnologías

### Aplicación

- [Nuxt 4](https://nuxt.com/)
- [Vue 3](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 3](https://tailwindcss.com/)
- [Nuxt i18n](https://i18n.nuxtjs.org/)
- [Nuxt Color Mode](https://color-mode.nuxtjs.org/)
- [Roboto Variable](https://fontsource.org/fonts/roboto)
- [Simple Icons](https://simpleicons.org/)

### Integraciones

- API pública de GitHub.
- Formspree para el formulario de contacto.
- Cloudflare como plataforma objetivo de despliegue.
- Zoho Mail para el correo del dominio.

### Calidad de código

- ESLint.
- Prettier.
- Stylelint.
- TypeScript.
- Husky.
- lint-staged.
- Commitlint.

## Requisitos

- Node.js `24.20.0`.
- pnpm `12.3.4`.

Se recomienda utilizar las mismas versiones para reproducir el entorno de desarrollo.

## Instalación

Clonar el repositorio:

```bash
git clone git@github.com:itsaulromero/portfolio.git
cd portfolio
```

Instalar las dependencias:

```bash
pnpm install
```

Crear el archivo local de variables de entorno.

En PowerShell:

```powershell
Copy-Item .env.example .env
```

En Bash:

```bash
cp .env.example .env
```

Configurar el endpoint público de Formspree:

```env
NUXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/your-form-id
```

El archivo `.env` es local y no debe agregarse al repositorio.

## Desarrollo

Iniciar el servidor de desarrollo:

```bash
pnpm dev
```

La aplicación estará disponible de forma predeterminada en:

```text
http://localhost:3000
```

## Rutas principales

| Ruta                    | Descripción                    |
| ----------------------- | ------------------------------ |
| `/`                     | Página principal en español    |
| `/en`                   | Página principal en inglés     |
| `/proyectos/:slug`      | Detalle de proyecto en español |
| `/en/projects/:slug`    | Detalle de proyecto en inglés  |
| Cualquier ruta inválida | Página de error personalizada  |

## Scripts

| Comando              | Descripción                                               |
| -------------------- | --------------------------------------------------------- |
| `pnpm dev`           | Inicia el servidor de desarrollo                          |
| `pnpm build`         | Genera el build de producción                             |
| `pnpm generate`      | Genera una salida estática                                |
| `pnpm preview`       | Ejecuta una vista previa del build                        |
| `pnpm lint`          | Ejecuta ESLint                                            |
| `pnpm lint:fix`      | Corrige automáticamente problemas compatibles de ESLint   |
| `pnpm format`        | Formatea el proyecto con Prettier                         |
| `pnpm format:check`  | Comprueba el formato sin modificar archivos               |
| `pnpm stylelint`     | Analiza los estilos CSS y los componentes Vue             |
| `pnpm stylelint:fix` | Corrige automáticamente estilos compatibles               |
| `pnpm typecheck`     | Ejecuta la comprobación de tipos de Nuxt y TypeScript     |
| `pnpm lint-staged`   | Valida los archivos preparados para commit                |
| `pnpm validate`      | Ejecuta todas las comprobaciones y el build de producción |

## Validación

Ejecutar el flujo completo antes de crear un pull request:

```bash
pnpm validate
```

Este comando ejecuta, en orden:

1. ESLint.
2. Verificación de formato.
3. Stylelint.
4. Comprobación de tipos.
5. Build de producción.

También pueden ejecutarse las validaciones individualmente:

```bash
pnpm lint
pnpm format:check
pnpm stylelint
pnpm typecheck
pnpm build
```

## Estructura principal

```text
app/
├── assets/
│   └── css/
├── components/
│   └── home/
├── composables/
├── data/
├── layouts/
├── pages/
│   ├── index.vue
│   └── projects/
│       └── [slug].vue
├── types/
├── app.vue
└── error.vue

i18n/
└── locales/
    ├── en.json
    └── es.json

public/
└── images/
    └── projects/
```

## Decisiones arquitectónicas

### Componentes por sección

Cada sección de la página principal se encuentra separada en un componente dentro de `app/components/home`. Esto reduce la responsabilidad de la página principal y permite mantener cada bloque de forma independiente.

### Datos de proyectos separados de la interfaz

La información de los proyectos se define en `app/data/projects.ts`. Las tarjetas y páginas de detalle consumen esos datos sin duplicar el contenido estructural.

Los textos traducibles se almacenan en los archivos de idioma y se referencian mediante claves.

### Rutas dinámicas

Los detalles de proyectos utilizan `app/pages/projects/[slug].vue`. El contenido se resuelve mediante el `slug` y las rutas inexistentes generan una respuesta HTTP 404 real.

### Composables

La lógica reutilizable se mantiene fuera de los componentes:

- `useGitHubData` gestiona la consulta de información pública de GitHub.
- `useContactForm` gestiona validación, envío y estados del formulario.

### Internacionalización

El español es el idioma predeterminado y no utiliza prefijo.

El inglés utiliza el prefijo `/en`. La estrategia de rutas es `prefix_except_default`.

### Temas

El proyecto utiliza `@nuxtjs/color-mode` con las siguientes características:

- Detección inicial de la preferencia del sistema.
- Modo oscuro como alternativa predeterminada.
- Persistencia mediante `localStorage`.
- Tokens visuales compartidos para ambos temas.

### Formulario de contacto

El endpoint de Formspree se obtiene mediante `runtimeConfig.public`. Esto evita acoplar el componente a un identificador específico y permite configurar distintos entornos.

El formulario:

- Valida nombre, correo y mensaje.
- Gestiona estados de espera, éxito y error.
- Evita envíos duplicados.
- Conserva los datos si ocurre un error.
- Limpia los campos después de un envío exitoso.
- Proporciona una alternativa mediante correo electrónico.

### Manejo de errores

`app/error.vue` proporciona una interfaz personalizada para errores 404 y errores generales.

Las páginas de error:

- Conservan el idioma activo.
- Respetan el tema seleccionado.
- Permiten volver al inicio.
- Incluyen `noindex, nofollow`.
- Mantienen el código HTTP correspondiente.

## Accesibilidad

El proyecto incorpora:

- Estructura HTML semántica.
- Etiquetas accesibles en controles.
- Navegación mediante teclado.
- Estados de foco visibles.
- Mensajes dinámicos mediante regiones ARIA.
- Gestión de foco en campos inválidos.
- Textos alternativos para imágenes.
- Contraste compatible con los temas claro y oscuro.
- Compatibilidad con `prefers-reduced-motion`.

## Integraciones

### GitHub

La sección “Sobre mí” consulta la API pública de GitHub para mostrar información actualizada del perfil y los repositorios públicos recientes.

La integración no requiere un token privado.

### Formspree

El formulario envía los mensajes mediante Formspree. La URL se configura con:

```env
NUXT_PUBLIC_FORMSPREE_ENDPOINT
```

Después del despliegue debe restringirse el formulario al dominio autorizado.

## Flujo de Git

Los mensajes de commit siguen Conventional Commits.

Husky y lint-staged validan automáticamente los archivos preparados antes de completar un commit. Commitlint comprueba el formato del mensaje.

Ejemplo:

```text
feat(contact): implement accessible contact form
```

## Despliegue

El despliegue de producción está planeado en Cloudflare desde la rama `main`.

Antes de publicar una versión se debe:

1. Ejecutar `pnpm validate`.
2. Configurar `NUXT_PUBLIC_FORMSPREE_ENDPOINT` en el entorno de producción.
3. Conectar el repositorio con Cloudflare.
4. Configurar `saulromero.dev` y `www.saulromero.dev`.
5. Conservar los registros MX y TXT utilizados por Zoho Mail.
6. Verificar las rutas, el formulario y las respuestas 404 en producción.
7. Restringir Formspree al dominio definitivo.

## Autor

**Saúl Romero Cruz**

- GitHub: [@itsaulromero](https://github.com/itsaulromero)
- Sitio: [saulromero.dev](https://saulromero.dev)
- Correo: [contacto@saulromero.dev](mailto:contacto@saulromero.dev)
