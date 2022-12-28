import { useState, useEffect } from "react";
import firebase from "../../config/firebase";
import BackButton from '../../components/BackButton'


const NewPostPage = () => {
  const [nameInput, setNameInput] = useState("");
  const [titleInput, setTitleInput] = useState("");
  const [categoryInput, setCategoryInput] = useState("General Interest");
  const [blogContentInput, setBlogContentInput] = useState("");

  const [blogPosts, setBlogPosts] = useState([]);

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

  // HandleSubmit for the form
  const handleSubmit = (event) => {
    event.preventDefault();

    // Firebase Code
    const blogRef = firebase.database().ref();

    const blogPostInfo = blogRef;

    blogPostInfo.push({
      name: nameInput,
      title: titleInput,
      category: categoryInput,
      content: blogContentInput,
      urlLink: `post${blogPosts.length + 1}`,
    });

    setNameInput("");
    setTitleInput("");
    setCategoryInput("");
    setBlogContentInput("");


    // history.push(`/blog/blog_list/post${blogPosts.length + 1}`)
    window.location.assign(`/blog/blog_list/post${blogPosts.length + 1}`)

  };

  return (
    <section className="new-blog-post">
      <div className="wrapper">
        <div className="new-blog-post--container">

                      <BackButton url='/blog' />


          <div className="new-blog-post--form form">
            <form action="submit" onSubmit={handleSubmit}>
              <h2 className="new-blog-post--title-main">Create a New Post</h2>
              <h3 className="new-blog-post--title-sub">If you have a fun story, interesting experience, training tip, or anything dog related, feel free to share it with us by creating a new post in the form below.</h3>

              <div className="form-group">
                <label htmlFor="name"></label>
                <input
                  type="text"
                  onChange={(event) => {
                    setNameInput(event.target.value);
                  }}
                  value={nameInput}
                  placeholder="Name"
                  required
                  className="form-control"
                ></input>
              </div>

              <div className="form-group">
                <label htmlFor="blogPostTitle"></label>
                <input
                  type="text"
                  onChange={(event) => {
                    setTitleInput(event.target.value);
                  }}
                  value={titleInput}
                  placeholder="BLOG Post Title"
                  className="form-control"
                  required
                ></input>
              </div>

              <div className="form-group">
                <label htmlFor="blogPostCategory" className="srOnly"></label>
                <select
                  name="blogPostCategory"
                  onChange={(event) => {
                    setCategoryInput(event.target.value);
                  }}
                  value={categoryInput}
                  className="form-control"
                >
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

              <div className="form-group">
                <label htmlFor="blogPostContent"></label>
                <textarea
                  type="text"
                  cols="40"
                  rows="20"
                  onChange={(event) => {
                    setBlogContentInput(event.target.value);
                  }}
                  value={blogContentInput}
                  placeholder="Tell us your story!"
                  required
                  className="form-control"
                ></textarea>
              </div>

              <button className="btn btn-block" type="submit">Post your story!</button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default NewPostPage;
