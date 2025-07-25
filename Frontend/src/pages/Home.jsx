import ProductCatalog from "../components/ProductCatalog";
import VideoSection from "../components/VideoSection";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import HeroSection from "../components/HeroSection";
import KeyboardSection from "../components/KeyboardSection";
import "../App.css";

function Home() {
  return (
    <div className="App">
      <Header />
      <Navigation />
      <HeroSection />
      <KeyboardSection />
      <ProductCatalog />
      <VideoSection />
      <Footer />
    </div>
  );
}

export default Home;
