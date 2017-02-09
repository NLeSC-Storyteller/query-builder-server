# Compilation instructions.

## For Linux.

For Linux we need to create a shared library (.so file) by compiling
``xenon_functions.c`` together with a copy of sqlite3's header file, which we
can do as follows:

```
# install the dependencies, including sqlite3
npm install
# extract sqlite3.h and sqlite3ext.h from the tar that npm downloaded
cd sqlite/funcs
tar -xvzf ../../node_modules/sqlite3/deps/sqlite-autoconf-3150000.tar.gz sqlite-autoconf-3150000/sqlite3.h
tar -xvzf ../../node_modules/sqlite3/deps/sqlite-autoconf-3150000.tar.gz sqlite-autoconf-3150000/sqlite3ext.h
# move the relevant header files to the current directory
mv sqlite-autoconf-3150000/sqlite3.h sqlite-autoconf-3150000/sqlite3ext.h .
# remove the now empty directory
rm -rf sqlite-autoconf-3150000
# compile xenon_functions against the header files from sqlite3
gcc -lm -fPIC -shared xenon_functions.c -o libxenonfunctions.so -L./sqlite3.h -L./sqlite3ext.h
# then test if the library works with
cd ../..
npm start
```

## For Windows.
For windows we need to create a .dll file. To create such file in Linux to then
be used in Windows you need to compile the library using mingw (32 and 64 bist
windows).
```
# For Ubuntu
sudo apt-get install mingw64 mingw64-binutils mingw64-runtime
```

After the installation of mingw the default lib and include directories are
located at /usr/. To link with sqlite3 it is required to recompile sqlite3 using
mingw. 
```
# Get sqlite3
wget http://www.sqlite.org/snapshot/sqlite-snapshot-201701121910.tar.gz
tar -xzf sqlite-snapshot-201701121910.tar.gz
cd sqlite-snapshot-201701121910/
./configure --host=mingw32 CC="i586-mingw32msvc-gcc" --prefix /usr/i586-mingw32msvc/
make
sudo make install
```

Once you have compiled and installed sqlite3 using mingw the next step is to create the .dll file.
```
i586-mingw32msvc-gcc -g -shared xenon_functions.c -o libxenonfunctions.dll
```
