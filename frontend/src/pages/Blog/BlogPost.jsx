import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import firebase from "../../config/firebase";
// import { getDatabase, ref, onValue, push, remove } from 'firebase/database';
import { useParams } from "react-router-dom";
import { FaPaw } from 'react-icons/fa';


const BlogPost = () => {
  const [blogPost, setBlogPost] = useState([]);

  // console.log('is it running')

  const { postNum } = useParams();

  // console.log(postNum, 'yes')

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

      const result = allBlogPosts.filter((post) => {
        if (post.name.urlLink === postNum) {
          return true;
        } else {
          return false;
        }
      });

      setBlogPost(result[0].name);
    });
  }, [postNum]);

  return (
    <section className="post">
        <div className="wrapper">

          <div className="post--container">


            <div className="post--content">
              <Link className="btn btn-back" to={`/blog/blog_list`} aria-label="Move to Blog Posts Page">All posts</Link>
              <h2 className="post--title-main">{blogPost.title}</h2>
              <div className="post-paw">
                <FaPaw />
              </div>
              <h3 className="post--title-sub"><span>Category: {blogPost.category}</span></h3>
              <h3 className="post--title-sub">Author: {blogPost.name}</h3>
              <div className="post--text">
                <p dangerouslySetInnerHTML={{
                    __html: blogPost.content
                      ? blogPost.content.replace(/\n/g, "<br />")
                      : null,
                  }}
                />
              </div>
            </div>

 
        </div>
      </div>
    </section>
  );
};

export default BlogPost;
