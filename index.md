---
layout: default
---
<div class="container">
    <div class="page-header">
        <h1>The Journal</h1>
        <p>A collection of technical articles, project logs, and insights on building resilient hardware and software systems.</p>
    </div>

    <div class="post-list">
        {%- for post in site.posts -%}
        <article class="post-list-item">
            <p class="post-meta">
                <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %d, %Y" }}</time>
            </p>
            <h2><a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a></h2>
            <p class="post-excerpt">{{ post.excerpt }}</p>
        </article>
        {%- endfor -%}
    </div>
</div>
```*   Click **`Commit new file`**.

---

### Step 6: Create the Build Workflow File

This is the final, crucial step that tells GitHub Actions how to build the site.

1.  Click **`Add file`** -> **`Create new file`**.
2.  File name: **`.github/workflows/jekyll.yml`**
3.  Paste this code:

```yaml
name: Deploy Jekyll site to Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.1'
          bundler-cache: true
      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v5
      - name: Build with Jekyll
        run: bundle exec jekyll build --baseurl "${{ steps.pages.outputs.base_path }}"
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
