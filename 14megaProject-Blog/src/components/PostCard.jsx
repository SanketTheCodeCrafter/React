import React from 'react'
import {Link} from 'react-router-dom'
import appwriteService from '../appwrite/conf'

function PostCard({$id, title, featuredImage}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className='bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full'>
            <div className='relative pt-[75%] overflow-hidden bg-gray-100'>
                <img 
                src={appwriteService.getFilePreview(featuredImage)} 
                alt={title} 
                className='absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105'
                loading="lazy" 
                />
            </div>
            <div className='p-4'>
          <h2 className='text-xl font-semibold text-gray-800 line-clamp-2 hover:text-blue-600 transition-colors'>
            {title}
          </h2>
        </div>
        </div>
    </Link>
  )
}

export default PostCard