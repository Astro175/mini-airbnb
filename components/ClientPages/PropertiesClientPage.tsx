"use client";
import Image from "next/image";
import { useProperties } from "@/hooks/useProperties";
import Link from "next/link";

export default function PropertiesClientPage() {
  const { data: properties } = useProperties();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Link href="/dashboard/properties/new">New Property</Link>
      {properties?.map((property) => (
        
        <div key={property.id} className="border p-4 rounded shadow">
          <Link href={`/dashboard/properties/${property.id}`}>
          <Image
            src={property.image}
            alt={property.title}
            height={160}
            width={160}
            className="w-full h-40 object-cover"
          />
          <h2 className="text-xl font-bold">{property.title}</h2>
          <p>{property.location}</p>
          <p>${property.price} / night</p>
          </Link>
        </div>
        
      ))}
    </div>
  );
}
