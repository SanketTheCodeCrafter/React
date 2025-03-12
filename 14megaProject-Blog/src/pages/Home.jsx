import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import appwriteService from "../appwrite/conf"
import { Container, PostCard } from '../components'
import { useSelector } from 'react-redux'
import { Query } from 'appwrite'

function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {
        setLoading(true)
        // Fetch all active posts
        appwriteService.getPosts([Query.equal("status", "active")])
            .then((posts) => {
                if (posts) {
                    setPosts(posts.documents)
                }
            })
            .catch((error) => {
                console.error("Error fetching posts:", error)
            })
            .finally(() => setLoading(false))
    }, [])

    useEffect(() => {
        if (authStatus) {
            setLoading(true)
            appwriteService.getPosts()
                .then((post) => {
                    if (post) {
                        setPosts(post.documents)
                    }
                })
                .catch((error) => {
                    console.error("Error fetching posts:", error)
                })
                .finally(() => {
                    setLoading(false)
                })
        } else {
            setPosts([])
            setLoading(false)
        }
    }, [authStatus])

    if (loading) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <h1 className="text-2xl font-bold">Loading...</h1>
                </Container>
            </div>
        )
    }

    if (!authStatus) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
                <div className="container mx-auto px-4 py-12 sm:py-16 md:py-20">
                    <div className="text-center space-y-6 sm:space-y-8">
                        {/* Hero Section */}
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 animate-fade-in px-4">
                            Welcome to <span className="text-blue-600">BlogSpace</span>
                        </h1>
                        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up delay-200 px-4">
                            Join our community of writers and readers. Share your stories, ideas, and expertise with the world.
                        </p>
                        
                        {/* Features Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-12 sm:mt-16 px-4 animate-fade-in-up delay-300">
                            {/* Feature 1 */}
                            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                                <div className="text-blue-600 mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-12 sm:w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg sm:text-xl font-semibold mb-2">Share Your Stories</h3>
                                <p className="text-gray-600 text-sm sm:text-base">Create and share your unique perspectives with our engaged community.</p>
                            </div>
    
                            {/* Feature 2 */}
                            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                                <div className="text-blue-600 mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-12 sm:w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <h3 className="text-lg sm:text-xl font-semibold mb-2">Discover Content</h3>
                                <p className="text-gray-600 text-sm sm:text-base">Explore diverse perspectives and insightful stories from writers worldwide.</p>
                            </div>
    
                            {/* Feature 3 */}
                            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                                <div className="text-blue-600 mb-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 sm:h-12 sm:w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                                    </svg>
                                </div>
                                <h3 className="text-lg sm:text-xl font-semibold mb-2">Engage & Connect</h3>
                                <p className="text-gray-600 text-sm sm:text-base">Join discussions and connect with fellow writers and readers.</p>
                            </div>
                        </div>
    
                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 mt-12 animate-fade-in-up delay-400 px-4">
                            <Link
                                to="/signup"
                                className="w-full sm:w-auto px-8 py-3 text-base sm:text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-200 text-center"
                            >
                                Get Started
                            </Link>
                            <Link
                                to="/login"
                                className="w-full sm:w-auto px-8 py-3 text-base sm:text-lg font-semibold text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-200 text-center"
                            >
                                Sign In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4">
                <Container>
                    <div className="flex flex-wrap justify-center">
                        <div className="p-2 w-full text-center">
                            <h1 className="text-2xl font-bold text-gray-800 hover:text-gray-600 transition-colors duration-200">
                                No posts available
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    
    return (
        <div className="w-full py-8">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <div key={post.$id}>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home