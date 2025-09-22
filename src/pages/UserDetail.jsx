// src/components/UserDetail.jsx
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../customhooks/useFetch";

export default function UserDetail() {
  const { id } = useParams();
  const { data: user, error, loading} = useFetch(`https://jsonplaceholder.typicode.com/users/${id}`)

  if (loading) return <p className="p-4">Loading user…</p>;
  if (!user) return <p className="p-4">User not found</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
      <p className="text-gray-700">📧 {user.email}</p>
      <p className="text-gray-700">📱 {user.phone}</p>
      <p className="text-gray-700">🏢 {user.company.name}</p>

      <Link to="/users" className="inline-block mt-4 text-blue-600">
        ← Back to Users
      </Link>
    </div>
  );
}
