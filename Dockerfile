#FROM ubuntu
#RUN apt-get update
#RUN apt-get install -y git nodejs npm
#RUN git clone git://github.com/DuoSoftware/DVP-ReportQueryFilterse.git /usr/local/src/reportqueryfilters
#RUN cd /usr/local/src/reportqueryfilters; npm install
#CMD ["nodejs", "/usr/local/src/reportqueryfilters/app.js"]

#EXPOSE 8846
# FROM node:9.9.0
# ARG VERSION_TAG
# RUN git clone -b $VERSION_TAG https://github.com/DuoSoftware/DVP-ReportQueryFilters.git /usr/local/src/reportqueryfilters
# RUN cd /usr/local/src/reportqueryfilters;
# WORKDIR /usr/local/src/reportqueryfilters
# RUN npm install
# EXPOSE 8846
# CMD [ "node", "/usr/local/src/reportqueryfilters/app.js" ]


FROM node:10-alpine
WORKDIR /usr/local/src/reportqueryfilters
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8846
CMD [ "node", "app.js" ]
