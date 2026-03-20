import React, { useState, useEffect } from 'react'
import axios from "axios"


const Feed = () => {

    const [posts, setPosts] = useState([
        {
            _id: "1",
            image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
            caption: "Beautiful scenery",
        }
    ])

    useEffect(() => {

        axios.get("http://localhost:3000/posts")
            .then((res) => {

                setPosts(res.data.posts)

            })

    }, [])


    return (
        <section className="max-w-2xl mx-auto p-4 space-y-8">
            {posts.length > 0 ? (
                posts.map((post) => (
                    <div key={post._id} className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                        <div className="aspect-square w-full bg-gray-100">
                            <img 
                                src={post.image} 
                                alt={post.caption} 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-4">
                            <p className="text-gray-800 text-sm leading-relaxed">
                                {post.caption}
                            </p>
                        </div>
                    </div>
                ))
            ) : (
                <h1 className="text-center text-2xl font-semibold mt-10 text-gray-600">No posts available</h1>
            )}
        </section>
    )
}

export default Feed
