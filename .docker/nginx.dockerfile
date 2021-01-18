FROM nginx:1.18-alpine

ENV WEB_PORT=8080

# Install packages and remove default server definition
RUN apk --no-cache add supervisor
RUN rm /etc/nginx/conf.d/default.conf

# Configure nginx
ADD config/nginx.conf /etc/nginx/nginx.conf

# Configure supervisord
ADD config/supervisord/nginx/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

RUN mkdir -p /var/www/html

WORKDIR /var/www/html

RUN chown -R nobody.nobody /var/www/html && chown -R nobody.nobody /run

# Switch to use a non-root user from here on
USER nobody

# Expose the port nginx is reachable on
EXPOSE ${WEB_PORT}

# Let supervisord start nginx
CMD ["/usr/bin/supervisord","-c", "/etc/supervisor/conf.d/supervisord.conf"]
