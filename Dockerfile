FROM mhart/alpine-node:10.16.0 AS builder
WORKDIR /app
COPY . .
ARG SERVER="http:\/\/localhost:8090"
RUN sed -i "s/process\.env\.REACT\_APP\_API\_ROOT/\"${SERVER}\"/g" /app/src/utils/Api.js
RUN npm rebuild node-sass
RUN yarn
RUN yarn run build

FROM mhart/alpine-node
RUN yarn global add serve
COPY --from=builder /app/build .
CMD ["serve", "-p", "80", "-s", "."]

