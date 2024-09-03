# HooksLab

HooksLab is a collection of custom ReactJS hooks built with TypeScript. These hooks are designed to simplify common tasks in React applications and provide reusable logic to help developers build efficient and maintainable code.

## Features

- Custom React Hooks: A variety of hooks to handle state management, side effects, and more.

- TypeScript Support: Strongly typed hooks to ensure type safety and a better development experience.

- Reusable Components: Hooks that can be easily reused across different projects.

- Flexible Usage: Install hooks as an npm package or copy and paste the code directly from the website.

- Open Source: Available for everyone to use and contribute to.

## Installation

You can start using HooksLab in your project in two ways:

### Option 1: **Install via pnpm**

To install HooksLab as a package, run in the root of your project:

`pnpm install hookslab`

### Option 2: Copy and Paste

Visit the [HooksLab](https://hooks-lab.vercel.app/) website to browse the available hooks. You can copy the code for any hook directly from the site and paste it into your project.

## Usage

Here’s a simple example of how to use one of the hooks from HooksLab:

```typescript
import { useExampleHook } from "hookslab";

function ExampleComponent() {
  const { data, loading, error } = useExampleHook();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Data:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
```
