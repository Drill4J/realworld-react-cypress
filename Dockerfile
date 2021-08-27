FROM nginx:latest

# Copy nginx config
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Copy build
WORKDIR /var/www
COPY ./build ./

CMD nginx -g "daemon off;"