FROM mhart/alpine-node:10.16.0 AS builder
WORKDIR /app
COPY . .
ARG SERVER_ROOT
ENV SERVER_ROOT=${SERVER_ROOT:-http://localhost:8090}
RUN yarn
RUN REACT_APP_API_ROOT=${SERVER_ROOT} yarn parcel build ./src/index.html

FROM nginx:1.16.0-alpine
COPY --from=builder /app/dist/ /usr/share/nginx/html
COPY config/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
