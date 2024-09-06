import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import CustomLayout from '../../components/layout/custom-layout/CustomLayout';

const ContactPage: React.FC = () => {
  const whatsappNumber = "+919108356503";
  const email = "earningedge00@gmail.com";
  const mapSrc="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d122803.98824369104!2d74.38657010227713!3d15.876314008582025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bbf635c505548bf%3A0xa9da7a0bafd029c0!2sEarning%20Edge!5e0!3m2!1sen!2sin!4v1725605292862!5m2!1sen!2sin"

  return (
    <CustomLayout>

    <div className="min-h-screen  bg-darkBg py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-white text-center mb-12">Get in Touch</h1>
        
        <div className="bg-white shadow-2xl rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-6 md:p-8 lg:p-12">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">Contact Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="h-6 w-6 text-indigo-600 mr-3" />
                  <a href={`https://wa.me/${whatsappNumber}`} className="text-gray-600 hover:text-indigo-600 transition duration-300">
                    {whatsappNumber}
                  </a>
                </div>
                
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-indigo-600 mr-3" />
                  <a href={`mailto:${email}`} className="text-gray-600 hover:text-indigo-600 transition duration-300">
                    {email}
                  </a>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="h-6 w-6 text-indigo-600 mr-3" />
                  <span className="text-gray-600">Ambewadi circle, Bauxite Road, Belagavi, Karnataka 591108</span>
                </div>
              </div>
              
              {/* <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Send us a message</h3>
                <form className="space-y-4">
                <input type="text" placeholder="Your Name" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
                <input type="email" placeholder="Your Email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
                <textarea placeholder="Your Message" rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"></textarea>
                <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300">Send Message</button>
                </form>
                </div> */}
            </div>
            
            <div className="relative h-96 md:h-auto">
              <iframe 
                src={mapSrc} 
                className="absolute inset-0 w-full h-full"
                style={{border: 0}}
                allowFullScreen={true} 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
                </CustomLayout>
  );
};

export default ContactPage;