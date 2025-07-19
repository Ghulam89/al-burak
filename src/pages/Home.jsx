import Navbar from '../components/header-footer.jsx/Navbar';
import BestSelling from '../components/home/bestselling';
import HeroSection from '../components/home/herosection';
import Manper from '../components/home/manper';
import Coupons from '../components/home/coupons';
import Footer from '../components/header-footer.jsx/Footer';
import Testimonial from '../components/home/testinomial';
import Subscribe from '../components/home/subscribe';

function App() {
  return (
    <>
    <Navbar />
    <HeroSection />
    <BestSelling />
    <Manper />
    {/* <Coupons /> */}
    <Testimonial />
    <Subscribe />
    <Footer />
    </>
  );
}

export default App;
