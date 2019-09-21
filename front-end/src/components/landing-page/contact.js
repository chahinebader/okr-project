import React from "react";
import axios from 'axios';
class Contact extends React.Component{
constructor(props){
  super(props)
  this.state={
    name:'',
    email:'',
    subject:'',
    message:''
  };
}

onSubmit(){
  console.log(this.state);
    axios.post('http://localhost:4000/mailNotif', {
        email: this.state.email,
        text: this.state.message+'\n\n send by '+this.state.name,
        subject:this.state.subject,
      },
    )
    .then(response => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
     })
}

  render(){
    return(
<React.Fragment>
<section id="contact" className="section-padding">    
<div className="container">
  <div className="row contact-form-area wow fadeInUp" data-wow-delay="0.4s">          
    <div className="col-md-6 col-lg-6 col-sm-12">
      <div className="contact-block">
        <form>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <input type="text" className="form-control" id="name" name="name" placeholder="Name" required data-error="Please enter your name" onChange={e => this.setState({name:e.target.value})}/>
                <div className="help-block with-errors"></div>
              </div>                                 
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <input type="text" placeholder="Email" id="email" className="form-control" name="email" required data-error="Please enter your email" onChange={e => this.setState({email:e.target.value})}/>
                <div className="help-block with-errors"></div>
              </div> 
            </div>
             <div className="col-md-12">
              <div className="form-group">
                <input type="text" placeholder="Subject" id="msg_subject" className="form-control" required data-error="Please enter your subject" onChange={e => this.setState({subject:e.target.value})} />
                <div className="help-block with-errors"></div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group"> 
                <textarea className="form-control" id="message" placeholder="Your Message" rows="5" data-error="Write your message" required onChange={e => this.setState({message:e.target.value})}></textarea>
                <div className="help-block with-errors"></div>
              </div>
              <div className="submit-button">
                <button className="btn-landing btn-landing-common" onClick={()=> this.onSubmit()}>Send Message</button>
                <div id="msgSubmit" className="h3 text-center hidden"></div> 
                <div className="clearfix"></div> 
              </div>
            </div>
          </div>            
        </form>
      </div>
    </div>
    <div className="col-md-6 col-lg-6 col-sm-12">
      <div className="contact-right-area wow fadeIn">
        <div className="contact-title">
          <h1>We're a friendly bunch..</h1>
          <p>We create projects for companies and startups with a passion for quality</p>
        </div>
        <h2>Contact Us</h2>
        <div className="contact-right">
          <div className="single-contact">
            <div className="contact-icon">
              <i className="lni-map-marker"></i>
            </div>
            <p>ADDRESS: Blvd Hassouna Ayachi، Sousse 4000</p>
          </div>
          <div className="single-contact">
            <div className="contact-icon">
              <i className="lni-envelope"></i>
            </div>
            <p>Email:  okr.satoripop@gmail.com</p>
          </div>
          <div className="single-contact">
            <div className="contact-icon">
              <i className="lni-phone-handset"></i>
            </div>
            <p>Phone:  +33 1 85 54 00 50 / +216 73 210 332</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div> 
</section>
</React.Fragment>
)
    }
  }
export default Contact;   