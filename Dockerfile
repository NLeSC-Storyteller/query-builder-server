FROM nlescstoryteller/storyteller

VOLUME /data

WORKDIR /src/query-builder-server/
COPY .
RUN npm install

EXPOSE 5000
CMD ["npm", "start"]
