# 🔗 Brev.ly – URL Shortener

Welcome to **Brev.ly** – your modern, full-stack URL shortener! 🚀

This project was developed as part of Rocketseat's Posgraduate first semester challenge, aiming to solidify skills in FullStack development, encompassing Frontend, Backend, and DevOps.

---

## 📌 Project Overview

**Brev.ly** allows users to:

- 🔗 Shorten long URLs
- 📋 List all shortUrl links
- ❌ Delete unwanted links
- 📈 Generate access reports for each link
- 🔁 Redirect shortUrl URLs to their originalUrl destinations

---

## 🛠️ Technologies Used

### Web

- **React** with **Vite**
- **TypeScript**
- **Tailwind CSS**
- **Tanstack Router**

### Server

- **Node.js** with **Fastify**
- **TypeScript**
- **Drizzle ORM**
- **PostgreSQL**

---

## How to run

```bash
pnpm i
cd server
pnpm run docker:generate
pnpm run docker:up
pnpm run db:migrate
cd ..
cd web
pnpm run dev
```
