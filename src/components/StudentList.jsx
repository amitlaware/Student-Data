import { useEffect, useState } from "react";
import axios from "axios";
import EditForm from "./editForm";

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:4000/getstudent");
      setStudents(res.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/deleteStudent/${id}`);
      setStudents(students.filter(student => student._id !== id)); 
    } catch (error) {
      console.error("Error deleting student:", error);
      alert("Error deleting student. Please try again.");
    }
  };

  const editStudent = (student) => {
    setEditingStudent(student);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Student List</h2>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Age</th>
              <th className="px-4 py-2 border">Roll No</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Password</th>              
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id} className="text-center border-b">
                <td className="px-4 py-2 border">{student.name}</td>                
                <td className="px-4 py-2 border">{student.age}</td>
                <td className="px-4 py-2 border">{student.rollNo}</td>
                <td className="px-4 py-2 border">{student.email}</td>                
                <td className="px-4 py-2 border">{student.password}</td>            
              
                
                <td className="px-4 py-2 border space-x-2">
                  <button 
                    onClick={() => editStudent(student)}
                    className="bg-green-500 text-white px-3 py-1 rounded-lg"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => deleteStudent(student._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingStudent && (
        <EditForm 
          student={editingStudent} 
          onUpdate={fetchStudents} 
          onClose={() => setEditingStudent(null)}
        />
      )}
    </div>
  );
};

export default StudentList;
