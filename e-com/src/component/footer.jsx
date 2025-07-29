

export default function Footer() {
  return (
    <footer className="bg-black text-white mt-20 px-8 py-12">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
    
    <div>
      <h2 className="text-xl font-bold text-red-600 mb-3">F1 Streetwear</h2>
      <p className="text-gray-400 text-sm leading-relaxed">
        Speed meets style. Premium racing-inspired fashion for everyday rebels.
      </p>
    </div>

    <div>
      <h3 className="text-red-500 font-semibold mb-2">Shop</h3>
      <ul className="space-y-1 text-sm">
        <li><a href="#" className="hover:underline">Caps</a></li>
        <li><a href="#" className="hover:underline">Hoodies</a></li>
        <li><a href="#" className="hover:underline">Jackets</a></li>
        <li><a href="#" className="hover:underline">T-shirts</a></li>
      </ul>
    </div>

    <div>
      <h3 className="text-red-500 font-semibold mb-2">Support</h3>
      <ul className="space-y-1 text-sm">
        <li><a href="#" className="hover:underline">Contact Us</a></li>
        <li><a href="#" className="hover:underline">FAQs</a></li>
        <li><a href="#" className="hover:underline">Returns</a></li>
        <li><a href="#" className="hover:underline">Shipping Info</a></li>
      </ul>
    </div>

    <div>
      <h3 className="text-red-500 font-semibold mb-2">Follow Us</h3>
      <div className="flex space-x-4 text-2xl">
        <a href="#"><i className="fab fa-instagram"></i></a>
        <a href="#"><i className="fab fa-twitter"></i></a>
        <a href="#"><i className="fab fa-facebook"></i></a>
        <a href="#"><i className="fab fa-youtube"></i></a>
      </div>
    </div>

  </div>
</footer>

  );
}
