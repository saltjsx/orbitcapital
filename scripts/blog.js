// Blog functionality: list posts & render single post from markdown

(function () {
  document.addEventListener("DOMContentLoaded", initBlog);

  // Determine context so script works for both /blog.html (root file) and /blog (directory index)
  const BLOG_PAGE_URL = "/blog"; // canonical blog page path (extensionless)
  const path = window.location.pathname;
  const USING_DIRECTORY_INDEX = /\/blog\/?$/.test(path); // e.g. /blog or /blog/
  const USING_ROOT_FILE = /\/blog\.html$/.test(path); // legacy /blog.html

  // Resolve asset paths relative to current page location
  const POSTS_MANIFEST = USING_DIRECTORY_INDEX
    ? "posts.json"
    : "blog/posts.json";
  const MARKDOWN_BASE = USING_DIRECTORY_INDEX ? "posts/" : "blog/posts/";

  function initBlog() {
    // If blog page
    if (isBlogPage()) {
      const urlParams = new URLSearchParams(window.location.search);
      const slug = urlParams.get("post");
      fetchPosts()
        .then((posts) => {
          posts.sort((a, b) => new Date(b.date) - new Date(a.date));
          if (slug) {
            const post = posts.find((p) => p.slug === slug);
            if (post) renderSinglePost(post);
            else renderNotFound();
          } else {
            renderPostsList(posts);
          }
        })
        .catch((err) => {
          console.error("Failed to load posts:", err);
          renderError("Unable to load blog posts at this time.");
        });
    }

    // Load latest posts for homepage if container present
    if (document.getElementById("latestBlogPosts")) {
      fetchPosts()
        .then((posts) => {
          posts.sort((a, b) => new Date(b.date) - new Date(a.date));
          const latest = posts.slice(0, 3);
          renderLatestHome(latest);
        })
        .catch((err) => {
          console.warn("Could not load latest posts for home:", err);
        });
    }
  }

  function isBlogPage() {
    return USING_DIRECTORY_INDEX || USING_ROOT_FILE;
  }

  function fetchPosts() {
    return fetch(POSTS_MANIFEST)
      .then((r) => {
        if (!r.ok) throw new Error(r.status);
        return r.json();
      })
      .then((data) => (Array.isArray(data.posts) ? data.posts : []));
  }

  function renderPostsList(posts) {
    const grid = document.getElementById("postsGrid");
    if (!grid) return;
    grid.innerHTML = "";
    posts.forEach((post) => {
      const card = document.createElement("article");
      card.className = "post-card";
      card.innerHTML = `
        ${
          post.image
            ? `<div class="post-image"><img src="${escapeHtml(
                post.image
              )}" alt="${escapeHtml(
                post.title
              )}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px; margin-bottom: 16px;"></div>`
            : ""
        }
        <div class="post-date">${formatDate(post.date)}</div>
        <h3>${escapeHtml(post.title)}</h3>
        <p>${escapeHtml(post.excerpt || "")}</p>
        ${renderTags(post.tags)}
        <a class="post-link" href="${BLOG_PAGE_URL}?post=${encodeURIComponent(
        post.slug
      )}">Read More →</a>
      `;
      grid.appendChild(card);
    });
  }

  function renderTags(tags) {
    if (!tags || !tags.length) return "";
    return `<div class="post-tags">${tags
      .map((t) => `<span class="post-tag">${escapeHtml(t)}</span>`)
      .join("")}</div>`;
  }

  function renderSinglePost(post) {
    const listView = document.getElementById("blogListView");
    const singleView = document.getElementById("singlePostView");
    if (listView && singleView) {
      listView.classList.add("hidden");
      singleView.classList.remove("hidden");
    }
    document.getElementById("postTitle").textContent = post.title;
    document.title = post.title + " - Orbit Capital Blog";
    document.getElementById("postMeta").textContent = `${formatDate(
      post.date
    )}${post.author ? " • " + post.author : ""}`;
    fetch(`${MARKDOWN_BASE}${post.slug}.md`)
      .then((r) => {
        if (!r.ok) throw new Error("Markdown not found");
        return r.text();
      })
      .then((md) => {
        document.getElementById("postBody").innerHTML = markdownToHtml(md);
        window.scrollTo({ top: 0, behavior: "smooth" });
      })
      .catch((err) => {
        console.error(err);
        document.getElementById("postBody").innerHTML =
          "<p>Unable to load this post.</p>";
      });
  }

  function renderNotFound() {
    const listView = document.getElementById("blogListView");
    const singleView = document.getElementById("singlePostView");
    if (listView && singleView) {
      listView.classList.add("hidden");
      singleView.classList.remove("hidden");
    }
    document.getElementById("postTitle").textContent = "Post Not Found";
    document.getElementById("postBody").innerHTML =
      "<p>The requested blog post could not be found.</p>";
  }

  function renderError(msg) {
    const grid = document.getElementById("postsGrid");
    if (grid) grid.innerHTML = `<p>${escapeHtml(msg)}</p>`;
  }

  function renderLatestHome(posts) {
    const container = document.getElementById("latestBlogPosts");
    if (!container) return;
    container.innerHTML = "";
    posts.forEach((post) => {
      const art = document.createElement("article");
      art.className = "news-item";
      art.innerHTML = `
        ${
          post.image
            ? `<div class="news-image"><img src="${escapeHtml(
                post.image
              )}" alt="${escapeHtml(
                post.title
              )}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 6px; margin-bottom: 12px;"></div>`
            : ""
        }
        <div class="news-date">${formatDate(post.date)}</div>
        <h3>${escapeHtml(post.title)}</h3>
        <p>${escapeHtml(post.excerpt || "")}</p>
        <a href="${BLOG_PAGE_URL}?post=${encodeURIComponent(
        post.slug
      )}" class="read-more">Read More →</a>
      `;
      container.appendChild(art);
    });
  }

  // Simple markdown -> HTML converter (basic subset)
  function markdownToHtml(md) {
    // Escape HTML first
    md = md.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    // Code blocks ```
    md = md.replace(
      /```([\s\S]*?)```/g,
      (m, code) =>
        `<pre><code>${code
          .replace(/\n$/, "")
          .replace(/&lt;/g, "<")
          .replace(/&gt;/g, ">")
          .replace(/&amp;/g, "&")}</code></pre>`
    );

    // Inline code
    md = md.replace(/`([^`]+)`/g, "<code>$1</code>");

    // Headings
    md = md
      .replace(/^###### (.*)$/gm, "<h6>$1</h6>")
      .replace(/^##### (.*)$/gm, "<h5>$1</h5>")
      .replace(/^#### (.*)$/gm, "<h4>$1</h4>")
      .replace(/^### (.*)$/gm, "<h3>$1</h3>")
      .replace(/^## (.*)$/gm, "<h2>$1</h2>")
      .replace(/^# (.*)$/gm, "<h1>$1</h1>");

    // Bold / Italic
    md = md
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/\*([^*]+)\*/g, "<em>$1</em>")
      .replace(/__([^_]+)__/g, "<strong>$1</strong>")
      .replace(/_([^_]+)_/g, "<em>$1</em>");

    // Links [text](url)
    md = md.replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener">$1</a>'
    );

    // Images ![alt](url)
    md = md.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (m, alt, url) => {
      // Only prefix with "blog/" for relative image paths
      if (url.startsWith("images/")) {
        url = "blog/" + url;
      }
      // For external URLs (http/https) or absolute paths, use as-is
      return `<img src="${url}" alt="${alt}" style="max-width: 100%; height: auto;">`;
    });

    // Unordered lists
    md = md.replace(/^(?:- |\* )(.*(?:\n(?:- |\* ).+)*)/gm, (listMatch) => {
      const items = listMatch
        .split(/\n/)
        .map((i) => i.replace(/^(?:- |\* )/, ""))
        .map((i) => `<li>${i}</li>`)
        .join("");
      return `<ul>${items}</ul>`;
    });

    // Ordered lists
    md = md.replace(/^(?:\d+\. )(.*(?:\n(?:\d+\. ).+)*)/gm, (listMatch) => {
      const items = listMatch
        .split(/\n/)
        .map((i) => i.replace(/^\d+\. /, ""))
        .map((i) => `<li>${i}</li>`)
        .join("");
      return `<ol>${items}</ol>`;
    });

    // Blockquotes
    md = md.replace(/^> (.*)$/gm, "<blockquote>$1</blockquote>");

    // Paragraphs (lines that are not HTML tags, headings, list items, blockquotes, code blocks)
    md = md.replace(
      /^(?!<h\d|<ul>|<ol>|<li>|<blockquote>|<pre><code>|<img)([^\n]+)\n?/gm,
      (m, line) => {
        if (!line.trim()) return "";
        return `<p>${line.trim()}</p>`;
      }
    );

    return md;
  }

  function formatDate(dateStr) {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (e) {
      return dateStr;
    }
  }

  function escapeHtml(str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
})();
