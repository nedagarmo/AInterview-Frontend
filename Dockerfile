FROM node:latest as node

ARG ENV=prod
ARG APP=frontend

ENV ENV ${ENV}
ENV APP ${APP}

WORKDIR /app
COPY ./ /app/

# Instala y construye las dependencias con npm
RUN npm ci
# Compilamos la aplicación Angular
RUN npm run build --prod
RUN mv /app/dist/${APP}/* /app/dist/

# La compilación resultante la pasamos al servidor Nginx

FROM nginx:1.13.8-alpine

COPY --from=node /app/dist/ /usr/share/nginx/html
COPY ./ops/nginx.conf /etc/nginx/conf.d/default.conf
