
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResponsiveLayout from './components/ResponsiveLayout';
import PrivateRoute from './components/PrivateRoute';
import Notifications from './components/Notifications';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Tasks from './pages/Tasks';
import Teams from './pages/Teams';
import Reports from './pages/Reports';
import Files from './pages/Files';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import PasswordReset from './pages/PasswordReset';




function App() {
  return (
    <Provider store={store}>
      <Router>
        <Notifications />
        <ResponsiveLayout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<PasswordReset />} />
            <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/projects" element={<PrivateRoute><Projects /></PrivateRoute>} />
            <Route path="/tasks" element={<PrivateRoute><Tasks /></PrivateRoute>} />
            <Route path="/teams" element={<PrivateRoute><Teams /></PrivateRoute>} />
            <Route path="/reports" element={<PrivateRoute><Reports /></PrivateRoute>} />
            <Route path="/files" element={<PrivateRoute><Files /></PrivateRoute>} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ResponsiveLayout>
      </Router>
    </Provider>
  );
}

export default App;
