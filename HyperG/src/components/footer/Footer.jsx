import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-4 mt-4">
            <div className="container mx-auto text-center">
                <p className="mb-2">&copy; 2024 HyperG. Todos los derechos reservados.</p>
                
                <div className="mt-2 mb-4">
                    <a href="#privacy" className="text-gray-400 hover:text-white mx-3">Política de privacidad</a>
                    <a href="#terms" className="text-gray-400 hover:text-white mx-3">Términos de uso</a>
                </div>
                <div className="flex justify-center space-x-6 mb-4">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600">
                        <FontAwesomeIcon icon={faFacebook} className="text-2xl" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400">
                        <FontAwesomeIcon icon={faTwitter} className="text-2xl" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-600">
                        <FontAwesomeIcon icon={faInstagram} className="text-2xl" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-700">
                        <FontAwesomeIcon icon={faLinkedin} className="text-2xl" />
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
