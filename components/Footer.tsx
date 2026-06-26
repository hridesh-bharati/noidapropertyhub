import Link from 'next/link'

export default function Footer() {
  return (
    <div className="bg-gray-900 text-gray-400 pt-5 mt-5">
      <div className="container mx-auto py-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Get In Touch */}
          <div>
            <h5 className="text-white mb-4 text-lg font-semibold">Get In Touch</h5>
            <p className="mb-2">
              <i className="fa fa-map-marker-alt me-3"></i>
              123 Street, New York, USA
            </p>
            <p className="mb-2">
              <i className="fa fa-phone-alt me-3"></i>
              +012 345 67890
            </p>
            <p className="mb-2">
              <i className="fa fa-envelope me-3"></i>
              info@example.com
            </p>
            <div className="flex pt-2 space-x-2">
              <a href="#" className="w-10 h-10 border border-gray-500 rounded-full flex items-center justify-center hover:bg-primary hover:border-primary transition-all">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="w-10 h-10 border border-gray-500 rounded-full flex items-center justify-center hover:bg-primary hover:border-primary transition-all">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="w-10 h-10 border border-gray-500 rounded-full flex items-center justify-center hover:bg-primary hover:border-primary transition-all">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="#" className="w-10 h-10 border border-gray-500 rounded-full flex items-center justify-center hover:bg-primary hover:border-primary transition-all">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="text-white mb-4 text-lg font-semibold">Quick Links</h5>
            <div className="flex flex-col space-y-2">
              <Link href="/about" className="text-gray-400 hover:text-white transition-all">
                About Us
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-all">
                Contact Us
              </Link>
              <Link href="/services" className="text-gray-400 hover:text-white transition-all">
                Our Services
              </Link>
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-all">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-all">
                Terms & Condition
              </Link>
            </div>
          </div>

          {/* Photo Gallery */}
          <div>
            <h5 className="text-white mb-4 text-lg font-semibold">Photo Gallery</h5>
            <div className="grid grid-cols-3 gap-2 pt-2">
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <div key={num}>
                  <img 
                    className="w-full h-20 object-cover rounded bg-gray-800 p-1" 
                    src={`/img/property-${num}.jpg`} 
                    alt={`Property ${num}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h5 className="text-white mb-4 text-lg font-semibold">Newsletter</h5>
            <p>Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
            <div className="relative mt-3" style={{ maxWidth: '400px' }}>
              <input 
                className="w-full py-3 ps-4 pe-5 bg-transparent border border-gray-500 rounded text-white" 
                type="text" 
                placeholder="Your email"
              />
              <button 
                type="button" 
                className="btn-primary py-2 absolute top-1 right-1"
              >
                SignUp
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700">
        <div className="container mx-auto py-4">
          <div className="flex flex-wrap justify-between items-center">
            <div className="w-full md:w-1/2 text-center md:text-start mb-3 md:mb-0">
              &copy; <a className="text-gray-400 hover:text-white" href="#">Your Site Name</a>, All Right Reserved.
              <br />
              Designed By <a className="text-gray-400 hover:text-white" href="https://htmlcodex.com">HTML Codex</a>
              <br />
              Distributed By <a className="text-gray-400 hover:text-white" href="https://themewagon.com" target="_blank">ThemeWagon</a>
            </div>
            <div className="w-full md:w-1/2 text-center md:text-end">
              <div className="space-x-4">
                <Link href="/" className="text-gray-400 hover:text-white transition-all">Home</Link>
                <Link href="/cookies" className="text-gray-400 hover:text-white transition-all">Cookies</Link>
                <Link href="/help" className="text-gray-400 hover:text-white transition-all">Help</Link>
                <Link href="/faqs" className="text-gray-400 hover:text-white transition-all">FQAs</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}