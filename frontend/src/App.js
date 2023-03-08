import logo from './logo.svg';
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./store";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register"
import Home from "./components/Home/Home"
import PostDetail from './components/Posts/PostDetail'
import CreatePost from './components/Posts/CreatePost'
import CreateSubribbit from './components/Subribbit/CreateSubribbit';
import SubribbitList from './components/Subribbit/SubribbitList';
import Subribbit from './components/Subribbit/Subribbit';
import User from './components/User/User'
import ExplorePage from './components/Home/ExplorePage';
import SendResetPasswordEmail from './components/ResetPassword/SendResetPasswordEmail';
import ResetPassword from './components/ResetPassword/ResetPassword';
import Layout from './components/Layout'


function App() {
  return (
    <Provider store={store}>

      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/community" element={<SubribbitList />} />
          <Route path="/home" element={<Home />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/community/:sub" element={<Subribbit />} />
          <Route path="/post/:id" element={<PostDetail />} />
          <Route path="/createPost" element={<CreatePost />} />
          <Route path="/user/:username" element={<User />} />
          <Route path="/createSubribbit" element={<CreateSubribbit />} />
          <Route path="/subribbits" element={<SubribbitList />} />
          <Route path="/sendResetPasswordEmail" element={<SendResetPasswordEmail />} />
          <Route path="/resetPassword/:token" element={<ResetPassword />} />

          <Route path="/landingPage/*" element={<Layout />} />

        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
