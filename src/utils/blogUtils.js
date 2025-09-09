// Blog utilities for parsing markdown posts

// Parse frontmatter from markdown content
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);

  if (!match) {
    return { frontmatter: {}, content };
  }

  const frontmatterString = match[1];
  const markdownContent = match[2];

  // Parse YAML-like frontmatter
  const frontmatter = {};
  const lines = frontmatterString.split("\n");

  lines.forEach((line) => {
    if (line.trim()) {
      const colonIndex = line.indexOf(":");
      if (colonIndex > 0) {
        const key = line.substring(0, colonIndex).trim();
        let value = line.substring(colonIndex + 1).trim();

        // Handle arrays (tags)
        if (value.startsWith("[") && value.endsWith("]")) {
          value = value
            .slice(1, -1)
            .split(",")
            .map((item) => item.trim().replace(/['"]/g, ""));
        } else {
          // Remove quotes
          value = value.replace(/^['"]|['"]$/g, "");
        }

        frontmatter[key] = value;
      }
    }
  });

  return { frontmatter, content: markdownContent };
}

// Get all blog posts
export async function getAllPosts() {
  try {
    // Import all markdown files from the posts directory
    const postModules = import.meta.glob("/src/posts/*.md", { as: "raw" });

    const posts = await Promise.all(
      Object.entries(postModules).map(async ([path, importFn]) => {
        const content = await importFn();
        const { frontmatter, content: markdownContent } =
          parseFrontmatter(content);

        // Extract filename for slug if not in frontmatter
        const filename = path.split("/").pop().replace(".md", "");
        const slug = frontmatter.slug || filename;

        return {
          slug,
          ...frontmatter,
          content: markdownContent,
          // Parse date
          date: frontmatter.date ? new Date(frontmatter.date) : new Date(),
        };
      })
    );

    // Sort posts by date (newest first)
    return posts.sort((a, b) => b.date - a.date);
  } catch (error) {
    console.error("Error loading posts:", error);
    return [];
  }
}

// Get a single post by slug
export async function getPostBySlug(slug) {
  try {
    const posts = await getAllPosts();
    return posts.find((post) => post.slug === slug);
  } catch (error) {
    console.error("Error loading post:", error);
    return null;
  }
}

// Get latest posts for home page
export async function getLatestPosts(limit = 3) {
  try {
    const posts = await getAllPosts();
    return posts.slice(0, limit);
  } catch (error) {
    console.error("Error loading latest posts:", error);
    return [];
  }
}

// Format date for display
export function formatDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

// Get excerpt from content
export function getExcerpt(content, length = 150) {
  // Remove markdown formatting for excerpt
  const plainText = content
    .replace(/#{1,6}\s+/g, "") // Remove headers
    .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold
    .replace(/\*(.*?)\*/g, "$1") // Remove italic
    .replace(/\[(.*?)\]\(.*?\)/g, "$1") // Remove links
    .replace(/`(.*?)`/g, "$1") // Remove inline code
    .replace(/\n/g, " ") // Replace newlines with spaces
    .trim();

  if (plainText.length <= length) {
    return plainText;
  }

  return plainText.substring(0, length).trim() + "...";
}
