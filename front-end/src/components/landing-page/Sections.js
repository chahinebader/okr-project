import React from "react";
const Sections = () => (
<React.Fragment>
<section id="video-promo section-padding" className="video-promo section-padding">
      <div className="overlay"></div>
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-sm-12">
            <div className="video-promo-content text-center wow fadeInUp" data-wow-delay="0.3s">
              <a href="https://www.youtube.com/watch?v=2QXA6A6V3BY" className="video-popup"><i className="lni-film-play"></i></a>
              <h2 className="mt-3 wow zoomIn" data-wow-duration="1000ms" data-wow-delay="100ms">Watch Video</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="team" className="section-padding text-center">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title wow fadeInDown" data-wow-delay="0.3s">Screen Shot</h2>
          <p>A desire to help and empower your Business between company members <br></br> More than just a bug and ticket tracking device.</p>
        </div>
        <div className="row">
          <div className="col-sm-6 col-md-6 col-lg-3">
          
            <div className="team-item text-center wow fadeInRight" data-wow-delay="0.3s">
              <div className="team-img">
                <img className="img-fluid" src={require('../../images/Capture1.png')} alt=""/>
                <div className="team-overlay">
                  
                </div>
              </div>
              <div className="info-text">
                <h3>Dashbord</h3>
               
              </div>
            </div>
           
          </div>
          <div className="col-sm-6 col-md-6 col-lg-3">
         
            <div className="team-item text-center wow fadeInRight" data-wow-delay="0.6s">
              <div className="team-img">
                <img className="img-fluid" src={require('../../images/Capture2.png')} alt=""/>
                <div className="team-overlay">
                  
                </div>
              </div>
              <div className="info-text">
                <h3>Scrum Tree</h3>
             
              </div>
            </div>
        
          </div>

          <div className="col-sm-6 col-md-6 col-lg-3">
           
            <div className="team-item text-center wow fadeInRight" data-wow-delay="0.9s">
              <div className="team-img">
                <img className="img-fluid" src={require('../../images/Capture3.png')} alt=""/>
                <div className="team-overlay">
                 
                </div>
              </div>
              <div className="info-text">
                <h3>User Account</h3>
                
              </div>
            </div>
           
          </div>
          

          <div className="col-sm-6 col-md-6 col-lg-3">
           
            <div className="team-item text-center wow fadeInRight" data-wow-delay="1.2s">
              <div className="team-img">
                <img className="img-fluid" src={require('../../images/Capture4.png')} alt=""/>
                <div className="team-overlay">
                 
                </div>
              </div>
              <div className="info-text">
                <h3>Reporting</h3>
              
              </div>
            </div>
          
          </div>
          
        </div>
      </div>
    </section>
    <section id="counter" className="section-padding">
      <div className="overlay"></div>
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-lg-12 col-md-12 col-xs-12">
            <div className="row">
          
              <div className="col-lg-3 col-md-6 col-xs-12">
                <div className="counter-box wow fadeInUp" data-wow-delay="0.2s">
                  <div className="icon-o"><i className="lni-users"></i></div>
                  <div className="fact-count">
                    <h3><span className="counter">23576</span></h3>
                    <p>Users</p>
                  </div>
                </div>
              </div>
            
              <div className="col-lg-3 col-md-6 col-xs-12">
                <div className="counter-box wow fadeInUp" data-wow-delay="0.4s">
                  <div className="icon-o"><i className="lni-emoji-smile"></i></div>
                  <div className="fact-count">
                    <h3><span className="counter">2124</span></h3>
                    <p>Positive Reviews</p>
                  </div>
                </div>
              </div>
             
              <div className="col-lg-3 col-md-6 col-xs-12">
                <div className="counter-box wow fadeInUp" data-wow-delay="0.6s">
                  <div className="icon-o"><i className="lni-download"></i></div>
                  <div className="fact-count">
                    <h3><span className="counter">54598</span></h3>
                    <p>Downloads</p>
                  </div>
                </div>
              </div>
            
              <div className="col-lg-3 col-md-6 col-xs-12">
                <div className="counter-box wow fadeInUp" data-wow-delay="0.8s">
                  <div className="icon-o"><i className="lni-thumbs-up"></i></div>
                  <div className="fact-count">
                    <h3><span className="counter">3212</span></h3>
                    <p>Followers</p>
                  </div>
                </div>
              </div>
            
            </div>
          </div>
        </div>
      </div>
    </section>
    
</React.Fragment>
)
export default Sections;   