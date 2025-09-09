import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, ArrowLeft, Tag } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Header from "./Header";
import Footer from "./Footer";
import { getPostBySlug, formatDate } from "../utils/blogUtils";
import "../styles/main.css";
import "../styles/blog.css";

const Post = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const postData = await getPostBySlug(slug);
        if (postData) {
          setPost(postData);
        } else {
          setNotFound(true);
        }
      } catch (error) {
        console.error("Error loading post:", error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="container">
        <Header />
        <div className="post-container">
          <div className="post-article">
            <p
              style={{
                textAlign: "center",
                padding: "60px 0",
                color: "#666666",
              }}
            >
              Loading post...
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (notFound || !post) {
    return (
      <div className="container">
        <Header />
        <div className="post-container">
          <div className="post-article">
            <div style={{ textAlign: "center", padding: "60px 0" }}>
              <h1 style={{ color: "#BB1717", marginBottom: "20px" }}>
                Post Not Found
              </h1>
              <p style={{ color: "#666666", marginBottom: "30px" }}>
                The blog post you're looking for doesn't exist.
              </p>
              <Link to="/blog" className="btn btn-primary">
                <ArrowLeft size={16} />
                Back to Blog
              </Link>
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

      <div className="post-container">
        <article className="post-article">
          <nav className="breadcrumb">
            <Link to="/blog">Blog</Link> / {post.title}
          </nav>

          <h1 className="post-title">{post.title}</h1>

          <div className="post-detail-meta">
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
            <div style={{ marginBottom: "30px" }}>
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="tag"
                  style={{ marginRight: "8px" }}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {post.coverImage && (
            <img
              src={post.coverImage}
              alt={post.title}
              className="hero-image"
            />
          )}

          <div className="markdown-body">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </div>

          <div className="post-footer-nav">
            <Link to="/blog" className="back-link">
              <ArrowLeft size={14} style={{ marginRight: "5px" }} />
              Back to Blog
            </Link>
          </div>
        </article>
      </div>

      <Footer />
    </div>
  );
};

export default Post;
