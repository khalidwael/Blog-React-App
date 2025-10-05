import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faFacebook, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      
      
      <div className="footer p-10 max-w-7xl mx-auto border-b border-gray-700 grid grid-cols-1 md:grid-cols-4 gap-8">
        
       
        <aside className="space-y-4">
          <div className="flex items-center text-2xl font-bold text-blue-400">
            
             <span className="text-3xl mr-2">📝</span> Jotter
          </div>
          <p className="text-sm text-gray-400">
            Jotter is your daily companion for discovering inspiring stories and publishing your unique ideas.
          </p>
          
        </aside>

        
        <nav className="space-y-3">
          <h6 className="footer-title text-lg font-bold text-white mb-3 border-b border-blue-500 pb-1">Quick Links</h6> 
          <a className="link link-hover text-gray-400 hover:text-blue-300">Home</a>
          <a className="link link-hover text-gray-400 hover:text-blue-300">All Posts</a>
          <a className="link link-hover text-gray-400 hover:text-blue-300">Trending</a>
          <a className="link link-hover text-gray-400 hover:text-blue-300">Topics</a>
        </nav>
        
        
        <nav className="space-y-3">
          <h6 className="footer-title text-lg font-bold text-white mb-3 border-b border-blue-500 pb-1">Support</h6> 
          <a className="link link-hover text-gray-400 hover:text-blue-300">Contact Us</a>
          <a className="link link-hover text-gray-400 hover:text-blue-300">FAQ</a>
          <a className="link link-hover text-gray-400 hover:text-blue-300">Privacy Policy</a>
          <a className="link link-hover text-gray-400 hover:text-blue-300">Terms of Use</a>
        </nav>

        
        <nav className="space-y-3">
          <h6 className="footer-title text-lg font-bold text-white mb-3 border-b border-blue-500 pb-1">Contact</h6> 
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4 text-blue-400" />
            <span>support@jotter.com</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <FontAwesomeIcon icon={faPhone} className="w-4 h-4 text-blue-400" />
            <span>+201100101762</span>
          </div>
          <p className="text-sm text-gray-400 pt-2">
            123 Cairo, Helioublies, CA 90001
          </p>
        </nav>
      </div>

     
      <div className='footer footer-center p-4 bg-gray-800 text-gray-500'>
        <aside>
          <p className="text-sm">© 2025 Jotter, Inc. All rights reserved.</p>
        </aside>
      </div>
    </footer>
  )
}