import Navbar from '../components/Navbar'
import Hero from '../sections/Hero'
import Stats from '../sections/Stats'
import Progetti from '../sections/Progetti'
import Marquee from '../components/Marquee'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Marquee />
      <Progetti />
      <Footer />
    </>
  )
}

