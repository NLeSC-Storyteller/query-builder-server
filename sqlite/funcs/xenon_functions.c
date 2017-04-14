#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <assert.h>
#include <math.h>
#include "sqlite3ext.h"

SQLITE_EXTENSION_INIT1
#define BUILDING_DLL

/*Xenon function to run queries*/
void xenon_run_query( const unsigned int query_id, const unsigned char* query, const unsigned int mention_limit )
{
    /*Determines the length of query_id as string. It accepts negative numbers*/
    int query_id_len = (query_id == 0 ? 1 : ((int)(log10(fabs(query_id))+1) + (query_id < 0 ? 1 : 0)));
    int query_len = strlen(query);

    /*Length of the static text below plus 1 for end string character*/
    int txt_len = 64, out_len = 0;
    int buf_size = sizeof(char)*(txt_len + query_id_len + query_len);
    char *cmd = NULL;

    if ( (cmd = (char*) malloc(buf_size)) == NULL) {
        fprintf(stderr, "xenon_run_query: malloc failed!!!");
        exit(1);
    }
    while (sprintf(cmd, "curl --data \"id=%d&query=%s&mention_limit=%d\" http://daemon:4567/submit", query_id, query, mention_limit) > buf_size) {
        buf_size *=2;
        if ( (cmd = (char*) realloc(cmd, buf_size)) == NULL) {
            fprintf(stderr, "xenon_run_query: realloc failed!!!");
            exit(1);
        }
    }

    system(cmd);

    if (cmd)
        free(cmd);
}

void xenon_query(sqlite3_context *context, int argc, sqlite3_value **argv)
{
    assert( argc == 3);
    const unsigned int query_id = sqlite3_value_int(argv[0]);
    const unsigned char* query = sqlite3_value_text(argv[1]);
    const unsigned int mention_limit = sqlite3_value_int(argv[2]);
    xenon_run_query( query_id, query, mention_limit );
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
    rc = sqlite3_create_function(db, "xenon_query", 3, SQLITE_UTF8, NULL, &xenon_query, NULL, NULL);

    return rc;
}
