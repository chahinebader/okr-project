import React, { Component,Fragment } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import AuthContext from './context/auth-context';
import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
import { DefaultLayout } from "./layouts";
import Dashboard from "./views/Dashboard";
import UserProfileLite from "./views/UserProfileLite";
import Okrs from "./views/Okrs";
import Company from "./views/Company";
import Reclamation from "./views/Reclamation";
import ErrorAccess from "./views/Error";
import Team from "./views/teamPage";
import LoginPage from './views/LoginPage';
import Rapport from "./views/Rapport";
import Compte from "./views/ComptePage";
import Mission from './views/mission';
import Overview from './views/overview';
import Objectif from './views/objectif';
import ForgetPassword from './views/ForgetPassword';
import ResetPassword from './views/ResetPassword';
import UpdatePassword from './views/UpdatePassword';
import Keyresultcalendar from './views/keyresultcalendar';
import LandingPAge from './views/LandingPage';
import TeamWork from './views/TeamWork';
import Reunion from './views/Reunion';
import CryptoJS from 'crypto-js';
import Payement from './components/payement/payement'
import SuperAdmin from './superAdmin/login';
import DashboardSuperAdmin from './superAdmin/dashboard';
import ReclamationAdmin from './superAdmin/reclamation';
let status=CryptoJS.AES.decrypt(localStorage.getItem('status'),
 'secret key 123').toString(CryptoJS.enc.Utf8);
class App extends Component {
  state = {
    token: null,
    userId: null 
  };
   login = (token, userId, tokenExpiration) => {
     this.setState({ token: token, userId: userId });
   };
    logout = () => {
      this.setState({ token: null, userId: null });
      localStorage.removeItem('tokenAuth');
      localStorage.removeItem('userId');
    };
  render() {
    return (   
     
      <BrowserRouter>
        <Fragment>
          <AuthContext.Provider
            value={{
              token: this.state.token,
              userId: this.state.userId,
              login: this.login,
              logout: this.logout
            }}
          >
            <main className="main-content">
            <Switch>
                     {/*Privilège Access */} 
                   {!(('tokenAuth' in localStorage) && ('userId' in localStorage)) && (
                   <Redirect  from="/administration/dashboard" to="/auth" exact />)}
                   {!(('tokenAuth' in localStorage) && ('userId' in localStorage)) && (
                   <Redirect  from="/dashboard" to="/auth" exact />)}
                   {!(('tokenAuth' in localStorage) && ('userId' in localStorage)) && (
                   <Redirect  from="/compte" to="/auth" exact />)}
                   {!(('tokenAuth' in localStorage) && ('userId' in localStorage)) && (
                   <Redirect  from="/mission" to="/auth" exact />)}
                   {!(('tokenAuth' in localStorage) && ('userId' in localStorage)) && (
                   <Redirect  from="/reunion" to="/auth" exact />)}
                   {!(('tokenAuth' in localStorage) && ('userId' in localStorage)) && (
                   <Redirect  from="/okrs" to="/auth" exact />)}
                   {!(('tokenAuth' in localStorage) && ('userId' in localStorage)) && (
                   <Redirect  from="/rapport" to="/auth" exact />)}
                   {!(('tokenAuth' in localStorage) && ('userId' in localStorage)) && (
                   <Redirect  from="/overview" to="/auth" exact />)}
                   {!(('tokenAuth' in localStorage) && ('userId' in localStorage)) && (
                   <Redirect  from="/TeamWork" to="/auth" exact />)}
                   {!(('tokenAuth' in localStorage) && ('userId' in localStorage)) && (
                   <Redirect  from="/objectifs" to="/auth" exact />)}
                   {!(('tokenAuth' in localStorage) && ('userId' in localStorage)) && (
                   <Redirect  from="/Calendarkeyresult" to="/auth" exact />)}
                   {!(('tokenAuth' in localStorage) && ('userId' in localStorage)) && (
                   <Redirect  from="/profils" to="/auth" exact />)}
                   {!(('tokenAuth' in localStorage) && ('userId' in localStorage)) && (
                   <Redirect  from="/team" to="/auth" exact />)}
                   {(('tokenAuth' in localStorage) && ('userId' in localStorage) && (status==="superAdmin")) &&(
                   <Redirect from="/auth" to="/administration/dashboard" exact />)}
                   {(('tokenAuth' in localStorage) && ('userId' in localStorage) && (status!=="superAdmin")) && (
                   <Redirect from="/" to="/dashboard" exact />)}
                   {(('tokenAuth' in localStorage) && ('userId' in localStorage) && (status!=="superAdmin")) && (
                   <Redirect from="/auth" to="/dashboard" exact />)}
                    <Route exact path="/updatePassword/:username" component={UpdatePassword}/>
                    <Route exact path="/reset/:token" component={ResetPassword} />
                    <Route path="/forgetpassword" component={ForgetPassword} exact />
                    <Route path="/payment" component={Payement} exact />
                    <Route path="/administration" component={SuperAdmin} exact />
                    
                   {(('tokenAuth' in localStorage) && ('userId' in localStorage) &&(status!=='admin')) &&(
                   <Redirect from="/compte" to="/error" exact />  )}
                   {(('tokenAuth' in localStorage) && ('userId' in localStorage) &&(status!=='admin')) &&(
                   <Redirect from="/rapport" to="/error" exact />)}
                   {(('tokenAuth' in localStorage) && ('userId' in localStorage) &&(status!=='admin')) &&(
                   <Redirect from="/mission" to="/error" exact /> )}
                   {(('tokenAuth' in localStorage) && ('userId' in localStorage) &&(status!=='admin')) &&(
                   <Redirect from="/reclamation" to="/error" exact />)}
                   {(('tokenAuth' in localStorage) && ('userId' in localStorage) &&(status!=='superviseur')) &&(
                   <Redirect from="/objectifs" to="/error" exact />)}
                   <Route path="/" component={LandingPAge} exact />
                   <Route path="/company" component={Company} exact />
                   <Route path="/auth" component={LoginPage} />
                   {(('tokenAuth' in localStorage) && ('userId' in localStorage)&&(status!=='superAdmin')) && (
                   <DefaultLayout>
                    <Route path="/dashboard" component={Dashboard} exact />
                    <Route path="/compte" component={Compte} exact />
                    <Route path="/okrs" component={Okrs} exact/>
                    <Route path="/mission" component={Mission} exact />
                    <Route path="/overview" component={Overview} exact />
                    <Route path="/objectifs" component={Objectif} exact />
                    <Route path="/team" component={Team} exact/>
                    <Route path="/rapport" component={Rapport} exact/>
                    <Route path="/profils" component={UserProfileLite} exact/>
                    <Route path="/error" component={ErrorAccess} exact />
                    <Route path="/reclamation" component={Reclamation}  exact />
                    <Route path="/Calendarkeyresult" component={Keyresultcalendar}  exact />
                    <Route path="/reunion" component={Reunion}  exact />
                    <Route path="/TeamWork" component={TeamWork}  exact />
                   </DefaultLayout>
                   )}
                   {(('tokenAuth' in localStorage) && ('userId' in localStorage)&&(status==='superAdmin')) && (
                   <Route path="/administration/dashboard" component={DashboardSuperAdmin} exact />
                   )}
                   {(('tokenAuth' in localStorage) && ('userId' in localStorage)&&(status==='superAdmin')) && (
                   <Route path="/administration/reclamation" component={ReclamationAdmin} exact />
                   )}
                   {!(('tokenAuth' in localStorage) && ('userId' in localStorage)) && (
                   <Redirect to="/" exact />)}     
            </Switch> 
            </main>
          </AuthContext.Provider>
        </Fragment>
        </BrowserRouter>
     
  );
}
}

export default App;
 