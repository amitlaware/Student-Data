import { useForm } from "react-hook-form";
import { useEffect } from "react";
import axios from "axios";

const EditForm = ({ student, onUpdate, onClose }) => {
  const { register, handleSubmit, setValue } = useForm();

  
  useEffect(() => {
    setValue("name", student.name);
    setValue("age", student.age);
    setValue("rollno", student.rollno);
    setValue("email", student.email);
    setValue("password", student.password);
  }, [student, setValue]);

  const onSubmit = async (data) => {
    try {
      await axios.put(`http://localhost:4000/updateStudent/${student._id}`, data);
      alert("Student updated successfully!");
    //   onUpdate(); 
    //   onClose();  
    } catch (error) {
      console.error("Error updating student:", error);
      alert("Error updating student. Please try again.");
    }
  };

  return (
    <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-center mb-4">Edit Student</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="text"
          {...register("name", { required: true })}
          placeholder="Name"
          className="w-full p-2 border rounded-lg"
        />
        <input
          type="number"
        placeholder="Age"
          className="w-full p-2 border rounded-lg"
        />
        <input
          type="text"
          {...register("name", { required: true })}
          placeholder="Name"
          className="w-full p-2 border rounded-lg"
        />
        <input
          type="email"
          {...register("email", { required: true })}
          placeholder="Email"
          className="w-full p-2 border rounded-lg"
        />
        <input
          type="password"
          {...register("passoword", { required: true })}
          placeholder="Password"
          className="w-full p-2 border rounded-lg"
        />
        <div className="flex justify-between">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Update
          </button>
          <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded-lg">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditForm;
