import Link from "next/link";
// app\pagenotfound\page.jsx
export default function PageNotFound() {
    return (
        <main className="min-h-screen flex items-center justify-center">
            <div className="text-center">

                <h1 className="text-5xl font-bold">
                    404
                </h1>

                <p className="mt-3">
                    Property not found.
                </p>

                <Link
                    href="/properties"
                    className="mt-5 inline-block px-5 py-3 bg-black text-white rounded-lg"
                >
                    Back To Properties
                </Link>

            </div>
        </main>
    );
}