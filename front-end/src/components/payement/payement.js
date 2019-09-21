// @flow
/* eslint-disable no-console, react/no-multi-comp */
import React from 'react';
import './payement.css'
import type {InjectedProps} from 'react-stripe-elements';
import { Message } from 'semantic-ui-react'
import {
  CardElement,
  StripeProvider,
  Elements,
  injectStripe,
} from 'react-stripe-elements';
const handleBlur = () => {
  console.log('[blur]');
};
const handleChange = (change) => {
  console.log('[change]', change);
};
const handleFocus = () => {
  console.log('[focus]');
};
const handleReady = () => {
  console.log('[ready]');
};

const createOptions = (fontSize: string, padding: ?string) => {
  return {
    style: {
      base: {
        fontSize,
        color: '#424770',
        letterSpacing: '0.025em',
        fontFamily: 'Source Code Pro, monospace',
        '::placeholder': {
          color: '#aab7c4',
        },
        ...(padding ? {padding} : {}),
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };
};
 
let buying =false;

class _CardForm extends React.Component<InjectedProps & {fontSize: string}> {
  handleSubmit = (ev) => {
    ev.preventDefault();
    if (this.props.stripe) {
      this.props.stripe.createToken().then(token=>{
       console.log('token ==> '+ JSON.stringify(token));
     
       return  fetch('http://localhost:4000/api/donate', {
        method: 'POST',
        body: JSON.stringify({token}),
        headers: {
        'Content-Type': 'application/json'
        }
        })

      
      }).then(res => {
        console.log("reponse "+res.status);
        if(res.status===200 || res.status===201){
          buying=true;
          console.log("baying ==>"+buying);
          window.location = '/company';
        }
      }).catch(e=>{
        console.log(e);
      });
      
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit} className='form-payement'>
        <label className='label-payement'>
          Card details
          </label>
          <CardElement
            onBlur={handleBlur}
            onChange={handleChange}
            onFocus={handleFocus}
            onReady={handleReady}
            {...createOptions(this.props.fontSize)}
          />
        
        <button className='button-payement'>Pay 120$</button>
      </form>
    );
  }
}
const CardForm = injectStripe(_CardForm);




class Checkout extends React.Component<{}, {elementFontSize: string}> {
  constructor() {
    super();
    this.state = {
      elementFontSize: window.innerWidth < 450 ? '14px' : '18px',
    };
    window.addEventListener('resize', () => {
      if (window.innerWidth < 450 && this.state.elementFontSize !== '14px') {
        this.setState({elementFontSize: '14px'});
      } else if (
        window.innerWidth >= 450 &&
        this.state.elementFontSize !== '18px'
      ) {
        this.setState({elementFontSize: '18px'});
      }
    });
  }

  render() {
    const {elementFontSize} = this.state;
    return (
      <div className="Checkout">
        <br/>
        <h1 className='h1-payement'>Buying OKR Service</h1>
        <br/>  <br/>  <br/>  <br/> 
        <Elements>
          <CardForm fontSize={elementFontSize} />
        </Elements>
        <Message success header='Notice' content={[
        'Our payment is secured by SSL encryption from VeriSign, the highest encryption technology available on the market. ',
        'Make sure your credit/debit card details will not be exposed.Import duties, taxes and other related customs fees are not included.',
        'Buyers are fully responsible for any additional costs incurred (if any).\n\n',
        'Thank you for your trust in our company',
     
        ].join('')} />
       
      </div>
    );
  }
}
class Payement extends React.Component {
  render(){
     
    return (
  
      <StripeProvider apiKey="pk_test_chvZapuSOSS8EZ4nGUY4Ecq800sdb5gt4h">
        <Checkout />
      </StripeProvider>
      
    );
   
    } 
  } 

  
export default Payement