FROM nlescstoryteller/storyteller

VOLUME /data

WORKDIR /src/query-builder-server/

CMD ["npm", "start"]
