
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom'; // Correct import
import { ToastContainer } from 'react-toastify';
import PrivateRoute from './components/PrivateRoute';
import RoleBasedRoute from './components/RoleBasedRoute';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';
import { useAuth } from './context/authContext'; // Import useAuth
import './index.css';
import AddQuizQuestionFormPage from './pages/AddQuizQuestionFormPage';
import AdminPage from './pages/AdminPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Settings from './pages/Settings';
import Unauthorized from './pages/Unauthorized';
import Loader from './components/Loader';
import AllVideosPage from './pages/videos/AllVideosPage';
import VideoPlayerPage from './pages/videos/VideoPlayerPage';
import StudentDashboard from './components/StudentDashboard';
import ArticleReadingPage from './pages/articles/ArticleReadingPage';
import ArticlesList from './pages/articles/ArticlesList';
import RecommendedQuizzes from './pages/quiz/RecommendedQuizzes';
import QuizTakingPage from './pages/quiz/QuizTakingPage';
import ProfileManagementPage from './pages/ProfileManagementPage';
import AdminQuizUploadPage from './pages/quiz/admin/AdminQuizUploadPage';
import QuizListingPage from './pages/quiz/admin/QuizListingPage';
import AdminQuizEditPage from './pages/quiz/admin/AdminQuizEditPage';
import VideoUploadPage from './pages/videos/admin/VideoUploadPage';
import VideoListingPage from './pages/quiz/admin/VideoListingPage';

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
          <Route path="/home/*" element={<PrivateRoute element={<StudentDashboard />} />} />
          <Route path="/videos/" element={<PrivateRoute element={<AllVideosPage />} />} />
          <Route path="/videos/:id" element={<PrivateRoute element={<VideoPlayerPage />} />} />
          <Route path="/account/*" element={<PrivateRoute element={<ProfileManagementPage />} />} />
          <Route path="/articles" element={<PrivateRoute element={<ArticlesList />} />} />
          <Route path="/articles/:id" element={<PrivateRoute element={<ArticleReadingPage />} />} />
          <Route path="/quizes" element={<PrivateRoute element={<RecommendedQuizzes />} />} />
          <Route path="/quizes/:id" element={<PrivateRoute element={<QuizTakingPage />} />} />
          
          

          {/* <Route path="/admin/*" element={<RoleBasedRoute element={<AdminPage />} requiredRole="admin" />} /> */}
          <Route path="/admin/quiz-list" element={<PrivateRoute element={<QuizListingPage />} />} />
          <Route path="/admin/quiz-create" element={<PrivateRoute element={<AdminQuizUploadPage />} />} />
          <Route path="/admin/quiz-edit/:id" element={<PrivateRoute element={<AdminQuizEditPage />} />} />
          <Route path="/admin/quiz-results" element={<PrivateRoute element={<AdminQuizUploadPage />} />} />
          <Route path="/admin/video-list" element={<PrivateRoute element={<VideoListingPage />} />} />
          <Route path="/admin/video-upload" element={<PrivateRoute element={<VideoUploadPage />} />} />
          
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
