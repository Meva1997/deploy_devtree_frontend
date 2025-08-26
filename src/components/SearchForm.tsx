import { useForm } from "react-hook-form";
import slugify from "react-slugify";
import ErrorMessage from "./ErrorMessage";
import { useMutation } from "@tanstack/react-query";
import { searchByHandle } from "../api/devTreeAPI";
import LoadingHandle from "./LoadingHandle";
import { Link } from "react-router-dom";

export default function SearchForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      handle: "",
    },
  });

  const mutation = useMutation({
    mutationFn: searchByHandle,
  });

  const handle = watch("handle");

  const handleSearch = () => {
    const slug = slugify(handle);
    mutation.mutate(slug);
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleSearch)} className="space-y-5">
        <div className="relative flex items-center px-2 bg-white">
          <label htmlFor="handle">devtree.com/</label>
          <input
            type="text"
            id="handle"
            className="flex-1 p-2 bg-transparent border-none focus:ring-0"
            placeholder="elonmusk, zuckerberg, jeffbezos"
            {...register("handle", {
              required: "Un Nombre de Usuario es obligatorio",
            })}
          />
        </div>
        {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}

        <div className="mt-10">
          {mutation.isPending && <LoadingHandle />}
          {mutation.error && (
            <p className="font-black text-center text-red-600">
              {mutation.error.message}
            </p>
          )}
          {mutation.data && (
            <p className="font-black text-center text-cyan-500">
              {mutation.data}, go to{" "}
              <Link to={"/auth/register"} state={{ handle: slugify(handle) }}>
                {" "}
                <span className="transition-all text-lime-500 hover:underline underline-offset-2 ">
                  Registration form
                </span>{" "}
              </Link>{" "}
            </p>
          )}
        </div>

        <input
          type="submit"
          className="w-full p-3 text-lg font-bold uppercase rounded-lg cursor-pointer bg-cyan-400 text-slate-600"
          value="Get Started - It's Free"
        />
      </form>
    </>
  );
}
