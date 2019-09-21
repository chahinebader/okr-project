import React from "react";
import {NavLink} from 'react-router-dom';
const Contact = () => (
<React.Fragment>
<section id="pricing" className="section-padding bg-gray">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title wow fadeInDown" data-wow-delay="0.3s">Best Pricing</h2>
          <p>A desire to help and empower others between community contributors in technology <br></br> began to grow in 2010.</p>
        </div>
        <div className="row">
         
         
          <div className="col-lg-4 col-md-6 col-xs-12">
            <div className="table wow fadeInUp" data-wow-delay="1.2s">
              <div className="title">
                <h3>PROFESIONAL</h3>
              </div>
               <div className="pricing-header">
                  <p className="price-value">$119.99<span>/ Year</span></p>
               </div>
              <ul className="description-price">
                <li>Business Analyzing</li>
                <li>Operational Excellence</li>
                <li>Business Idea Ready</li>
                <li>Database NoSQL</li>
                <li>Customer Support</li>
              </ul>
             
              <NavLink to="/payment"> <button className="btn-landing btn-landing-common">Get It</button> </NavLink>
            </div> 
          </div>
          <div className="col-lg-4 col-md-6 col-xs-12">
            <div className="table wow fadeInUp" data-wow-delay="1.2s">
              <div className="title">
                <h3>Free</h3>
              </div>
               <div className="pricing-header">
                  <p className="price-value">$0.00<span>/month </span></p>
               </div>
              <ul className="description-price">
                <li>Business Analyzing</li>
                <li>Operational Excellence</li>
                <li>Business Idea Ready</li>
                <li>Database NoSQL</li>
                <li>Customer Support</li>
              </ul>
             
              <NavLink to="/company"> <button className="btn-landing btn-landing-common">Get It</button> </NavLink>
            </div> 
          </div>
          <div className="col-lg-4 col-md-6 col-xs-12">
          <img className='payement-img' src={require('../../images/e-commerce.jpg')} alt='payment-img'/>
          </div>
        </div>
      </div>
    </section>
<div id="skill-area section-padding" className="skill-area section-padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-12 col-xs-12 wow fadeInLeft" data-wow-delay="0.3s">
            <img className="img-fluid" src={require('../../images/landing-page/img-1.jpg')} alt="" />
          </div>
          <div className="col-lg-6 col-md-12 col-xs-12 info wow fadeInRight" data-wow-delay="0.3s">
            <div className="site-heading">
              <h2 className="section-title">About <span>OKR</span></h2>
              <p>
              OKR stands for "Objectives & Key Results". Very schematically, the OKR methodology consists in setting ambitious objectives at all levels of the company and for all the teams, and to carry out their daily follow-up thanks to Key Results. Key Results are the concrete results that must be achieved to complete the goal.
              </p>
              <p>
              They measure the progress of the objectives.
              </p>
            </div>
            <div className="skills-section">
              
              <div className="progress-box">
                <h5>Strategy &amp; Analysis <span className="pull-right">70%</span></h5>
                <div className="progress" Style="opacity: 1, left: 0px;">
                  <div className="progress-bar" role="progressbar" data-width={87} Style="width: 70%"></div>
                </div>
              </div>
              <div className="progress-box">
                <h5>Plannfication <span className="pull-right">30%</span></h5>
                <div className="progress" Style="opacity : 1, left: 0 px">
                  <div className="progress-bar" role="progressbar" data-width={30} Style="width: 30%"></div>
                </div>
              </div>
              <div className="progress-box">
                <h5>Fixing Metrics <span className="pull-right">60%</span></h5>
                <div className="progress" Style="opacity: 1, left: 0px">
                  <div className="progress-bar" role="progressbar" data-width={52} Style="width: 60%"></div>
                </div>
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </div>
    
   
    
   
  
   
    
    
</React.Fragment>
) 
export default Contact;   