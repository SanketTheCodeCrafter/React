import React from 'react'
import {Link} from 'react-router-dom'
import appwriteService from '../appwrite/conf'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function PostCard({$id, title, featuredImage, userId}) {
    const navigate = useNavigate()
    const userData = useSelector((state) => state.auth.userData)
    const isAuthor = userData && userData.$id === userId

    const handleDelete = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        if(window.confirm('Are you sure you want to delete this post?')) {
            try {
                const status = await appwriteService.deletePost($id)
                if(status) {
                    await appwriteService.deleteFile(featuredImage)
                    // Force refresh posts list
                    window.location.reload()
                }
            } catch (error) {
                console.error("Error deleting post:", error)
            }
        }
    }

    return (
        <div className='bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full relative group'>
            <Link to={`/post/${$id}`} className="block">
                <div className='relative pt-[75%] overflow-hidden bg-gray-100'>
                    {featuredImage ? (
                        <img 
                            src={appwriteService.getFilePreview(featuredImage)} 
                            alt={title} 
                            className='absolute inset-0 w-full h-full object-cover'
                            loading="lazy"
                            onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Found';
                            }} 
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                            <span className="text-gray-400">No image available</span>
                        </div>
                    )}
                </div>
                <div className='p-4'>
                    <h2 className='text-xl font-semibold text-gray-800 line-clamp-2 hover:text-blue-600 transition-colors'>
                        {title}
                    </h2>
                </div>
            </Link>
            {isAuthor && (
                <div className='absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-200'>
                    <Link 
                        to={`/edit-post/${$id}`}
                        onClick={(e) => e.stopPropagation()}
                        className='bg-white hover:bg-green-500 text-green-500 hover:text-white p-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg'
                    >
                        <span className="font-medium">Edit</span>
                    </Link>
                    <button
                        onClick={handleDelete}
                        className='bg-white hover:bg-red-500 text-red-500 hover:text-white p-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg'
                    >
                        <span className="font-medium">Delete</span>
                    </button>
                </div>
            )}
        </div>
    )
}

export default PostCard