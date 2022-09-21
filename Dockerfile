
## Use Nginx alpine image
FROM nginx:stable-alpine as nginx

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## Copy build folder to default nginx public folder
COPY ./build /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
