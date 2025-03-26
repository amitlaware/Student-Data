import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SignupForm from "./components/Form";
import StudentList from "./components/StudentList";

const App = () => {
  return (
    <Router>
      <div className="p-4">
        <nav className="mb-4 flex justify-center space-x-4">
          <Link to="/" className="text-blue-600 font-semibold">Sign Up</Link>
          <Link to="/students" className="text-blue-600 font-semibold">Students Details</Link>
        </nav>
        
        <Routes>
          <Route path="/" element={<SignupForm />} />
          <Route path="/students" element={<StudentList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
