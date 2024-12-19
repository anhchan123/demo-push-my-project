import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../../components/common/footer";
import Header from "../../../components/common/header";
import { TitleHelmet } from "../../../components/common/title-helmet";
import BlogDetailsService from "../../../services/BlogDetailsService";

interface IBlog {
  id: string;
  title: string;
  author: string;
  createdAt: any;
  image: string;
  content: string;
}

const BlogDetailsPage: React.FC = () => {
  const { id } = useParams(); // Get the blog ID from the URL
  const [blog, setBlog] = useState<IBlog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlogDetails = async () => {
    setLoading(true);
    try {
      const data: IBlog[] = await BlogDetailsService.getAllBlogDetails();
      const blogDetail = data.find((item) => item.id === id);
      if (blogDetail) {
        setBlog(blogDetail);
      } else {
        setError("Blog not found.");
      }
    } catch (error) {
      console.error("Error fetching blog details:", error);
      setError("Failed to load blog details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchBlogDetails();
  }, [id]);

  if (loading) return <p>Loading blog details...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <>
      <TitleHelmet title="Blog Details" />
      <Header />

      <section className="blog-hero spad">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-9 text-center">
              <div className="blog__hero__text">
                <h2>{blog?.title}</h2>
                <ul>
                  <li>By {blog?.author || "Admin"}</li>
                  <li>{new Date(blog?.createdAt).toLocaleDateString()}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="blog-details spad">
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-12">
              <div className="blog__details__pic">
                <img src={blog?.image} alt={blog?.title} />
              </div>
            </div>
            <div className="col-lg-8">
              <div className="blog__details__content">
                <div className="blog__details__text">
                  <p>{blog?.content}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default BlogDetailsPage;
