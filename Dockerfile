FROM node as build-env

WORKDIR /app
# bring in layer with packages
COPY package.json package-lock.json ./
RUN npm ci

# copy all sources - make sure your node_modules are part of .dockerignore
COPY . .

# build production version of application
RUN npm run ng build -- --prod --output-path=dist

# now create nginx server
FROM nginx:alpine

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

ENV API_BASE_URI /api
ENV BASE_HREF /

# Copy nginx config to serve refresh pages
COPY nginx.conf /etc/nginx/

# copy artifacts from build-env
COPY --from=build-env /app/dist /usr/share/nginx/html

ENTRYPOINT nginx -g 'daemon off;'
