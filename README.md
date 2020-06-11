# full-stack-app-weather
react with node js for electoronic menu targeting restaurant , coffee shop or shops need paper menu to take orders, inlcuding to go

how to build:
in code under restaurant root:
    docker-compose up -d --build    // start yml file and build client and server and start  
    docker-compose up -d            // start container for server, client and postgres
    docker-compose down             // bring down container
    docker-compose down -v          // bring down dontainer and remove post database 
    docker-compose logs             // check yml file logs


