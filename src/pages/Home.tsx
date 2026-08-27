import SEO from '../components/SEO'
import Navbar from '../components/Navbar'
import Hero from '../sections/Hero'
import Stats from '../sections/Stats'
import Marquee from '../components/Marquee'
import Timeline from '../sections/Timeline'
import Terminal from '../sections/Terminal'
import Contact from '../sections/Contact'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <SEO />
      <Navbar />
      <main id="main-content">
        <Hero />
        <Stats />
        <Marquee />
        <Timeline />
        <Terminal />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
