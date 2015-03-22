_Ignite_
__JSON based scaffolding system__

    {
      name: "Meteor Scaffold Template",
      desc: "Make sure to `meteor install iron:router`!",
      prompts:[
        {name: "Please Input Project Name..."}
      ],
      structure: {
        client:{
          views:{
            components:{
              header:{
                _files["header.html", "header.js"]
              },
              footer:{
                _files["footer.html", "footer.js"]
              }
            },
            home:{
              _files["home.html", "home.js"]
            }
          },
          helpers: {
              _files: ["helpers.js"]
            },
          stylesheets:{
            _files: ["main.css"];
          },
          _files: ["main.js", "main.html"]
        },
        lib: {
          collections: {}
          _files: ["router.js"]
        },
        public: {
          images: {}
        },
        server: {
          _files: ["fixtures.js", "permissions.js", "publications.js", "server.js"]
        }
      },
    }

    >_ Please Input Project Name...
    >_ Test Project
    >_ Scaffolding Meteor Templates for Test Project
