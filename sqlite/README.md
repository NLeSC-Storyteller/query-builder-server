#SQLite extended functionality
SQLite allows new functionality to be added using the C/C++ interface, more information can be found at [SQLite Run-time Loadable Extensions](http://sqlite.org/loadext.html).

##Xenon functions
For Xenon there is the file xenon_functions.c to which an user can add more functions to interact with Xenon from SQLite.
To add a new function the user should do the following as it was done for xenon_query:
```
#Define the user's C function

#Define the C function to extend SQLite

#Register the function

```

To call the function from SQL the user should do the following:
```
#Load the module
.load '<path_to_module.so>/libxenonfunctions
#Simple call
select xenon_query(<query_id>, <query>);
```

##Create a trigger using an extension function
First a table should be created.
```
sqlite3 <path_to_database>/<database>.db < ./sqlite/sql/tables.sql
```
Then the trigger can be created.
```
#Create a trigger which for each added row calls xenon_query using row's query_id and row's query as parameters.
sqlite3 <path_to_database>/<database>.db < ./sqlite/sql/trigger.sql
```
Any insertion on the table will trigger the run of xenon_query.
```
sqlite3 <path_to_database>/<database>.db < ./sqlite/sql/insert.sql
```

