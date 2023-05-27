# Really simple Postgresql server

This docker containerized server is up and running in seconds.  Has the features any good developer demands:

1. Quick and Easy to setup

2. Persistent data.  Data sticks around even after container is destoyed.

3. Easy to Backup and Resotre

4. Runs psql command line and you can quickly develop and test your sql.


This little simple javascript console app (index.js). Illustrates an easy way to connect to this new database. Even accepts a parameter for a psql file, that it will run against the server.

The Postgresql server is created from one file (docker-compose.yml). This yml file will run the server with a container name for easy reference (instead of that long container id).  It maps a volume to a data folder in the current directory. Warning Docker creates this file, so do not create it yourself.  Also maps a port 5432 from inside to 5432 in your local 
computer.  You change the port number on the left side to have your apps access it from  different local port. This can be handy if you are running 3 local istes locally with 3 different postgresql servers.  Example - 5451:5432  on site 2 5452:5432, ... 

you can choose your own container name, port.  local-postgres is just the name for this starter. I personally will be using shorter names without the "-" for myself.

## Start Server
 
     $ docker-compose up -d

 The above command will tell dockerto download the the latest postgresql server image file. Then it will create a running containter named local-postgres on port 5432.  That's it!

 To stop the docker container:
 $ docker-compose stop

 This will keep the container for you to use again at a later time.

 To estroy the container .

     $ docker-compose down

You can also destroy it from anywhere on your computer by removing it by container name:

    $ docker rm local-postgres -f

 The -f forces it to be removed, even if it is running.

 Do not worry regardless the data is still present and can be spun up again with all the data contined in the Postgresql server database.:

      docker-compose up -d

 


## Sample psql files
Inside the psql folder you will find a few psql files.  You can run any of these as follows.  Keep in mind the database has only test_db and no tables when first created.

You can add data in multiple ways. I present 3 ways  for your convenience.

1. run enclosed app with the provided psql/*.psql files. 

2.  psql to run the sql files and/or  manual queries.

3.  restore //One backup (dump*.psql) file is provided.


###   Console app running it.

This console app can add the data and verify your postgresql server is running.

A one ime step is to install the program dependencies.

    $ npm install

The above command will install all depencies for this console app. 

Once installed and postgres server is runing. You can run this console app.

    $ npm run start

This runs the app with no parameters and uses the default query.  { SELECT NOW()}. This just displays the server time. This proves the server is up and running.

Now you are ready to run queries with this console app. Now in order to input parameters into the console app you will have a different command to run.:

    $ node index.js [psql file]

## Adding data via console app

I provided numerous psql files in the psql folder for you to test. Feel free to write your own.

    $ node index.js psql/adddata.psql

The above will create the users table if need be and add users to the table. Run the users query to verify they were added.

    $ node index users.psql

## Adding data via PSQL prompt
This way you can run psql queries I wrote or you can manually type in. First thing you will have to do is start the docker container command shell prompt:

    $ docker -it local-postgres bash

The above command opens the conatiner and places you inside the shell.  Bash is the default shell for linux based containers. 


Now you can run other commands, and in our case we want to start psql prompt.
    $ psql -Uadmin -d test_db

The above psql will open the psql prompt for the test_db that our yml file created earlier.   We use the capital letter "U" parameter and  enter our user id "admin".  If we had named the db in the yml admin, this would not be neccessary, since psql opens the users database as a default.

Now you can manually type in psql commands for example:

    test_db# SELECT NOW();

 Above query displays time and date.  Notice all querys must end with ";".

 Now if you want to run the psql files I provide ou will need to do the following:

 Open another terminal and type int ehe following:
     $ docker cp *.psql local-postgres:.

 The above will copy all your psql files into your container.  Now you can run the queries from the psql prompt.  You may have wanted to create a create sub folder for organization sake. In the earlier docker bash command shell. 

 Now enter the psql quiry in the other terminal:

     test_db# \i adddata.psql

 This will run the psql query found in the container.  The \i means input file. No need for simicolon for the "\" commands.

 ##  Restoring from a backup file

One dump*.sql file is provided for you to restore from. You can use this to restore the test_db to the state I backed it up.  You will find it has users, but no cities. This was done purposely, so that you can see and verify it as well. You will find  the command in the backup.txt and the dump*.sql files in the backup folder.  The backup.txt has the command below:

    $ cat dump.psql | docker exec -i local-postgres psql -d test_db -U admin 

Now to run the above command you will need to be in the backup folder or adjust the command appropiately.  Also you will need to ren the dump_date-time.psql file to dump.psql.  I did this for simpicity sake. Here is another approach you may consider and may be faster for large databases restore.

    $ docker exec -it local-postgres bash
```root$ mkdir psql
 **** Another terminal

     $docker cp dump.psql local-postgres:psql/.

    root$ cd psql
    root$ psql -d test_db -U admin  
test_db# \i dump.psql

Now you are running the restory command from inside the container without piping the file to the psql via cat command.

You create backups with the following command found in the backup.txt file as well.

    docker exec -i local-postgres pg_dumpall -c -U admin > dump_`date +%d-%m-%Y"_"%H_%M`.psql

## Resources and references

You can find my repository at the folowing:
[postgresql-persistent-connect](http://github.com/lewislwood/postgresql-persistent-connect)

My inspiration for this repository can be found in the old folder. A simpler and even easier format to understand. Also a much better writer than myself.
[run-postgresql-with-docker-locally-and-connect](https://dev.to/mohsenkamrani/run-postgresql-with-docker-locally-and-connect-to-it-with-nodejs-451g#main-content)

I hope you found this repository and article  a good resources.  You can find my website at:

[Blind Heroes](http://blindheroes.org)

This is currently in WordPress and will soon be switching to Express, which I prefer.  Sty tuned.











