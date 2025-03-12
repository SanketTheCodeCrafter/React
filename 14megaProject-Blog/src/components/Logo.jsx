import React from 'react'

function Logo({width='100px'}) {
  return (
    <div style={{width}} className="overflow-hidden">
      <img 
        src="https://www.inspire-writer.com/blog/wp-content/uploads/2019/03/noframe_256.png" 
        alt="Blog Logo" 
        className="w-full h-auto object-contain max-h-12"
      />
    </div>
  )
}

export default Logo