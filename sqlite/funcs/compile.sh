gcc -fPIC -shared xenon_functions.c -o libxenonfunctions.so -lm
#You must have installed mingw
i586-mingw32msvc-gcc -g -shared xenon_functions.c -o libxenonfunctions.dll -lsqlite3
