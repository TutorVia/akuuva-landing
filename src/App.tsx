import Nav from './components/Nav'
import Hero from './components/Hero'
import BentoSection from './components/BentoSection'
import HubSection from './components/HubSection'
import IndiaMapSection from './components/IndiaMapSection'
import DeltaTable from './components/DeltaTable'
import QuoteSection from './components/QuoteSection'
import CtaSection from './components/CtaSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <BentoSection />
        <HubSection />
        <IndiaMapSection />
        <DeltaTable />
        <QuoteSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  )
}
