FROM node:latest as node

ARG ENV=prod
ARG APP=frontend

ENV ENV ${ENV}
ENV APP ${APP}

WORKDIR /app
COPY ./ /app/

# Instala y construye el Angular App
RUN npm ci
# RUN node --max_old_space_size=128 node_modules/@angular/cli/bin/ng build --prod
RUN npm run build --prod
RUN mv /app/dist/${APP}/* /app/dist/

# La compilación resultante la pasamos al servidor Nginx

FROM nginx:1.13.8-alpine

COPY --from=node /app/dist/ /usr/share/nginx/html
COPY ./ops/nginx.conf /etc/nginx/conf.d/default.conf
