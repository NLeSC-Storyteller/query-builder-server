#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <assert.h>
#include "sqlite3ext.h"

SQLITE_EXTENSION_INIT1
#define BUILDING_DLL

/*Xenon function to run queries*/
void xenon_run_query( const unsigned int query_id, const unsigned char* query)
{
    char cmd[100];
//    sprintf(cmd, "echo \"%d %s\" >> xenon.out", query_id, query);
//    system(cmd);
    sprintf(cmd, "curl --data \"id=%d&query=%s\" http://localhost:4567/submit", query_id, query);
    system(cmd);
}

void xenon_query(sqlite3_context *context, int argc, sqlite3_value **argv)
{
    assert( argc == 2);
    const unsigned int query_id = sqlite3_value_int(argv[0]);
    const unsigned char* query = sqlite3_value_text(argv[1]);
    xenon_run_query( query_id, query);
}

/*Add functions as extensions to SQLite*/
#ifdef _WIN32
__declspec(dllexport)
#endif

int sqlite3_xenonfunctions_init(
    sqlite3 *db, 
    char **pzErrMsg,
    const sqlite3_api_routines *pApi
){
    int rc = SQLITE_OK;
    SQLITE_EXTENSION_INIT2(pApi)

    /*Create all the functions*/
    rc = sqlite3_create_function(db, "xenon_query", 2, SQLITE_UTF8, NULL, &xenon_query, NULL, NULL);

    return rc;
}
