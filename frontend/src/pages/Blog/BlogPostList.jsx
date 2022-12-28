import { useState, useEffect } from "react";
import firebase from "../../config/firebase";
import { Link } from "react-router-dom";
import { FaPaw } from 'react-icons/fa';


const BlogPostList = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  const [categoryInput, setCategoryInput] = useState("");

  const [userSearchInput, setUserSearchInput] = useState("");
  // const [breedSearchResult, setBreedSearchResult] = useState();
  // const [displayBreedInfo, setDisplayBreedInfo] = useState();
  const [allPostInfo, setAllPostInfo] = useState();

  const handleSearch = (event, userSearchInput) => {
    event.preventDefault();
   

    // console.log(allPostInfo);

    const searchResultPosts = allPostInfo.filter((post)=>{
      return (post.name.category.includes(userSearchInput) || post.name.content.includes(userSearchInput) || post.name.name.includes(userSearchInput) || post.name.title.includes(userSearchInput)) 
    })

    // console.log(searchResultPosts)


setBlogPosts(searchResultPosts);
    // setBreedSearchResult(response);
    // setDisplayBreedInfo(true);
  };

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

      setAllPostInfo(allBlogPosts);
    });
  }, []);

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

      setBlogPosts(allBlogPosts);
    });
  }, []);

  return (
    <section className="blog-posts wrapper">

        <div className="all-blog-posts--container">
          
          <div className="all-blog-posts--header">
            <h2 className="all-blog-posts--title-main">Blog Posts</h2>


            {/* <h2 className="all-blog-posts--title-sub">Search/Filter Posts</h2> */}

              <p>Search through all blog posts below either by selecting a <strong>Category</strong> from the drop down menu, or entering a <strong>Keyword</strong> in the search bar.</p>

              <Link to={`/blog/new_post`} aria-label="Move to Blog Post Form Page" className="btn-blog-new-post"><span>create</span> new post</Link>


              <div className="all-blog-posts--search-container">

                <div className="all-blog-posts--search-category">
                  <div className="form-group">
                    <label htmlFor="blogPostCategory" className="srOnly form-control">Search by <strong>Category</strong>:</label>
                    <select
                      name="blogPostCategory"
                      onChange={(event) => {
                        setCategoryInput(event.target.value);
                      }}
                      value={categoryInput}
                      className="categorySelectMenu">
                      <option value="">All Categories</option>
                      <option value="General Interest">General Interest</option>
                      <option value="Training Tools">Training Tools</option>
                      <option value="Training Tips">Training Tips</option>
                      <option value="Problem Behaviour">Problem Behaviour</option>
                      <option value="Breeds">Breeds</option>
                      <option value="Puppies">Puppies</option>
                      <option value="Strange Stories">Strange Stories</option>
                      <option value="Success Stories">Success Stories</option>
                      <option value="Fun Stories">Fun Stories</option>
                    </select>
                  </div>
                </div>

                  <div className="all-blog-posts--search-keyword">
                    <form onSubmit={(event) => { 
                      handleSearch(event, userSearchInput);
                      }}
                      action="search">

                      <div className="form-group">
                        <label htmlFor="searchBar">Search by <strong>Keyword</strong>:</label>
                        <input
                          onChange={(event) => {
                          setUserSearchInput(event.target.value);
                          }}
                          value={userSearchInput}
                          className="form-control"
                          type="text"
                          name="searchBar"
                          id="searchBar"
                          placeholder="Search"
                          required
                          />
                      </div>
                    <button type="submit" className="btn">Search</button>
                    </form>
                  </div>

                </div>

          </div>

            <div className="blog-post--container">
              <ul className="blog-post--cards">
                {blogPosts
                  .filter((post) => {
                    return post.name.category.includes(categoryInput);
                  })
                  .map((post) => {
                    return (
                      <Link to={`/blog/blog_list/${post.name.urlLink}`}>
                        <li key={post.key} className="blog-preview-cards">

                          <div className="blog-preview-card">
                                <div className="blog-preview-card--content">
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
                                </div>

                                <div className="card-btn">
                                  <Link to={`/blog/blog_list/${post.name.urlLink}`} key={post.key}>
                                    <button className="blog-preview-card--btn">View Post</button>
                                  </Link>
                                </div>
                          </div>

                        </li>
                      </Link>
                    );
                  })}
              </ul>

            </div>
          </div>

        </section>

  );
};

export default BlogPostList;
