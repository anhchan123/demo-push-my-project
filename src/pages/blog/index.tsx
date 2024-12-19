import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/common/footer";
import Header from "../../components/common/header";
import { TitleHelmet } from "../../components/common/title-helmet";
import BlogDetailsService from "../../services/BlogDetailsService";

import breadcrumbBg from "../../assets/img/breadcrumb-bg.jpg";
import calendarIcon from "../../assets/img/icon/calendar.png";

const BlogPage = () => {
  const [blogList, setBlogList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogData = async () => {
    setLoading(true);
    try {
      const data = await BlogDetailsService.getAllBlogDetails();
      setBlogList(data); // Update the blog list state
    } catch (error) {
      setError("Failed to load blog data. Please try again later.");
      console.error("Error fetching blog data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  return (
    <>
      <TitleHelmet title="Blog" />
      <Header />

      <section
        className="breadcrumb-blog set-bg"
        style={{
          backgroundImage: `url(${breadcrumbBg})`,
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h2>Our Blog</h2>
            </div>
          </div>
        </div>
      </section>

      <section className="blog spad">
        <div className="container">
          <div className="row">
            {loading && <p>Loading blog posts...</p>}
            {error && <p className="error-message">{error}</p>}
            {!loading && !error && blogList.length === 0 && (
              <p>No blog posts found.</p>
            )}

            {blogList.map((blog) => (
              <div className="col-lg-4 col-md-6 col-sm-6" key={blog.id}>
                <Link to={`/blog-details/${blog.id}`}>
                  <div className="blog__item">
                    <div
                      className="blog__item__pic set-bg"
                      style={{
                        backgroundImage: `url(${blog.image || breadcrumbBg})`, // Fallback image if none is provided
                      }}
                    />
                    <div className="blog__item__text">
                      <span>
                        <img src={calendarIcon} alt="calendar" />{" "}
                        {new Date(blog.createdAt).toLocaleDateString()}
                      </span>
                      <h5>{blog.title}</h5>
                      <p>Read More</p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default BlogPage;
