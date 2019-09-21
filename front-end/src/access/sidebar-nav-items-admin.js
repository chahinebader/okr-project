export default function() {
    return [
      {
        title: "Dashboard",
        to: "/dashboard",
        htmlBefore: '<i class="fas fa-tachometer-alt"></i>',
        htmlAfter: ""
      },
      {
        title: "Profils",
        htmlBefore: '<i class="far fa-address-card"></i>',
        to: "/profils",
      },
      {
        title: "Company",
        htmlBefore: '<i class="fas fa-building"></i>',
        to: "/overview",
      },
      {
        title: "Team",
        htmlBefore: '<i class="material-icons">group</i>',
        to: "/team",
      },
      {
        title: "Compte",
        htmlBefore: '<i class="fas fa-user"></i>',
        to: "/compte",
      },
     
      {
        title: "Missions",
        htmlBefore: '<i class="fas fa-tasks"></i>',
        to: "/mission",
      },
      
      {
        title: "Planning",
        htmlBefore: '<i class="far fa-calendar-alt"></i>',
        to: "/Calendarkeyresult",
      }, {
        title: "Rapport",
        htmlBefore: '<i class="fas fa-chart-line"></i>',
        to: "/rapport",
      },
      {
        title: "Reclamation",
        htmlBefore: '<i class="material-icons">send</i>',
        to: "/reclamation",
      },
    ];
  }
  