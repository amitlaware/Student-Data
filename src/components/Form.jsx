import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:4000/addStudent", data); // Send data to backend
      // alert("Data Submitted Successfully!");
      <div class="alert alert-success" role="alert">
  A simple success alert—check it out!
</div>
      console.log("SignUp successful");

      navigate("/students"); // Redirect to student list
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Error submitting data. Please try again!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="text"
          {...register("name", { required: true })}
          placeholder="Name"
          className="w-full p-2 border rounded-lg"
        />
       
        <input
          type="number"
          {...register("age", { required: true, min: 1 })}
          placeholder="Age"
          className="w-full p-2 border rounded-lg"
        />
        <input
          type="text"
          {...register("rollNo", { required: true })}
          placeholder="Roll Number"
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
          {...register("password", { required: true })}
          placeholder="Password"
          className="w-full p-2 border rounded-lg"
        />
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-lg">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
