import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Calendar, ArrowRight, Tag } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import { getAllPosts, formatDate, getExcerpt } from "../utils/blogUtils";
import "../styles/main.css";
import "../styles/blog.css";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const allPosts = await getAllPosts();
        setPosts(allPosts);
      } catch (error) {
        console.error("Error loading posts:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (loading) {
    return (
      <div className="container">
        <Header />
        <div className="blog-container">
          <div className="page-header">
            <div className="page-header-content">
              <h1 className="blog-title">Loading...</h1>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="container">
      <Header />

      <div className="blog-container">
        <div className="page-header">
          <div className="page-header-content">
            <h1 className="blog-title">INSIGHTS & ANALYSIS</h1>
            <p className="blog-intro">
              Strategic perspectives on technology investments, market trends,
              and industry analysis from the Orbit Capital team.
            </p>
          </div>
        </div>

        {posts.length === 0 ? (
          <div
            style={{ textAlign: "center", padding: "60px 0", color: "#666666" }}
          >
            <p style={{ fontSize: "18px", marginBottom: "10px" }}>
              No blog posts available yet.
            </p>
            <p style={{ fontSize: "14px" }}>
              Check back soon for insights and analysis.
            </p>
          </div>
        ) : (
          <div className="posts-grid">
            {posts.map((post) => (
              <article key={post.slug} className="post-card">
                {post.coverImage && (
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="post-cover"
                  />
                )}

                <div className="post-meta">
                  <Calendar size={12} />
                  <span>{formatDate(post.date)}</span>
                  {post.author && (
                    <>
                      <span className="dot">•</span>
                      <span>{post.author}</span>
                    </>
                  )}
                </div>

                {post.tags && post.tags.length > 0 && (
                  <div style={{ marginBottom: "15px" }}>
                    {post.tags.map((tag, index) => (
                      <span key={index} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <h2 className="post-heading">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>

                <p className="post-summary">
                  {post.summary || getExcerpt(post.content)}
                </p>

                <Link to={`/blog/${post.slug}`} className="read-more">
                  Read More
                  <ArrowRight size={14} />
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
