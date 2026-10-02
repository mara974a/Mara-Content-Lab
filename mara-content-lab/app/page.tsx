import Header from "@/components/Header/Header";
import Hero from "@/components/Hero/Hero";
import Problem from "@/components/Problem/Problem";
import Offer from "@/components/Offer/Offer";
import Process from "@/components/Process/Process";
import AiDisclosure from "@/components/AiDisclosure/AiDisclosure";
import Sample from "@/components/Sample/Sample";
import Fit from "@/components/Fit/Fit";
import About from "@/components/About/About";
import FAQ from "@/components/FAQ/FAQ";
import RequestForm from "@/components/RequestForm/RequestForm";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main id="main-content">
        <Hero />
        <Problem />
        <Offer />
        <Process />
        <AiDisclosure />
        <Sample />
        <Fit />
        <About />
        <FAQ />
        <RequestForm />
      </main>
      <Footer />
    </>
  );
}
