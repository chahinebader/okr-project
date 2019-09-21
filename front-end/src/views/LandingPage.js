import React from "react";
import Header from '../components/landing-page/header'
import Feature from '../components/landing-page/Feature';
import Services from '../components/landing-page/Services';
import Sections from '../components/landing-page/Sections'
import SectionsPadding from '../components/landing-page/SectionPadding'
import Contact from '../components/landing-page/contact'
import Footer from '../components/landing-page/Footer'
import '../components/landing-page/style/main.css'
import '../components/landing-page/fonts/line-icons.css'



class LandingPage extends React.Component { 
    render(){
        return(
          <React.Fragment>
              <Header/>
              <Feature/>
              <Services/>
              <Sections/>
              <SectionsPadding/>
              <Contact/>
              <Footer/>

          </React.Fragment>

        );

    }
}
export default LandingPage;