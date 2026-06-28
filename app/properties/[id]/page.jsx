import { redirect } from "next/navigation";
// app\properties\[id]\page.jsx
const properties = [
  { id: 1, title: "Property 1" },
  { id: 2, title: "Property 2" },
];

export default async function PropertyDetails({ params }) {

    const { id } = await params;

    const property = properties.find(
        p => p.id === Number(id)
    );

    if (!property) {
        redirect("/pagenotfound");
    }

    return (
        <div>
            <h1>{property.title}</h1>
        </div>
    );
}