Server component for the Query Builder platform. Will serve a sqlite database (made with https://github.com/NLeSC-Storyteller/query-builder-preprocessing) with a REST API. Services both https://github.com/NLeSC-Storyteller/query-builder-client and https://github.com/NLeSC/UncertaintyVisualization/

Includes a custom trigger for the sqlite database on INSERT in the queries table, that will fire a Xenon function as defined by https://github.com/NLeSC-Storyteller/query-builder-daemon.

To start the database server:
```bash
npm start
```

Expected console output for starting this component:
```
$ npm start

> query-builder-server@1.0.0 start /src/query-builder-server
> node src/server.js

Query-Builder-Server started. logging enabled.
Example app listening on port 5000!
```

Please find the REST API here: https://github.com/NLeSC-Storyteller/query-builder-server/blob/master/doc/API.md
