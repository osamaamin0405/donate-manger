<!-- [text](c:/laragon/etc/nginx/sites-enabled/auto.manger.conf) [text](c:/laragon/etc/nginx/sites-enabled/auto.server.conf) -->

# requiments
- node.js
- npm packege mange
- mongodb

# 1-1 Setup api production code
- opend Server directory
`shell cd Server`
- open install directory
`shell cd install`
- run node install.js
`shell node install.js`

## 2-1 config nginx server for "api"
- after installation done copy "dist" folder from server directory to server root
- copy server.conf from nginx config folder
- open server.conf and edit it
- restart nginx server
- open server url and test api should you get below response
`json 
    {
        "error": true,
        "name": "",
        "message": "/ Not Found",
        "status": 404
    }
`

# 2-1 setup frontend 
- open (UI) directory 
`shell cd UI`;
- run node instal.js
`shell node install.js`

# 2-2 config nginx server for "UI"

- after ui installation complate copy "build" directory from UI folder
- copy UI.conf from "nginx configs" folder
- edit UI.conf
- default username "admin"
- default password "92215098"
open URL and use it
