import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/conf";
import { Button, Container } from "../components";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { slug } = useParams();
    const navigate = useNavigate();
    
    // Get user data from Redux store
    const userData = useSelector((state) => state.auth.userData);

    useEffect(() => {
        // Fetch post by ID instead of slug for better reliability
        if (slug) {
            setLoading(true);
            appwriteService.getPost(slug)
                .then(async (post) => {
                    if (post) {
                        setPost(post);
                        // Fetch author details
                        try {
                            const author = await appwriteService.getUser(post.userid);
                            setAuthor(author);
                        } catch (error) {
                            console.error("Error fetching author:", error);
                        }
                    } else {
                        navigate("/");
                    }
                })
                .catch((error) => {
                    console.error("Error fetching post:", error);
                    navigate("/");
                })
                .finally(() => setLoading(false));
        }
    }, [slug, navigate]);

    // Check if current user is the author
    const isAuthor = post && userData?.$id === post.userid;

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            try {
                const status = await appwriteService.deletePost(post.$id);
                if (status) {
                    await appwriteService.deleteFile(post.featuredImage);
                    navigate("/");
                }
            } catch (error) {
                console.error("Error deleting post:", error);
            }
        }
    };

    if (loading) {
        return (
            <div className="w-full py-8">
                <Container>
                    <div className="flex flex-col items-center">
                        <div className="w-full max-w-4xl animate-pulse">
                            <div className="w-full h-72 bg-gray-200 rounded-xl mb-6"></div>
                            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return post ? (
        <div className="w-full py-8">
            <Container>
                <article className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="relative">
                        {post.featuredImage && (
                            <img 
                                src={appwriteService.getFilePreview(post.featuredImage)}
                                alt={post.title}
                                className="w-full h-[28rem] object-cover"
                                loading="lazy"
                            />
                        )}
                        
                        {isAuthor && (
                            <div className="absolute top-4 right-4 flex gap-3 z-10">
                                <Link 
                                    to={`/edit-post/${post.$id}`}
                                    className="bg-white hover:bg-green-500 text-green-500 hover:text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                                >
                                    Edit Post
                                </Link>
                                <button 
                                    onClick={handleDelete}
                                    className="bg-white hover:bg-red-500 text-red-500 hover:text-white px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="px-6 lg:px-8 py-8">
                        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                            {post.title}
                        </h1>
                        
                        <div className="flex items-center mb-8 pb-6 border-b border-gray-100">
                            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white">
                                {userData?.name?.charAt(0)?.toUpperCase() || 'A'}
                            </div>
                            <div className="ml-4">
                                <p className="text-base font-semibold text-gray-900">
                                    {userData?.name || 'Anonymous'}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {new Date(post.$createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>

                        <div className="prose max-w-none">
                            <div 
                                className="text-gray-700 text-lg leading-relaxed space-y-4"
                                dangerouslySetInnerHTML={{ __html: post.content || '' }}
                            />
                        </div>
                    </div>
                </article>
            </Container>
        </div>
    ) : null;
}