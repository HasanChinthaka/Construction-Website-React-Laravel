import React from "react";
import Header from "../common/Header";
import Footer from "../common/Footer";
import AboutUs from "../common/AboutUs";
import SubHero from "../common/SubHero";
import Team from "../common/Team";

const About = () => {
  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <SubHero 
        preHeading="Quality. Intergrity. Value"
        heading="About Us"
        text="We excel at transforming visions into reality <br /> through
                outstanding craftsmanship and precise."
        />

        <AboutUs />

        {/* Our Team */}
        <Team/>
      </main>
      <Footer />
    </>
  );
};

export default About;
