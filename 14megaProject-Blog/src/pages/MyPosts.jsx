import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/conf"
import { useSelector } from 'react-redux'
import { Query } from 'appwrite'

function MyPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const userData = useSelector((state) => state.auth.userData)

    useEffect(() => {
        if (userData) {
            setLoading(true)
            appwriteService.getPosts([
                Query.equal("userId", userData.$id),
                Query.orderDesc("$createdAt")
            ])
                .then((posts) => {
                    if (posts) {
                        setPosts(posts.documents)
                    }
                })
                .catch((error) => {
                    console.error("Error fetching posts:", error)
                })
                .finally(() => setLoading(false))
        } else {
            setPosts([])
            setLoading(false)
        }
    }, [userData])

    // ... loading and empty states remain the same ...

    if (loading) {
        return (
            <div className="w-full py-8">
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
    
    if (posts.length === 0) {
        return (
            <div className="w-full py-8">
                <Container>
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">My Posts</h1>
                        <p className="text-gray-600">You haven't created any posts yet.</p>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className="w-full py-8">
            <Container>
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-bold text-gray-900">My Posts</h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <div key={post.$id} className="h-full">
                            <PostCard {...post} userId={post.userId} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default MyPosts