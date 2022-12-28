import { useState, useEffect } from "react";
import firebase from '../../config/firebase';
import { Link } from "react-router-dom";
import { FaPaw } from 'react-icons/fa';

const BlogMainPage = () => {
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    const blogRef = firebase.database().ref();

    blogRef.on("value", (response) => {
      const blogPostInfo = response.val();

      const allBlogPosts = [];

      for (let key in blogPostInfo) {
        allBlogPosts.unshift({
          key: key,
          name: blogPostInfo[key],
        });
      }

      const mostRecentPosts = allBlogPosts.slice(0, 3);

      setRecentPosts(mostRecentPosts);
    });
  }, []);

  return (
      <section>
        <div className="wrapper">
          <div className="blog-main">
            <h1 className="blog-title">The Dog Blog</h1>


            
            <div className="blog-posts-container">

              <div className="recent-posts-container">
                <h2 className="blog-title--sub">Recently Posted Stories</h2>
                
                <ul className="blog-recent-posts">
                  {recentPosts.map((post, idx) => {
                    return (

                          <div key={post.key} className="blog-preview-card">

                            <li  className="blog-preview-card--content">
                              <div className="blog-preview-card--paw">
                                <FaPaw />
                              </div>

                              <h3 className="blog-preview-card--title">{post.name.title}</h3>
                              
                              <h4 className="blog-preview-card--category">
                                <strong>Category:</strong> {post.name.category}
                              </h4>

                              <h4 className="blog-preview-card--author">
                                <strong>Author:</strong> {post.name.name}
                              </h4>
                            </li>

                            <div className="card-btn">
                              <Link to={`/blog/blog_list/${post.name.urlLink}`} key={post.key}>
                                <button className="blog-preview-card--btn">View Post</button>
                              </Link>
                            </div>



                          </div>

                    );
                  })}
                </ul>

                  <div className="blog-buttons">
                    <Link to={`/blog/blog_list`} aria-label="Move to Blog Posts Page" className="btn-blog"><span>view</span> all posts</Link>
                    <Link to={`/blog/new_post`} aria-label="Move to Blog Post Form Page" className="btn-blog"><span>create</span> new post</Link>
                  </div>

              </div>



            </div>

          </div>
        </div>
      </section>

  );
};

export default BlogMainPage;
