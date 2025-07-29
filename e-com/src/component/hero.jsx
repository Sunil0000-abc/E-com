import React from 'react'
import hero from '../assets/herosection.jpg'
import {Link} from 'react-router-dom'

const Hero = () => {
    
  return (
    <div>
        <div>
      <section
        style={{ backgroundImage: `url(${hero})` }}
        className="bg-cover bg-center bg-no-repeat min-h-[80vh] flex flex-col items-center justify-center px-6 md:px-16 py-10"
      >
        
        <div className="max-w-xl text-center p-8 text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 text-gray-400">
            Step Into the Streets <br />
            <span className="text-[#facc15]">with F1 StreetWare</span>
          </h1>
          <p className="text-black text-lg md:text-xl mb-6">
            Discover the latest fashion trends designed for bold street style.
          </p>
          <Link
            to="/product"
            className="inline-block bg-emerald-400 hover:bg-emrald-600 transition px-6 py-3 rounded-full text-base font-medium shadow-md"
          >
            View All
          </Link>
        </div>
      </section>
      
    </div>
    </div>
  )
}

export default Hero