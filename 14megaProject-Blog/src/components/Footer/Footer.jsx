import React from 'react'
import Logo from '../Logo'
import { Link } from 'react-router-dom'
import { Container, LogoutBtn } from '../index'


function Footer() {
  return (
    <footer className="py-6 bg-white border-t border-gray-200">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <Logo width="40px" />
            <span className="text-xl font-semibold text-gray-800">BlogSpace</span>
          </div>
          
          <div className="flex flex-col items-center md:items-end space-y-2">
            <div className="flex space-x-4">
              <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                Terms
              </Link>
              <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                Privacy
              </Link>
              <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                About
              </Link>
            </div>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} BlogSpace. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer