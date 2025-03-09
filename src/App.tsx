
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'; // Correct import
import { ToastContainer } from 'react-toastify';
import PrivateRoute from './components/PrivateRoute';
import RoleBasedRoute from './components/RoleBasedRoute';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';
import { useAuth } from './context/authContext'; // Import useAuth
import './index.css';
import AddQuizQuestionFormPage from './pages/AddQuizQuestionFormPage';
import AdminPage from './pages/AdminPage';
import ArticleDetail from './pages/articles/ArticleDetail';
import Home from './pages/Home';
import Login from './pages/Login';
import Quiz from './pages/quiz/Quiz';
import Register from './pages/Register';
import Settings from './pages/Settings';
import Unauthorized from './pages/Unauthorized';
import Video from './pages/videos/Video';
import Loader from './components/Loader';

function App() {

  const {globalLoading, globalLoadingText} = useAuth();
  return (
    <>
      <ToastContainer />
      {globalLoading && <Loader text={globalLoadingText}/>}
      <Router>
        <Routes>
          {/* Define all your routes within the <Routes> component */}

          {/* Public route for login with a check for unauthenticated users */}
          <Route path="/login" element={<UnauthenticatedRoute element={<Login />} />} />
          <Route path="/register" element={<UnauthenticatedRoute element={<Register />} />} />
          
          {/* Private Route for Home */}
          <Route path="/quiz/new/*" element={<PrivateRoute element={<AddQuizQuestionFormPage />} />} />
          <Route path="/home/*" element={<PrivateRoute element={<Home />} />} />
          <Route path="/videos/*" element={<PrivateRoute element={<Video />} />} />
          <Route path="/settings/*" element={<PrivateRoute element={<Settings />} />} />
          <Route path="/article/:id" element={<PrivateRoute element={<ArticleDetail />} />} />
          <Route path="/quiz" element={<PrivateRoute element={<Quiz />} />} />
          
          

          <Route path="/admin/*" element={<RoleBasedRoute element={<AdminPage />} requiredRole="admin" />} />
          
          {/* Unauthorized route */}
          <Route path="/unauthorized" element={<Unauthorized />} />
          
          {/* Redirect to home */}
          <Route path="/" element={<Navigate to="/home" />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
