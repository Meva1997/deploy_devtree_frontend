import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import type { RegisterForm } from "../types";
import ErrorMessage from "../components/ErrorMessage";
import api from "../config/axios";

export default function RegisterView() {
  const location = useLocation();
  const initialValues: RegisterForm = {
    name: "",
    email: "",
    handle: location?.state?.handle || "",
    password: "",
    password_confirmation: "",
  };
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues: initialValues });

  const navigate = useNavigate();

  const password = watch("password");

  const handleRegister = async (formData: RegisterForm) => {
    try {
      const { data } = await api.post(`/auth/register`, formData);
      toast.success(data);
      reset(); // Reset the form after successful registration
      setTimeout(() => {
        navigate("/auth/login"); // Redirect to login page after successful registration
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
      <h1 className="text-4xl font-bold text-white">Create Account</h1>
      <form
        onSubmit={handleSubmit(handleRegister)}
        className="px-5 py-20 mt-10 space-y-10 bg-white rounded-lg"
      >
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="name" className="text-2xl text-slate-500">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Name"
            className="p-3 border-none rounded-lg bg-slate-100 placeholder-slate-400"
            {...register("name", {
              required: "Name is required",
            })}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="email" className="text-2xl text-slate-500">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Registration Email"
            className="p-3 border-none rounded-lg bg-slate-100 placeholder-slate-400"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="handle" className="text-2xl text-slate-500">
            Handle
          </label>
          <input
            id="handle"
            type="text"
            placeholder="Username: no spaces"
            className="p-3 border-none rounded-lg bg-slate-100 placeholder-slate-400"
            {...register("handle", {
              required: "Handle is required",
            })}
          />
          {errors.handle && (
            <ErrorMessage>{errors.handle.message}</ErrorMessage>
          )}
        </div>
        <div className="grid grid-cols-1 space-y-3">
          <label htmlFor="password" className="text-2xl text-slate-500">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            className="p-3 border-none rounded-lg bg-slate-100 placeholder-slate-400"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <div className="grid grid-cols-1 space-y-3">
          <label
            htmlFor="password_confirmation"
            className="text-2xl text-slate-500"
          >
            Repeat Password
          </label>
          <input
            id="password_confirmation"
            type="password"
            placeholder="Repeat Password"
            className="p-3 border-none rounded-lg bg-slate-100 placeholder-slate-400"
            {...register("password_confirmation", {
              required: "Password confirmation is required",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          {errors.password_confirmation && (
            <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          className="w-full p-3 text-lg font-bold uppercase rounded-lg cursor-pointer bg-cyan-400 text-slate-600"
          value="Create Account"
        />
      </form>
      <nav className="mt-10">
        <NavLink
          to="/auth/login"
          className="block text-lg text-center text-white"
        >
          Already have an account? Log in
        </NavLink>
      </nav>
    </>
  );
}
