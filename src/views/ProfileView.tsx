import { useForm } from "react-hook-form";
import ErrorMessage from "../components/ErrorMessage";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import type { ProfileForm, User } from "../types";
import { updateProfile, uploadImage } from "../api/devTreeAPI";
import { toast } from "sonner";

export default function ProfileView() {
  const queryClient = useQueryClient();

  const data: User = queryClient.getQueryData(["user"])!; //! Fetching user data from the query client

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileForm>({
    defaultValues: {
      handle: data.handle,
      description: data.description,
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onError: (error) => {
      toast.error(error.message || "Error updating profile!"); // Display error message if mutation fails
    },
    onSuccess(data) {
      toast.success(data || "Profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["user"] }); //! Invalidate the user query to refetch updated data
    },
  });

  const uploadImageMutation = useMutation({
    mutationFn: uploadImage,
    onError: (error) => {
      toast.error(error.message || "Error uploading image!"); // Display error message if mutation fails
    },
    onSuccess(data) {
      queryClient.setQueryData(["user"], (prevData: User) => {
        // Update the user data in the cache with the new image URL and avoiding  a complete refetch of the user data by only updating the image field
        return {
          ...prevData,
          image: data,
        };
      });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      uploadImageMutation.mutate(e.target.files[0]);
    }
  };

  const handleUserProfileForm = (formData: ProfileForm) => {
    const user: User = queryClient.getQueryData(["user"])!;
    user.description = formData.description;
    user.handle = formData.handle;
    updateProfileMutation.mutate(user);
  };

  return (
    <form
      className="p-10 space-y-5 bg-white rounded-lg"
      onSubmit={handleSubmit(handleUserProfileForm)}
    >
      <legend className="text-2xl text-center text-slate-800">
        Profile Settings
      </legend>
      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="handle">Handle:</label>
        <input
          type="text"
          className="p-2 border-none rounded-lg bg-slate-100"
          placeholder="Enter your handle or username"
          {...register("handle", {
            required: "Handle is required",
            maxLength: 20,
          })}
        />

        {errors.handle && <ErrorMessage>{errors.handle.message}</ErrorMessage>}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="description">Description:</label>
        <textarea
          className="p-2 border-none rounded-lg bg-slate-100"
          placeholder="Describe yourself"
          {...register("description", {
            required: "Description is required",
            maxLength: 200,
          })}
        />
        {errors.description && (
          <ErrorMessage>{errors.description.message}</ErrorMessage>
        )}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="handle">Image:</label>
        <input
          id="image"
          type="file"
          name="handle"
          className="p-2 border-none rounded-lg bg-slate-100"
          accept="image/*"
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        className="w-full p-2 text-lg font-bold uppercase rounded-lg cursor-pointer bg-cyan-400 text-slate-600"
        value="Save Changes"
      />
    </form>
  );
}
