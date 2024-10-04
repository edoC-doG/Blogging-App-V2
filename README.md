<div align="center">
  <br />
    <a href="https://youtu.be/kRQbRAJ4-Fs" target="_blank">
      <img src="https://res.cloudinary.com/dharyanjc/image/upload/v1728016890/blog_menu_ufkrpm.png" alt="Project Banner">
    </a>
  <br />

  <div>
    <img src="https://img.shields.io/badge/-React_JS-black?style=for-the-badge&logoColor=white&logo=react&color=61DAFB" alt="react.js" />
    <img src="https://img.shields.io/badge/-Three_JS-black?style=for-the-badge&logoColor=white&logo=threedotjs&color=000000" alt="three.js" />
    <img src="https://img.shields.io/badge/-GSAP-black?style=for-the-badge&logoColor=white&logo=greensock&color=88CE02" alt="greensock" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
  </div>

  <h3 align="center">Blog App</h3>

</div>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🕸️ [Snippets](#snippets)

## 🚨 Tutorial
If you prefer visual learning, this is the perfect resource for you. Follow our tutorial to learn how to build projects like these step-by-step in a beginner-friendly manner!
## <a name="introduction">🤖 Introduction</a>
This blog app is a modern, fully responsive platform designed to deliver an optimal user experience while maintaining robust performance and security. Built using the latest technologies such as React.js, Vite, and Tailwind CSS, the app combines fast development cycles with visually appealing design. By leveraging Redux Toolkit for state management and Redux Persist for seamless data retention, the app ensures users can create, manage, and view blogs effortlessly, even across sessions.

Security is a top priority, with Google Authentication handling user logins and JWT (JSON Web Tokens) providing secure access to protected routes and features. Media storage is powered by AWS S3, allowing efficient handling of blog images and attachments. This app is designed for scalability, maintainability, and an enhanced user experience, making it perfect for anyone looking to share ideas and stories in a beautifully crafted digital space.
## <a name="tech-stack">⚙️ Tech Stack</a>
- React.js
- Vite
- Tailwind CSS
- Redux, Redux Persist, Redux ToolKit
- AWS S3
- Google Auth, JWT
## <a name="features">🔋 Features</a>

👉 **State Management with Redux Toolkit and Persist**: Efficient state management with Redux Toolkit, ensuring seamless synchronization of blog data such as blog_id, user_id, title, and description, while Redux Persist maintains the state even after page reloads.

👉 **Fast and Efficient Development with Vite**: Leveraging Vite for its lightning-fast build and hot-reload capabilities, improving development speed and enhancing the developer experience.

👉 **Modern UI with Tailwind CSS**: Create visually appealing and responsive layouts effortlessly using the utility-first approach of Tailwind CSS, ensuring consistency across various devices and screen sizes.

👉 **Secure User Authentication with Google Auth and JWT**: Provide users with secure login functionality using Google Authentication, while JSON Web Tokens (JWT) ensure secure session management and API interaction.

👉 **Blog Storage and Management with AWS S3**: Easily upload and manage blog images and other media with AWS S3, enabling scalable and secure storage solutions.

👉 **Fully Responsive Design**: Ensure that the blog app provides an optimal viewing experience across different devices, thanks to the responsive design powered by Tailwind CSS.

👉 **Code Architecture and Reusability**: Maintain clean, modular, and reusable code architecture to ensure scalability and ease of maintenance for future enhancements.

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone 
cd iphone-doc
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the project.

## <a name="snippets">🕸️ Snippets</a>

<details>
<summary><code>tailwind.config.js</code></summary>

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      white: '#FFFFFF',
      black: '#242424',
      grey: '#F3F3F3',
      'dark-grey': '#6B6B6B',
      red: '#FF4E4E',
      transparent: 'transparent',
      twitter: '#1DA1F2',
      purple: '#8B46FF',
    },

    fontSize: {
      sm: '12px',
      base: '14px',
      xl: '16px',
      '2xl': '20px',
      '3xl': '28px',
      '4xl': '38px',
      '5xl': '50px',
    },

    extend: {
      fontFamily: {
        inter: ["'Inter'", 'sans-serif'],
        gelasio: ["'Gelasio'", 'serif'],
      },
    },
  },
  plugins: [],
};
```

</details>

<details>

<summary><code>utils/regex.txt</code></summary>

```javascript
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password
```
</details>

<details>
<summary><code>index.css</code></summary>

```css
@import url('https://fonts.googleapis.com/css2?family=Gelasio&family=Inter:wght@400;500&display=swap');
@import '@flaticon/flaticon-uicons/css/all/all';

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  * {
    @apply m-0 p-0 box-border text-base outline-purple/30 duration-100;
  }

  html {
    @apply overflow-x-hidden;
  }

  body {
    @apply font-inter font-normal text-black;
  }

  i {
    @apply mt-0.5;
  }

  section {
    @apply py-4 px-[5vw] md:px-[7vw] lg:px-[10vw];
  }

  ::selection {
    @apply bg-purple/30;
  }

  img {
    @apply w-full h-full object-cover;
  }

  .navbar {
    @apply z-10 sticky top-0 flex items-center gap-12 w-full px-[5vw] py-5 h-[80px] border-b border-grey bg-white;
  }

  .h-cover {
    @apply min-h-[calc(100vh-80px)];
  }

  .center {
    @apply block mx-auto;
  }

  .btn-dark {
    @apply whitespace-nowrap bg-black text-white rounded-full py-3 px-6 text-xl capitalize hover:bg-opacity-80;
  }

  .btn-light {
    @apply btn-dark bg-grey text-black;
  }

  .input-box {
    @apply w-[100%] rounded-md p-4 bg-grey pl-12 border border-grey focus:bg-transparent placeholder:text-black;
  }

  input:disabled,
  input:disabled ~ .input-icon {
    @apply opacity-50;
  }

  .input-icon {
    @apply absolute left-4 top-1/2 -translate-y-1/2;
  }

  .link {
    @apply text-dark-grey hover:text-black hover:bg-grey p-3 px-4 block opacity-75;
  }

  .hide {
    @apply opacity-0 pointer-events-none duration-100;
  }

  .show {
    @apply opacity-100 pointer-events-auto;
  }

  .sidebar-link {
    @apply flex gap-4 items-center py-5 text-dark-grey hover:text-black;
  }

  .sidebar-link.active {
    @apply text-black border-r-2 border-black pl-6 bg-grey/50 -ml-6 md:rounded-tl-lg md:rounded-bl-lg max-md:border-none;
  }

  #textEditor h2,
  h2 {
    @apply font-inter text-4xl leading-normal font-bold max-md:text-3xl max-md:leading-snug !important;
  }

  #textEditor h3,
  h3 {
    @apply font-inter text-3xl leading-loose max-md:text-2xl max-md:leading-normal !important;
  }

  #textEditor *,
  .blog-page-content * {
    @apply font-gelasio text-xl leading-10 md:text-2xl;
  }

  #textEditor a,
  .blog-page-content a {
    @apply text-purple underline hover:opacity-50;
  }

  .tag {
    @apply p-3 bg-grey rounded-full px-6 capitalize;
  }

  .blog-title {
    @apply text-2xl font-medium leading-7 line-clamp-3 sm:line-clamp-2;
  }

  .blog-index {
    @apply text-4xl sm:text-3xl lg:text-5xl font-bold text-grey leading-none;
  }
}

.ce-block__content,
.ce-toolbar__content {
  max-width: 900px;
}

.cdx-settings-button[data-tune='withBorder'],
.cdx-settings-button[data-tune='withBackground'],
.cdx-settings-button[data-tune='stretched'] {
  display: none;
}

```

</details>


<br />
<br />
