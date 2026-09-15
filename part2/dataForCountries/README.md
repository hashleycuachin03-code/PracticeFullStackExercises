# Data for Countries

This React + Vite app uses the OpenWeather API to display weather for a country's capital.

## Setup

Create a `.env.local` file in the project root and add your OpenWeather API key:

```env
VITE_SOME_KEY=your_openweathermap_api_key
```

The app reads this value from `import.meta.env.VITE_SOME_KEY`, so you only need to set it once. Restart the Vite dev server after changing the file. Do not commit `.env.local` or your real API key.

Install dependencies and start the app:

```bash
npm install
npm run dev
```

You can use `.env.example` as a template.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
