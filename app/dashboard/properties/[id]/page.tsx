"use client";

import { useProperty } from "@/hooks/useProperty";
import { useState, useEffect } from "react";
import { useUpdateProperty } from "@/hooks/useUpdateProperty";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function PropertyDetails({
  params,
}: {
  params: { id: number };
}) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: property, isLoading } = useProperty(params.id);
  const { mutate, isPending } = useUpdateProperty();
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: 0,
    image: "",
    description: "",
  });

  useEffect(() => {
    if (property) {
      setFormData({
        title: property.title,
        location: property.location,
        price: property.price,
        image: property.image,
        description: property.description,
      });
    }
  }, [property]);

  if (isLoading) return <p>Loading...</p>;
  function handleUpdate() {
    mutate(
      { id: params.id, updatedProperty: formData },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["properties"] });
          router.push("/dashboard/properties");
        },
      }
    );
  }

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded shadow space-y-4">
      <h2 className="text-xl font-bold">Edit Property</h2>

      <input
        className="w-full border p-2 rounded"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="Title"
      />

      <input
        className="w-full border p-2 rounded"
        value={formData.location}
        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
        placeholder="Location"
      />

      <input
        type="number"
        className="w-full border p-2 rounded"
        value={formData.price}
        onChange={(e) =>
          setFormData({ ...formData, price: Number(e.target.value) })
        }
        placeholder="Price"
      />

      <input
        className="w-full border p-2 rounded"
        value={formData.image}
        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
        placeholder="Image URL"
      />

      <textarea
        className="w-full border p-2 rounded"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
        placeholder="Description"
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={handleUpdate}
      >
        {isPending ? "Updating" : "Update"}
      </button>
    </div>
  );
}
