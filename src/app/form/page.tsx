"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const Form = () => {
  const searchParams = useSearchParams()
  const Id = searchParams.get("id")
  const router = useRouter()

  const [form, setForm] = useState({
    Id: "",
    Title: "",
    Description: "",
    Status: "", // To Do, In Progress, Done
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (Id) {
      handleUpdate()
    } else {
      handleCreate()
    }
  }

  const handleCreate = async () => {
    const data = {
      ...form,
    }

    const response = await fetch("/api/task", {
      method: "POST",
      body: JSON.stringify(data),
    })

    if (response.ok) {
      router.push("/")
    } else {
      alert("Something went wrong. Please try again later.")
    }
  }

  const handleUpdate = async () => {
    const data = {
      ...form,
    }

    const response = await fetch(`/api/task/${Id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })

    if (response.ok) {
      router.push("/")
    } else {
      alert("Something went wrong. Please try again later.")
    }
  }

  const getData = async () => {
    const response = await fetch(`/api/task/${Id}`)

    if (response.ok) {
      const data = await response.json()
      setForm(data)
    } else {
      alert("Task not found.")
      router.push("/")
    }
  }

  useEffect(() => {
    if (Id) {
      getData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
          Title
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
          id="title"
          type="text"
          name="Title"
          placeholder="Title"
          value={form.Title}
          onChange={handleChange}
          required={true}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
          id="description"
          name="Description"
          placeholder="Description"
          value={form.Description}
          onChange={handleChange}
          rows={4}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Status
        </label>
        <div className="flex items-center">
          <input
            className="mr-2 leading-tight"
            type="radio"
            name="Status"
            value="To Do"
            checked={form.Status === "To Do"}
            onChange={handleChange}
            id="to-do"
            required={true}
          />
          <label className="block text-gray-700 text-sm" htmlFor="to-do">
            To Do
          </label>
        </div>
        <div className="flex items-center">
          <input
            className="mr-2 leading-tight"
            type="radio"
            name="Status"
            value="In Progress"
            checked={form.Status === "In Progress"}
            onChange={handleChange}
            id="in-progress"
            required={true}
          />
          <label className="block text-gray-700 text-sm" htmlFor="in-progress">
            In Progress
          </label>
        </div>
        <div className="flex items-center">
          <input
            className="mr-2 leading-tight"
            type="radio"
            name="Status"
            value="Done"
            checked={form.Status === "Done"}
            onChange={handleChange}
            id="done"
            required={true}
          />
          <label className="block text-gray-700 text-sm" htmlFor="done">
            Done
          </label>
        </div>
      </div>
      <div className="flex items-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  )
}

export default Form