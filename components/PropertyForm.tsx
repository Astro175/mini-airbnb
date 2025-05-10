"use client";
import { useState } from "react";
import { useCreateProperty } from "@/hooks/useCreateProperty";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type formDetails = {
  title: string;
  location: string;
  price: number;
  image: string;
  description: string;
};

export default function PropertyForm() {
  const { mutate, isPending } = useCreateProperty();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [form, setForm] = useState<formDetails>({
    title: "",
    location: "",
    price: 0,
    image: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    form.price = Number(form.price);
    mutate(form, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["properties"] });
        router.push("/dashboard/properties");
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto space-y-4 bg-white p-6 rounded shadow"
    >
      <h2 className="text-xl font-semibold">Create New Property</h2>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        name="location"
        placeholder="Location"
        value={form.location}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <input
        type="text"
        name="image"
        placeholder="Image URL"
        value={form.image}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <textarea
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        {!isPending ? "Create Property" : "Loading"}
      </button>
    </form>
  );
}
