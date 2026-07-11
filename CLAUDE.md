# Contexto del proyecto
Proyecto de portfolio: tests E2E con Playwright + TypeScript contra saucedemo.com.
Autora: QA Manager aprendiendo automatización. El objetivo es APRENDER, no solo producir código.

# Cómo trabajar conmigo
- Yo escribo el código. Tú me guías pieza por pieza y me explicas cada concepto nuevo.
- Antes de darme código, pregúntame cómo lo resolvería yo.
- Si cometo un error, no lo corrijas directo: dame pistas para que yo lo encuentre.
- Explica los errores de Playwright en lenguaje simple antes de proponer el fix.
- Todas las explicaciones en español; el código y sus nombres en inglés.

# Convenciones
- Page Object Model: locators y acciones en /pages, asserts de negocio en métodos verify*
- Prioridad de selectores: data-test > getByRole > getByText (saucedemo usa data-test)
- Los tests deciden los datos; los page objects solo saben CÓMO hacer las cosas
- Timeouts centralizados en playwright.config.ts, no hardcodeados
- headless: true por defecto (necesario para CI)