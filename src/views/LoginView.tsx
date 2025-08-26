import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import ErrorMessage from "../components/ErrorMessage";
import type { LoginForm } from "../types";
import { isAxiosError } from "axios";
import api from "../config/axios";

export default function LoginView() {
  const initialValues: LoginForm = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const navigate = useNavigate();

  const handleLogin = async (formData: LoginForm) => {
    try {
      const { data } = await api.post(`/auth/login`, formData);
      localStorage.setItem("AUTH_TOKEN", data); // Store the token in local storage
      toast.success("Login successful");
      setTimeout(() => {
        navigate("/admin"); // Redirect to home page after successful login
      }, 1000);
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        const errorMessage = error.response?.data?.error || "An error occurred";
        toast.error(errorMessage);
      }
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold text-white">Sign In</h1>
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="px-5 py-20 mt-10 space-y-10 bg-white rounded-lg"
        noValidate
      >
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="email" className="text-2xl text-slate-500">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Your Email"
            className="p-3 border-none rounded-lg bg-slate-100 placeholder-slate-400"
            {...register("email", {
              required: "The email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Please enter a valid email address",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="password" className="text-2xl text-slate-500">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Your Password"
            className="p-3 border-none rounded-lg bg-slate-100 placeholder-slate-400"
            {...register("password", {
              required: "The password is required",
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          className="w-full p-3 text-lg font-bold uppercase rounded-lg cursor-pointer bg-cyan-400 text-slate-600"
          value="Login"
        />
      </form>
      <nav className="mt-10">
        <NavLink
          to="/auth/register"
          className="block text-lg text-center text-white"
        >
          Don't have an account? Register
        </NavLink>
      </nav>
    </>
  );
}
