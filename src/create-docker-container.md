## create a directory for the website

### create a docker-compose.yml

### with this content :

```
version: '3.8'

services:
  web:
    image: php:apache
    container_name: apache_server
    ports:
      - "8080:80"
    volumes:
      - ./src:/var/www/html
      - ./php.ini:/usr/local/etc/php/php.ini
    networks:
      - app-network
    depends_on:
      - db

  db:
    image: mysql:8.0
    container_name: mysql_server
    ports:
      - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: rootpassword
      MYSQL_DATABASE: my_database
      MYSQL_USER: user
      MYSQL_PASSWORD: userpassword
    volumes:
      - db_data:/var/lib/mysql
    networks:
      - app-network

  phpmyadmin:
    image: phpmyadmin
    container_name: phpmyadmin
    ports:
      - "8081:80"
    environment:
      PMA_HOST: db
      MYSQL_ROOT_PASSWORD: rootpassword
    networks:
      - app-network

networks:
  app-network:
    driver: bridge

volumes:
  db_data:
```

- then create a php.ini in the same directory and add this

```
display_errors = On
display_startup_errors = On
error_reporting = E_ALL
```

- then create a src folder, and add the website content in it

- then open up a console in that directory, and type "docker-compose up -d"

- and finally open a browser to "localhost:8080"
