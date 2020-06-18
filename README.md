# graphql-node

This repository contains an implementation of a GraphQL server (created with graphql-yoga) that uses Prisma 2 as a data layer to a mySQL
database.
It follows the tutorial from [How To GraphQL](https://www.howtographql.com/graphql-js/0-introduction/) which teaches how to create a
backend for a blog app.
This specific app allows for user creation and authentication (using JWT) as well as the CRUD operations on links that would be added to the blog and votes that users can give to links they like.

I assume you have an understanding of GraphQL going into this, so I don't talk too much about what resolvers are or the GraphQL schema (and the type system).
If you are new to GraphQL, I suggest [How To GraphQL](https://www.howtographql.com/) and [GraphQL](https://graphql.org/learn/) as references to learn the different concepts that exist in GraphQL as well as how it differs from REST and what problems it aims to solve.

In order to use this application, there are two steps you need to do for set up before things can run (aside from just installing dependencies).

Prisma is setup with the use of a configuration file (referred to as the Prisma schema - the file is usually named prisma.schema).
In this application, you find the schema in [here](./src/prisma/schema.prisma).

There are three parts to a Prisma schema:
  - Data Source: Specify the data sources Prisma will connect to
  - Generator: Specify the Prisma client that will be generated (for application to use)
  - Data Model: Specify the form of the data and their relations
Here's a link for more info on [Prisma schemas](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-schema), which contains info on all three parts for further knowledge.

Let's begin with the data source which contains two properties: the provider and the url.

The provider refers to the DB connector that will be used.
It is possible to use mySQL, PostgreSQL and SQLite, I used mySQL as you'd see from the schema.prisma file but you can use whatever you are comfortable with.
All you would need to do is update the provider from "mysql" to "postgresql" or "sqlite".  


At this point, you should go ahead and create the database instance, once completed just plug in the URL (or filename, in the case of sqlite) for the url property.
You can either hardcode the URL or store it in an environment variable (as well as other properties).
In this application, I used environment variables (the url is labelled DATABASE_URL).

[Here](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-schema/data-sources/) is a reference to how the completed data source would look for each provider.

> ##### A note on environment variables and Prisma
>If you have a global .env file, you might run into some trouble in getting properties to be read by Prisma as I did.
Prisma offers a solution that can be found [here](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-schema#using-environment-variables) which involves creating an .env3 file but that didn't work out for me.
I ended up having to create a seperate .env file in the prisma directory alongside my global .env file.
Considering it caused me some issue, I thought I should mention it.

After adding your preferred data source (and assuming you've installed dependencies at some point).
You need to generate the Prisma client that the code uses to access Prisma, to do so, navigate to the [prisma](./src/prisma/) directory and run `npx prisma generate`.
This will read your schema file to generate the client for the code.

The specific client generated is for JavaScript (as detailed in the provider property in the generator block).
Looking at the [schema](./src/prisma/schema.prisma), if you wanted to created a TypeScript based client you would change the provider from *"prisma-client-js"* to *"prisma-client-ts"*.
[Here's](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/generating-prisma-client) a reference on generating the Prisma client.

After generating the client which will provide the Prisma functionality for the specified data model, you need to migrate the model to your database (to initialize the tables).

Migration refers to updating (or creating) a database schema based on the specification of your Prisma models (prisma model defines database schema).

[Here's](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-migrate#prisma-migrate-vs-sql-migrations) a reference on Prisma migration.

In this schema, there are 3 Prisma [models](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-schema/models/) (user, link, vote) which will correspond to 3 tables being created in the database.


Model migration is still an experimental feature, so you might find some issues with columns or tables not being created per specification, I found that I needed to delete the migrations/ directory that gets created when you migrate your models (the migrations/ directory contains information on your migrations that gets used to create the tables in your database).

In some cases, I had to drop all the tables in my database as well and re-do the migrations.

Again, it is an experimental feature so there are parts that may become cumbersome, you might even find it easier to use introspection (which will be mentioned later).

Once the migration is done, refer back to your database instance to make sure the tables are created as specified (correct columns, correct data types, etc.).

In Prisma, you can create the database schema and then generate your data models based off that (database schema defines prisma model).   
This is referred to as introspection, [here's](https://www.prisma.io/docs/reference/tools-and-interfaces/introspection) a reference to more information on it in case you want to go in that direction.

This is useful if you are more comfortable with creating your tables in SQL as opposed to using Prisma (especially if you're just starting with Prisma) or if you don't want to deal with issues that may arise with migration.

For authentication, this application uses Jsonwebtoken (JWT), [here's](https://www.npmjs.com/package/jsonwebtoken) a reference, just to understand how the library works (for learning JWT in general, I suggest the main site [jwt.io](https://jwt.io)).

If you're more interested in just getting the app to work, the JWT library requires a secret to create a token with.

I put this secret (labelled APP_SECRET) in my global .env file (located in the root directory).

You can also opt to hard code the secret in the code however you would have to maintain it over multiple files.

In an application like this, it's fine since the secret is used in only two places: the [utils file](./src/utils.js) and the [Mutation resolver](./src/resolvers/Mutation.js).


Once you have created the Prisma client and have a synchronized data model and database schema, you can run the application with `node index.js` and navigate to localhost:9001/graphiql to use an interactive playground to test our the API.

Port 9001 is hardcoded into the [index.js] file, however you can specify a different port and put it into your .env file.

Similarily, you can also change the endpoints for the GraphQL API and the playground.

For more information on how the server was created, I recommend the [graphql-yoga](https://github.com/prisma-labs/graphql-yoga) GitHub page for reference. 
