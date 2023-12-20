"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

export interface Task {
  Id: string
  Title: string
  Description: string
  Status: string
}

const Task = () => {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  const getTasks = async () => {
    setLoading(true)
    const res = await fetch("/api/task")

    if (res.ok) {
      const data = await res.json()
      setTasks(data)
    }

    setLoading(false)
  }

  useEffect(() => {
    getTasks()
  }, [])

  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/task/${id}`, {
      method: "DELETE",
    })

    if (res.ok) {
      getTasks()
    } else {
      alert("Something went wrong. Please try again later.")
    }
  }

  const handleGenerate = async () => {
    const res = await fetch(`/api/task/seed`)

    if (res.ok) {
      getTasks()
    } else {
      alert("Something went wrong. Please try again later.")
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">All Task</h1>
        <div className="flex gap-2">
          {(!loading && tasks.length === 0) && (
            <button className="bg-blue-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded" onClick={handleGenerate}>
              Generate Tasks
            </button>
          )}
          <Link href="/form">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add Task
            </button>
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full mt-4">
          <thead>
            <tr>
              <th className="pl-2 pr-4 text-left py-2 min-w-[8rem]">Title</th>
              <th className="pl-2 pr-4 text-left py-2">Description</th>
              <th className="pl-2 pr-4 text-left py-2 min-w-[8rem]">Status</th>
              <th className="pl-2 pr-4 text-left py-2 w-[6rem]">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4}>Loading...</td>
              </tr>
            ) : (
              tasks.length > 0 ? (
                tasks.map((task: Task, index) => (
                  <tr key={index}>
                    <td className="border px-4 py-2">{task.Title}</td>
                    <td className="border px-4 py-2">{task.Description}</td>
                    <td className="border px-4 py-2">{task.Status}</td>
                    <td className="border px-4 py-2">
                      <Link href={`/form?id=${task.Id}`}>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          Edit
                        </button>
                      </Link>
                      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded my-2" onClick={() => handleDelete(task.Id)}>
                        Delete
                      </button>
                      <Link href={`/${task.Id}`}>
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                          View
                        </button>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4}>No data</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Task