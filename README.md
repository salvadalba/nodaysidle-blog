# NoDaysIdle Blog

This is the official blog for NoDaysIdle, built with Astro, Tailwind CSS, and PocketBase. The blog features articles on AI ethics, human responsibility, and technology.

## ✨ Features

-   **Astro**: A modern static site builder for fast and optimized websites.
-   **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
-   **PocketBase**: An open-source backend for content management.
-   **Multi-language Support**: Content is available in English, Italian, and Slovenian.
-   **SEO Friendly**: Includes sitemap generation, RSS feeds, and OpenGraph data.

## 🚀 Project Setup

### Prerequisites

-   Node.js (v20 or higher)
-   npm
-   PocketBase server

### 1. Clone the repository

```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up PocketBase

This project requires a running PocketBase instance.

1.  **Download PocketBase**: Download the appropriate executable for your operating system from the [PocketBase website](https://pocketbase.io/docs/).
2.  **Start the server**: Run the PocketBase executable in the root of the project directory.

    ```bash
    ./pocketbase serve
    ```

    The server will start at `http://127.0.0.1:8090`.

3.  **Initialize the database**: Once the server is running, you can set up the database schema by running the setup script:

    ```bash
    npm node setup-pocketbase.js
    ```

    This will create the necessary collections and seed the database with some initial data.

### 4. Start the development server

Once the PocketBase server is running, you can start the Astro development server:

```bash
npm run dev
```

The site will be available at `http://localhost:4321`.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command         | Action                                      |
| :-------------- | :------------------------------------------ |
| `npm install`   | Installs dependencies                       |
| `npm run dev`   | Starts the local development server         |
| `npm run build` | Builds the site for production to `./dist/` |
| `npm run preview` | Previews the production build locally       |

## Project Structure

```
src/
├── components/     # Reusable Astro components
├── layouts/        # Page layout components
├── pages/          # Route-based pages
├── lib/            # Utility functions and API clients (PocketBase)
├── content/        # (Legacy) Content collections
├── assets/         # Static assets (images, etc.)
└── styles/         # Global styles and CSS
```

## 📝 License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.
