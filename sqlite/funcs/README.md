#Compilation instructions.

##For Linux.
For Linux we need to create a .so file. To create such file run the following command:
```
gcc -lm -fPIC -DSQLITE_CORE -shared xenon_functions.c -o libxenonfunctions.so
```

##For Windows.
For windows we need to create a .dll file. To create such file in Linux to then be used in Windows you need to compile the library using mingw (32 and 64 bist windows).
```
#For Ubuntu
sudo apt-get install mingw64 mingw64-binutils mingw64-runtime
```

After the installation of mingw the default lib and include directories are located at /usr/.
To link with sqlite3 it is required to recompile sqlite3 using mingw. 
```
#Get sqlite3
wget http://www.sqlite.org/snapshot/sqlite-snapshot-201701121910.tar.gz
tar -xzf sqlite-snapshot-201701121910.tar.gz
cd sqlite-snapshot-201701121910/
./configure --host=mingw32 CC="i586-mingw32msvc-gcc" --prefix /usr/i586-mingw32msvc/
make
sudo make install
```

Once you have compiled and installed sqlite3 using mingw the next step is to create the .dll file.
```
i586-mingw32msvc-gcc -lm -DSQLITE_CORE -g -shared xenon_functions.c -o libxenonfunctions.dll -lsqlite3
```
