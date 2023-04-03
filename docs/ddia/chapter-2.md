---
sidebar_position: 2
---

# Chapter 2: Data Models and Query Languages

## Relational model vs document model

** Impedence mismatch **: If data is stored in relational tables, an awkward translation layer is required between the objects in the application code and the database model of tables, rows and columns.

JSON model reduces the impedance mismatch and the lack of schema is often cited as an advantage.

JSON representation has better locality than the multi-table SQL schema. All the relevant information is in one place, and one query is sufficient.
:::info
For relational models, if data is split across multiple tables, multiple index lookups are required to retrieve it all, which may require more disk seeks and take more time

For document models, the database need ot load the entire document which can be wasteful on larger documents. On updates, the entire document usually needs to be re-written.
:::

In relational databases, it's normal to refer to rows in other tables by ID, because joins are easy. In document databases, joins are not needed for one-to-many tree structures, and support for joins is often weak.

If the database itself does not support joins, you have to emulate a join in application code by making multiple queries.

| Relational Model                                                                            | Document Model                                                 |
| ------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Better support for joins                                                                    | Schema flexibility                                             |
| Many-one relationships                                                                      | Better performance due to locality                             |
| **Schema-on-write**:schema is explicit and database ensures all written data conforms to it | **Schema-on-read**: implicit schema not forced by the database |
| Many-Many relationships                                                                     |                                                                |

## Query Languages for Data

SQL is a declarative query language.

In a declarative query language you just specify the pattern of the data you want, but not how to achieve that goal.
It also hides the implementation details of the database engine, makes it possible for the database system to introduce performance improvements
without requiring any changes to the queries.

In an imperative language, you tell the computer to perform certain operations in order. Imperative code is very hard to
parallelize across multiple cores and machines but it specifies instructions that must be performed in a particular order.

Declarative languages have a better change of getting faster in parallel execution as they specify only the pattern of results not the algorithm used to determine them.

## Graph-like data models

If many-to-many relationships are very common in your application, it becomes more natural to start modelling your data as a graph.

A graph consists of vertices (nodes or entities) and edges (relationships or arcs).

Well-known algorithms can operate on these graphs, like the shortest path between two points, or popularity of a web page.

There are several ways of structuring and querying the data. The property graph model (implemented by Neo4j, Titan, and Infinite Graph) and the triple-store model (implemented by Datomic, AllegroGraph, and others). There are also three declarative query languages for graphs: Cypher, SPARQL, and Datalog.

**Property graphs**

Each vertex consists of:

- Unique identifier
- Outgoing edges
- Incoming edges
- Collection of properties (key-value pairs)

Each edge consists of:

- Unique identifier
- Vertex at which the edge starts (tail vertex)
- Vertex at which the edge ends (head vertex)
- Label to describe the kind of relationship between the two vertices
- A collection of properties (key-value pairs)

Graphs provide a great deal of flexibility for data modelling. Graphs are good for evolvability.
