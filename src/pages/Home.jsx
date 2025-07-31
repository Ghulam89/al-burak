
import BestSelling from '../components/home/bestselling';
import HeroSection from '../components/home/herosection';
import Manper from '../components/home/manper';
import Footer from '../components/header-footer.jsx/Footer';
import Testimonial from '../components/home/testinomial';
import Subscribe from '../components/home/subscribe';
import Navbar from '../components/Navbar';
import CouponSection from '../components/home/coupons';
import NewArrivals from '../components/newArrivals/NewArrivals';
import CategoryProducts from '../components/categoryProducts';

function App() {
  return (
    <>
    <Navbar/>
    <HeroSection />
    <BestSelling />
    <NewArrivals/>
    <CategoryProducts/>
    {/* <Manper /> */}
    <CouponSection/>
    <Testimonial />
    <Subscribe />
    <Footer />
    </>
  );
}

export default App;
