import { useParams } from 'react-router-dom'

export default function User() {
  const { id } = useParams()
  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold">User Profile</h2>
      <p className="mt-2 text-gray-600">User ID: {id}</p>
    </div>
  )
}
