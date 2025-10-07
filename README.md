# NODAYSIDLE Journal

![Deploy Jekyll site to Pages](https://github.com/salvadalba/nodaysidle-blog/actions/workflows/jekyll.yml/badge.svg)

This repository contains the source code and articles for the official NODAYSIDLE technical journal. The site is built with Jekyll and deployed automatically via GitHub Actions.

### **[View the live blog here &rarr;](https://salvadalba.github.io/nodaysidle-blog/)**

---

## How to Create a New Post

This is the simple workflow for publishing a new article.

### 1. Create a New File

All posts must be created inside the `_posts` folder. The filename must follow this exact format:

`YYYY-MM-DD-your-title-in-lowercase.md`

**Example:**
`_posts/2025-10-08-os-optimization.md`

### 2. Add the Front Matter

At the very top of your new file, you must include a "front matter" block. This is the configuration for the post.

**Required Front Matter:**
```yaml
---
layout: post
title: "Your Awesome Post Title Here"
---
