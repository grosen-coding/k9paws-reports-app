import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NewReport from "./pages/NewReport";
import Reports from "./pages/Reports";
import Report from "./pages/Report";
import MainReportsPage from "./pages/MainReportsPage";
import BlogMainPage from "./pages/Blog/BlogMainPage";
import BlogPostList from "./pages/Blog/BlogPostList";
import BlogPost from "./pages/Blog/BlogPost";
import NewPostPage from "./pages/Blog/NewPostPage";
import BreedSearch from "./pages/BreedSearch";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Router>
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reports" element={<MainReportsPage />} />
          <Route path="/blog" element={<BlogMainPage />} />
          <Route exact path="/blog/blog_list" element={<BlogPostList />} />
          <Route exact path="/blog/blog_list/:postNum" element={<BlogPost />} />
          <Route exact path="/blog/new_post" element={<NewPostPage />} />
          <Route path="/breed" element={<BreedSearch />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reports/new-report" element={<PrivateRoute />}>
            <Route path="/reports/new-report" element={<NewReport />} />
          </Route>
          <Route path="/reports/current-reports" element={<PrivateRoute />}>
            <Route path="/reports/current-reports" element={<Reports />} />
          </Route>
          <Route path="/report/:reportId" element={<PrivateRoute />}>
            <Route path="/report/:reportId" element={<Report />} />
          </Route>
        </Routes>

        <Footer />
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
