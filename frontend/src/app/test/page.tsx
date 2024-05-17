"use client"
import { ChangeEvent, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function NewPost() {
  const [file, setFile] = useState<File | null>(null)
  const [caption, setCaption] = useState("")
  const router = useRouter()

  const submit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!file) {
      return
    }

    const formData = new FormData();
    formData.append("image", file)
    formData.append("caption", caption)
    await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/images`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    router.push("/")
  }

  const fileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFile(file)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <form onSubmit={submit} style={{ width: 650 }} className="flex flex-col space-y-5 px-5 py-14">
        <input onChange={fileSelected} type="file" accept="image/*"></input>
        <input value={caption} onChange={e => setCaption(e.target.value)} type="text" placeholder='Caption'></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}