import { useState, useEffect } from "react";
import useFetch from "../customhooks/useFetch";
import { Link } from "react-router";

export default function UsersList() {
    const {data:users,loading,error} = useFetch('https://jsonplaceholder.typicode.com/users')

    if (loading) return <p>Loading users…</p>;

    return (
      <div className="p-4">
      <h2 className="text-xl font-bold mb-3">Users</h2>
      <ul className="space-y-2">
        {users.map((user) => (
          <li
            key={user.id}
            className="border p-3 rounded hover:bg-gray-100 transition"
          >
            <Link to={`/users/${user.id}`} className="text-blue-600 font-medium">
              {user.name}
            </Link>
            <p className="text-gray-500 text-sm">{user.email}</p>
          </li>
        ))}
      </ul>
    </div>
    );
}