import { EventEmitter } from "events";
import Dispatcher from "./dispatcher";
import Constants from "./constants";
import getSidebarNavItemsMember from "../access/sidebar-nav-items-member";
import getSidebarNavItemsAdmin from "../access/sidebar-nav-items-admin";
import getSidebarNavItemsSuperviseur from "../access/sidebar-nav-items-superviseur";
import getSidebarNavItems from "../access/sidebar-nav-items";


let _store = {
  menuVisible: false,
  navItemsSuperviseur: getSidebarNavItemsSuperviseur(),
  navItemsAdmin: getSidebarNavItemsAdmin(),
  navItemsMember:getSidebarNavItemsMember(),
  navItemsVide :getSidebarNavItems()
};





class Store extends EventEmitter {
  
  constructor() {
    super();
    
    this.registerToActions = this.registerToActions.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    Dispatcher.register(this.registerToActions.bind(this));
    
  }
  
   
  registerToActions({ actionType, payload }) {
    switch (actionType) {
      case Constants.TOGGLE_SIDEBAR:
        this.toggleSidebar();
        break;
      default:
    }
  }
  
  toggleSidebar() {
   if(!('userId' in localStorage)){
    _store.menuVisible = !_store.menuVisible;
    this.emit(Constants.CHANGE);
   }
  }

  getMenuState() {
    return _store.menuVisible;
  }

  getSidebarItems(user) {
    
   if(user ==='superviseur')
    return _store.navItemsSuperviseur;
    if(user ==='admin')
    return _store.navItemsAdmin;
    if(user ==='membre')
    return _store.navItemsMember;
    if( user==='superAdmin')
    return _store.navItemsVide;
  }

  addChangeListener(callback) {
    this.on(Constants.CHANGE, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(Constants.CHANGE, callback);
  }

  

}

export default new Store();
