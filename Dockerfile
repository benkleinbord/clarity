FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install
COPY . . 
LABEL version="1.0.0"
LABEL name="employeeService"
EXPOSE 8008

CMD ["npm","start"]

#docker build -t employee-service-image
#docker run -p 8008:8008 --name employeeService my-node-image
