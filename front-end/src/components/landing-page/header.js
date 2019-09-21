import React from "react";
import {NavLink} from 'react-router-dom';
const Header = () => (
<React.Fragment>
<header id="header-wrap">
     
     <nav className="navbar navbar-expand-md bg-inverse fixed-top scrolling-navbar top-nav-collapse">
       <div className="container">
         
         <a href="index.html" className="navbar-brand"><img className="logo-satoripop" src={require('../../images/satoripop.png')} alt="logo"/><img className="animation-satoripop" src={require('../../images/10.gif')} alt="logo"/></a>       
         <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
           <i className="lni-menu"></i>
         </button>
         <div className="collapse navbar-collapse" id="navbarCollapse">
           <ul className="navbar-nav mr-auto w-100 justify-content-end clearfix">
             <li className="nav-item active">
               <a className="nav-link" href="#hero-area">
                 Home
               </a>
             </li>
             <li className="nav-item">
               <a className="nav-link" href="#feature">
                 Feature
               </a>
             </li>
             <li className="nav-item">
               <a className="nav-link" href="#services">
                 Services
               </a>
             </li>
             <li className="nav-item">
               <a className="nav-link" href="#video-promo section-padding">
                 Demo
               </a>
             </li>
            
             <li className="nav-item">
               <a className="nav-link" href="#skill-area section-padding">
                 Works
               </a>
             </li>
             <li className="nav-item">
               <a className="nav-link" href="#pricing">
               Buying
               </a>
             </li>
             <li className="nav-item">
               <a className="nav-link" href="#contact">
                 Contact
               </a>
             </li>
              <li className="nav-item">
               <NavLink className="nav-link" to="/auth"> <a href="#services" className="btn-landinglogin btn-landinglogin-common">Login</a></NavLink>
             </li>
           </ul>
         </div>
       </div>
     </nav>
   
     <div id="hero-area" className="hero-area-bg">
       <div className="container">
         <div className="row">
           <div className="col-md-12 col-sm-12">
             <div className="contents text-center">
               <h2 className="head-title wow fadeInUp">Discover how OKR improves  <br></br> your Businesses</h2>
               <div className="header-button wow fadeInUp" data-wow-delay="0.3s">
                 <a href="#services" className="btn-landing btn-landing-common">Explore</a>
               </div>
             </div>
             <div className="img-thumb text-center wow fadeInUp" data-wow-delay="0.6s">
               <img className="img-fluid" src={require('../../images/landing-page/hero-1.png')} alt=""/>
             </div>
             <br/><br/><br/>
           </div>
         </div>
       </div>
     </div>
   

   </header>
</React.Fragment>
)
export default Header;   