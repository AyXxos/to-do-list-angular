# ToDoListAngular

## Context



## Overview

ToDoListAngular is a task management application built with Angular. It allows
users to:

- View their task list.
- Add a task through a Material Design dialog.
- Set an optional title, description, and due date.
- Mark tasks as completed or active.
- Delete tasks.
- Persist tasks in the browser's `localStorage`.
- Navigate between the task list and a separate statistics page.

The statistics page is currently a blank page intended for future development.

## Features

### Task management

Tasks are stored locally in the browser. When the application starts:

- Existing tasks are loaded from `localStorage`.
- Default sample tasks are created if no saved task list exists.
- Changes are automatically saved to `localStorage`.

### Material Design interface

The interface uses Angular Material components, including:

- Cards for tasks and forms.
- Buttons and icon buttons.
- Checkboxes.
- Form fields and validation messages.
- A date picker for due dates.
- A dialog for creating tasks.

### Routing

The application currently provides these routes:

| Route | Description |
|---|---|
| `/tasks` | Main task list |
| `/stats` | Statistics page placeholder |
| `/` | Redirects to `/tasks` |

Unknown routes are also redirected to `/tasks`.

## Tech stack

- Angular 22
- TypeScript
- Angular Material
- Angular CDK
- Angular Reactive Forms
- Angular Router
- Angular SSR and prerendering
- Vitest
- `localStorage` for client-side persistence

## Requirements

Make sure the following tools are installed:

- Node.js
- npm

The project uses npm as its package manager. The required package manager
version is declared in `package.json`.

## Installation

Clone the repository and move into the project directory:

```bash
git clone https://github.com/AyXxos/to-do-list-angular.git
cd toDoListAngular
```

Install the dependencies:

```bash
npm install
```

## Development server

Start the Angular development server:

```bash
npm start
```

Alternatively, use the Angular CLI directly:

```bash
ng serve
```

Then open [http://localhost:4200/](http://localhost:4200/) in your browser.
The application reloads automatically when source files change.

## Production build

Create a production build with:

```bash
npm run build
```

Build artifacts are generated in the `dist/` directory.

## Tests

Run the test suite in watch mode:

```bash
npm test
```

Run the tests once, without watch mode:

```bash
npm test -- --watch=false
```

The project uses Vitest through the Angular CLI test builder.

## SSR build output

The project is configured with Angular SSR and prerendering. After building,
the generated server can be started with:

```bash
npm run serve:ssr:toDoListAngular
```

## Project structure

```text
src/
├── app/
│   ├── components/
│   │   ├── task-form/
│   │   ├── task-item/
│   │   └── task-list/
│   ├── interfaces/
│   │   ├── task.ts
│   │   └── taskList.ts
│   ├── pages/
│   │   ├── stats-page/
│   │   └── task-page/
│   ├── services/
│   │   └── task-storage.ts
│   ├── app.routes.ts
│   └── app.config.ts
├── index.html
├── main.ts
└── styles.css
```

## Useful documentation

- [Angular documentation](https://angular.dev/)
- [Angular CLI documentation](https://angular.dev/tools/cli)
- [Angular Material documentation](https://material.angular.dev/)
