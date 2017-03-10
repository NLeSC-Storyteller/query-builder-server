FROM nlescstoryteller/storyteller

VOLUME /data

WORKDIR /src/query-builder-server/

EXPOSE 5000
CMD ["npm", "start"]
