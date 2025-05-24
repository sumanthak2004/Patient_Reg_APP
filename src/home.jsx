import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Home Component
const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const navigateToRegistration = () => {
    navigate('/registration');
  };

  return (
    <div className="max-w-full min-h-screen bg-white font-sans">
      {/* Navigation Header */}
      <header className="bg-blue-700 text-white py-4 top-0 z-50">
        <div className="max-w-full mx-auto px-5 flex justify-between items-center">
          <div className="text-2xl font-bold pl-1 pr-80">MEDICAL CLINIC</div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10 gap-7 pl-5 pr-5 ">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-white hover:text-cyan-300 font-semibold transition-colors duration-300"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-white hover:text-cyan-300 font-semibold transition-colors duration-300"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="text-white hover:text-cyan-300 font-semibold transition-colors duration-300"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-white hover:text-cyan-300 font-semibold transition-colors duration-300"
            >
              Contact
            </button>
             <button 
            onClick={navigateToRegistration}
              className="text-blue-50 bg-blue-800 hover:text-cyan-300 font-semibold transition-colors duration-300"
            >
              Register Here
            </button>
          </nav>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden bg-blue-700 px-4 py-2">
            <div className="flex flex-col space-y-2">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-white hover:text-cyan-300 font-semibold py-2 text-left"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-white hover:text-cyan-300 font-semibold py-2 text-left"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="text-white hover:text-cyan-300 font-semibold py-2 text-left"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-white hover:text-cyan-300 font-semibold py-2 text-left"
              >
                Contact
              </button>
            </div>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="relative h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center">
        <div className="absolute inset-0 bg-white/60"></div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-blue-800 mb-4">
            EASY PATIENT REGISTRATION
          </h1>
          <p className="text-2xl font-semibold text-blue-800 mb-4">
            FOR YOUR CONVENIENCE
          </p>
          <p className="text-lg text-blue-700 leading-relaxed mb-8 max-w-3xl mx-auto">
            Register patients anytime, anywhere with our app. Whether it's 7:00am or 7:00pm, our app is available
            for you to register new patients or access existing records. No more waiting in lines or filling out
            paper forms.
          </p>
          <button 
            onClick={navigateToRegistration}
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-300 text-lg"
          >
            PATIENT REGISTRATION
          </button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 text-center bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-blue-800 mb-6">ABOUT OUR APP</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-12 max-w-4xl mx-auto">
            Our patient registration app simplifies the process of registering new patients and accessing medical records. 
            With an intuitive interface and secure data storage, our app ensures a seamless experience for both patients 
            and healthcare providers. Say goodbye to manual paperwork and hello to efficient patient management!
          </p>
          
          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
            <div className="bg-gray-100 p-6 rounded-lg">
              <div className="text-4xl text-blue-700 mb-4">👤+</div>
              <h3 className="text-lg font-semibold text-blue-700 mb-2">Effortless Registration</h3>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg">
              <div className="text-4xl text-blue-700 mb-4">🔒</div>
              <h3 className="text-lg font-semibold text-blue-700 mb-2">Secure Data Storage</h3>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg">
              <div className="text-4xl text-blue-700 mb-4">📱</div>
              <h3 className="text-lg font-semibold text-blue-700 mb-2">User-Friendly Interface</h3>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg">
              <div className="text-4xl text-blue-700 mb-4">📋+</div>
              <h3 className="text-lg font-semibold text-blue-700 mb-2">Comprehensive Record Access</h3>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg">
              <div className="text-4xl text-blue-700 mb-4">✅</div>
              <h3 className="text-lg font-semibold text-blue-700 mb-2">Instant Verification</h3>
            </div>
          </div>
          
          <button 
            onClick={() => scrollToSection('services')}
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300"
          >
            Learn More
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 px-4 text-center bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-blue-800 mb-6">KEY FEATURES</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-12 max-w-4xl mx-auto">
            Our app offers a range of key features aimed at simplifying patient registration and record management. 
            From real-time record updates to multi-tab support, our app is designed to streamline the administrative 
            tasks associated with patient care.
          </p>
          
          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-5xl text-blue-700 mb-4">🚑</div>
              <h3 className="text-xl font-semibold text-blue-700 mb-2">Urgent Care</h3>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-5xl text-blue-700 mb-4">🧪</div>
              <h3 className="text-xl font-semibold text-blue-700 mb-2">X-Rays & Lab Test</h3>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-5xl text-blue-700 mb-4">👨‍⚕️</div>
              <h3 className="text-xl font-semibold text-blue-700 mb-2">Occupational Health</h3>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="text-5xl text-blue-700 mb-4">💉</div>
              <h3 className="text-xl font-semibold text-blue-700 mb-2">Travel Vaccines</h3>
            </div>
          </div>
          
          <button 
            onClick={navigateToRegistration}
            className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300"
          >
            Explore Features
          </button>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 text-center bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-blue-800 mb-8">Contact Us</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>
              <span className="font-semibold">Email:</span> patientreg@example.com
            </p>
            <p>
              <span className="font-semibold">Location:</span> HealthTech Campus, Hyderabad, India
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-6 text-center">
        <div className="max-w-6xl mx-auto px-4">
          <p>&copy; 2025 Patient Registration Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;