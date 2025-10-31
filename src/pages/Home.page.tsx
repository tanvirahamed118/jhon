import Footer from "../component/footer/Footer";
import Header from "../component/header/Header";
import BrandList from "../component/home/Brand.list";
import BusinessInfo from "../component/home/Business.info";
import CallOfAction from "../component/home/Call.of.action";
import CoreValues from "../component/home/Core.values";
import FunFacts from "../component/home/Fun.facts";

function HomePage() {
  return (
    <>
      <Header />
      <CallOfAction />
      <BrandList />
      <CoreValues />
      <BusinessInfo />
      <FunFacts />
      <Footer />
    </>
  );
}

export default HomePage;
