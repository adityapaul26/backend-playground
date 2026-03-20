import React from 'react'
import { Link } from 'react-router-dom'
import axios from "axios"
import { useNavigate } from "react-router-dom"

const CreatePost = () => {

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()


        const formData = new FormData(e.target)

        axios.post("http://localhost:3000/create-post", formData)
            .then((res) => {

                navigate("/feed")

            })
            .catch((err) => {
                console.log(err)
                alert("Error creating post")
            })


    }


    return (
        <section className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 relative">
                <Link to="/" className="absolute top-6 left-6 text-sm text-blue-600 hover:underline">← Feed</Link>
                <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Create New Post</h2>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">Select Image</label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 border border-gray-300 rounded-md cursor-pointer"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">Caption</label>
                        <input
                            type="text"
                            name="caption"
                            placeholder="Write a caption..."
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200 shadow-sm mt-2"
                    >
                        Submit Post
                    </button>
                </form>
            </div>
        </section>
    )
}

export default CreatePost
