FROM mhart/alpine-node:10.16.0 AS builder
WORKDIR /app
COPY . .
ARG SERVER_ROOT=http://localhost:4000
RUN echo "REACT_APP_API_ROOT={SERVER_ROOT}" > .env
RUN yarn
RUN yarn parcel build ./src/index.html

FROM nginx:1.17.0 
COPY --from=builder /app/dist/ /usr/share/nginx/html
RUN echo "server" >> /etc/nginx/conf.d/default.conf
RUN echo "{ listen 80;" >> /etc/nginx/conf.d/default.conf
RUN echo " location / {" >> /etc/nginx/conf.d/default.conf
RUN echo "root /usr/share/nginx/html;" >> /etc/nginx/conf.d/default.conf
RUN echo "index index.html index.htm;" >> /etc/nginx/conf.d/default.conf
RUN echo "try_files $uri $uri/ /index.html =404;" >> /etc/nginx/conf.d/default.conf
RUN echo "}" >> /etc/nginx/conf.d/default.conf
RUN echo "include /etc/nginx/extra-conf.d/*.conf;" >> /etc/nginx/conf.d/default.conf
RUN echo "}" >> /etc/nginx/conf.d/default.conf
