export default function Contact() {
  return (
    <section className="p-6">
      <h1 className="text-2xl font-semibold text-green-600">Contact</h1>
      <form className="mt-4 space-y-3 max-w-md">
        <input className="border p-2 w-full" placeholder="Your name" />
        <input className="border p-2 w-full" placeholder="Email" />
        <textarea className="border p-2 w-full" placeholder="Message" />
        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Send
        </button>
      </form>
    </section>
  )
}
