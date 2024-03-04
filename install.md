<!-- [text](c:/laragon/etc/nginx/sites-enabled/auto.manger.conf) [text](c:/laragon/etc/nginx/sites-enabled/auto.server.conf) -->

# requiments
- node.js
- npm packege mange
- mongodb

# 1-1 Setup API production code
- open Server directory
`shell
    cd Server
`
- open the install directory
`shell
    cd install
`
- run node install.js
`shell
    node install.js
`

## 2-1 config nginx server for "API"
- after installation is done copy the "dist" folder from the server directory to the server root
- copy server.conf from the nginx config folder
- open server.conf and edit it
- restart nginx server
- open the server URL and test API should you get the below response
`json 
    {
        "error": true,
        "name": "",
        "message": "/ Not Found",
        "status": 404
    }
`

# 2-1 Setup frontend 
- open (UI) directory 
`shell
    cd UI
`;
- run node instal.js
`shell
    node install.js
`

# 2-2 config nginx server for "UI"

- After UI installation complete copy "build" directory from the UI folder
- copy UI.conf from "nginx configs" folder
- edit UI.conf
- default username "admin"
- default password "92215098"
open the URL and use it
