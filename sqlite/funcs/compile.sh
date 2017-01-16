gcc -lm -fPIC -DSQLITE_CORE -shared xenon_functions.c -o libxenonfunctions.so
#You must have installed mingw
i586-mingw32msvc-gcc -lm -DSQLITE_CORE -g -shared xenon_functions.c -o libxenonfunctions.dll -lsqlite3
