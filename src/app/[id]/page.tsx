"use client"

import { Task } from "@prisma/client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FC, useEffect, useState } from "react"

interface Props {
  params: {
    id: string
  }
}

const TaskDetail: FC<Props> = ({ params: { id } }) => {
  const router = useRouter()

  const [data, setData] = useState<Task>()
  const [loading, setLoading] = useState(true)

  const getData = async () => {
    setLoading(true)
    const response = await fetch(`/api/task/${id}`)

    if (response.ok) {
      const data = await response.json()
      setData(data)
    } else {
      alert("Task not found.")
      router.push("/")
    }
    setLoading(false)
  }

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) return <div>Loading...</div>
  if (!loading && !data) return <div>Task not found.</div>

  return (
    <div className="space-y-4">
      <div>
        <label className="text-lg font-bold">Title</label>
        <p>{data?.Title}</p>
      </div>
      <div>
        <label className="text-lg font-bold">Description</label>
        <p>{data?.Description}</p>
      </div>
      <div>
        <label className="text-lg font-bold">Status</label>
        <p>{data?.Status}</p>
      </div>
      <div>
        <label className="text-lg font-bold">Created At</label>
        <p>{data && new Date(data.updatedAt).toLocaleString()}</p>
      </div>
      <div>
        <label className="text-lg font-bold">Updated At</label>
        <p>{data && new Date(data.updatedAt).toLocaleString()}</p>
      </div>
      <Link href={`/form?id=${data?.Id}`} className="block" >
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Edit
        </button>
      </Link>
    </div>
  )
}

export default TaskDetail