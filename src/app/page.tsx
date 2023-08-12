import Featured from '@/components/Featured';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import Notification from '@/components/Notification';
import Offer from '@/components/Offer';
import Slider from '@/components/Slider';
import Image from 'next/image';
import CategoryPage from './menu/[category]/page';


export default function Home() {


  return (
    <>

      <Slider/>
      <Featured/>
      <Offer/>
    
    </>
  )
}
