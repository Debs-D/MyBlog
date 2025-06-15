"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { savePost } from "../storage";
import { Post } from "../types/post";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  author: z.string().min(1, "Author is required"),
  image: z.string().url("Image must be a valid URL").optional(),
});

type FormData = z.infer<typeof schema>;

export default function CreatePostPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  const onSubmit = (data: FormData) => {
    const newPost: Post = {
      ...data,
      date: new Date().toISOString().split("T")[0],
      slug: data.title.toLowerCase().replace(/ /g, "-"),
    };
    savePost(newPost);
    router.push("/");
  };

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg mt-10">
      <h1 className="text-3xl font-bold text-indigo-600 mb-6 text-center">
        ✨ Create New Post
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <input
            type="text"
            placeholder="Post Title"
            {...register("title")}
            className="w-full px-4 py-2 border rounded"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>
        <div>
          <textarea
            placeholder="Post Content"
            {...register("content")}
            className="w-full px-4 py-3 border rounded h-40"
          />
          {errors.content && (
            <p className="text-red-500 text-sm">{errors.content.message}</p>
          )}
        </div>
        <div>
          <input
            type="text"
            placeholder="Author Name"
            {...register("author")}
            className="w-full px-4 py-2 border rounded"
          />
          {errors.author && (
            <p className="text-red-500 text-sm">{errors.author.message}</p>
          )}
        </div>
        <div>
          <input
            type="url"
            placeholder="Image URL (optional)"
            {...register("image")}
            className="w-full px-4 py-2 border rounded"
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded shadow hover:bg-indigo-700"
          >
            ✅ Submit Post
          </button>
        </div>
      </form>
    </div>
  );
}
