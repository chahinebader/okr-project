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
        title: "Objectif",
        htmlBefore: '<i class="material-icons">send</i>',
        to: "/objectifs",
      },
      {
        title: "TeamWork",
        htmlBefore: '<i class="material-icons">group</i>',
        to: "/TeamWork",
      },
      {
        title: "Planning",
        htmlBefore: '<i class="far fa-calendar-alt"></i>',
        to: "/Calendarkeyresult",
      },
      {
        title: "Réunion",
        htmlBefore: '<i class="fas fa-bullhorn"></i>',
        to: "/reunion",
      },
    ];
  }
  