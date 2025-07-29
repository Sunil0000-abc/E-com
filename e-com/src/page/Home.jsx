import Hero from "../component/hero";
import Productdisplay from "../component/productdisplay";
import Shopcatagory from "../component/shopcatagory";

const Home = () => {
  return (
    <div>
      <Hero />
      <Shopcatagory/>
      <Productdisplay/>
    </div>
  );
};

export default Home;
