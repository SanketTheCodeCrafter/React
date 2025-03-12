import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/conf";

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        appwriteService.getPosts([])
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                }
            })
            .catch((error) => {
                console.error("Error fetching posts:", error)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    if (loading) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                <div className="animate-pulse space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="bg-gray-200 rounded-xl h-72"></div>
                            ))}
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='py-8'>
            <Container>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
                    {posts.map((post) => (
                        <div key={post.$id} className="h-full">
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts