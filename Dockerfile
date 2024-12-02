FROM php:apache

# Install mysqli extension
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli

# Copy your PHP configuration if needed
COPY php.ini /usr/local/etc/php/
