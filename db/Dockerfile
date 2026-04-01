FROM mysql:latest

ENV MYSQL_ROOT_PASSWORD=1234
ENV MYSQL_DATABASE=ecommerce_db

COPY data.sql /docker-entrypoint-initdb.d/data.sql