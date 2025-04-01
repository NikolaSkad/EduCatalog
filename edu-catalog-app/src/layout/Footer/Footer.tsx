import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content">
      {/* Top Section */}
      <div className="footer p-10">
        {/* Learning Resources */}
        <div>
          <h4 className="font-bold mb-4 text-lg footer-title">Learning</h4>
          <ul className="space-y-2">
            <li>
              <a href="/courses" className="hover:text-primary">
                Browse Courses
              </a>
            </li>
            <li>
              <a href="/learning-paths" className="hover:text-primary">
                Learning Paths
              </a>
            </li>
            <li>
              <a href="/skill-assessment" className="hover:text-primary">
                Skill Assessment
              </a>
            </li>
            <li>
              <a href="/blog" className="hover:text-primary">
                Learning Blog
              </a>
            </li>
          </ul>
        </div>

        {/* Platform */}
        <div>
          <h4 className="font-bold mb-4 text-lg footer-title">Platform</h4>
          <ul className="space-y-2">
            <li>
              <a href="/about" className="hover:text-primary">
                About Us
              </a>
            </li>
            <li>
              <a href="/instructors" className="hover:text-primary">
                Become an Instructor
              </a>
            </li>
            <li>
              <a href="/enterprise" className="hover:text-primary">
                Enterprise Solutions
              </a>
            </li>
            <li>
              <a href="/careers" className="hover:text-primary">
                Careers
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="font-bold mb-4 text-lg footer-title">Support</h4>
          <ul className="space-y-2">
            <li>
              <a href="/help" className="hover:text-primary">
                Help Center
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-primary">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/accessibility" className="hover:text-primary">
                Accessibility
              </a>
            </li>
            <li>
              <a href="/affiliate" className="hover:text-primary">
                Affiliate Program
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="font-bold mb-4 text-lg footer-title">Legal</h4>
          <ul className="space-y-2">
            <li>
              <a href="/terms" className="hover:text-primary">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="/privacy" className="hover:text-primary">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/cookies" className="hover:text-primary">
                Cookie Policy
              </a>
            </li>
            <li>
              <a href="/refund" className="hover:text-primary">
                Refund Policy
              </a>
            </li>
          </ul>
        </div>

        <div>
          <span className="footer-title font-bold mb-4 text-lg">Follow Us</span>
          <div className="flex space-x-4 mt-2">
            <a className="text-xl hover:text-primary" href="https://twitter.com">
              <FaTwitter />
            </a>
            <a className="text-xl hover:text-primary" href="https://facebook.com">
              <FaFacebook />
            </a>
            <a className="text-xl hover:text-primary" href="https://instagram.com">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer px-10 py-4 border-t bg-base-200 text-base-content border-base-300">
        <div className="items-center grid-flow-col">
          <svg width="36" height="36" viewBox="0 0 24 24" className="fill-current text-primary">
            <path d="M19 3H5c-1.1 0-2 .9-2 ... (truncated for brevity) ..." />
          </svg>
          <p>eduKatalog © {new Date().getFullYear()} - All right reserved</p>
        </div>
        <div className="md:place-self-center md:justify-self-end">
          <div className="grid grid-flow-col gap-4">
            <a className="hover:text-primary" href="https://twitter.com">
              <FaTwitter />
            </a>
            <a className="hover:text-primary" href="https://facebook.com">
              <FaFacebook />
            </a>
            <a className="hover:text-primary" href="https://instagram.com">
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
