# long story short

- ``/list``
- ``/table/:id``
- ``/table/:id/children``
- ``/search/table/:text``
- ``/queries``
- ``/queriesbyusername/:username``
- ``/addquery``

# long story long

**List**
----
  Returns json data about the tables in the sqlite database.

* **URL**

  /list

* **Method:**

  `GET`
  
*  **URL Params**

  None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

    ```javascript
    [{
        "name": "light"
    }, {
        "name": "dark"
    }, {
        "name": "queries"
    }, ...]
    ```

* **Error Response:**

  None

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/list",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```

**Get Specific Node data from table**
----
  Returns json data corresponding to the node with ID equal to ``:id`` from the table ``table``. defined tables are ``light``, ``dark``, ``concepts``, ``events``, ``authors``, ``cited``, , ``topics`` and ``perspectives``.

* **URL**

  /table/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

    ```javascript
    [{
        "id": 4,
        "name": "Scientist",
        "isinstance": 0,
        "childof": 3,
        "childcount": 0,
        "instancecount": 18,
        "mentioncount": 177,
        "query": "http://dbpedia.org/ontology/Scientist",
        "query_type": "entityType"
    }]
    ```

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "ID doesn't exist" }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/light/4",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```

**Get children data from table**
----
  Returns json data corresponding to the node with ID equal to ``:id`` from the table ``table``. defined tables are ``light``, ``dark``, ``concepts``, ``events``, ``authors``, ``cited``, , ``topics`` and ``perspectives``.

* **URL**

  /table/:id/children

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `id=[integer]`

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

    ```javascript
    [{
        "id": 3,
        "name": "Person",
        "isinstance": 0,
        "childof": 2,
        "childcount": 14,
        "instancecount": 59,
        "mentioncount": 491,
        "query": "http://dbpedia.org/ontology/Person",
        "query_type": "entityType"
    }, {
        "id": 175,
        "name": "Organisation",
        "isinstance": 0,
        "childof": 2,
        "childcount": 9,
        "instancecount": 10,
        "mentioncount": 384,
        "query": "http://dbpedia.org/ontology/Organisation",
        "query_type": "entityType"
    }, {
        "id": 281,
        "name": "Ministry_of_Defence_(United_Kingdom)",
        "isinstance": 1,
        "childof": 2,
        "childcount": 0,
        "instancecount": 0,
        "mentioncount": 1,
        "query": "http://dbpedia.org/resource/Ministry_of_Defence_(United_Kingdom)",
        "query_type": "lightEntityInstance"
    }]
    ```

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "No children found" }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/light/5/children",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```

**Recursively search nodes for text**
----
  Returns a list of id's of nodes with a substring equal to ``:text`` int he table ``table`` and, recursively, the parents of these nodes.

* **URL**

  /search/table/:text

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `text=[string]`

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

    ```javascript
    [{
        "myID": 2
    }, {
        "myID": 1
    }]
    ```

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/search/event/validate",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```

**List queries**
----
  Returns a list of all of the queries in the database, including their status.

* **URL**

  /queries

* **Method:**

  `GET`
  
*  **URL Params**

   None

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

    ```javascript
    [{
        "id": 1,
        "username": "maarten",
        "status": 1,
        "query": "--eventType fn:Objective_influence"
    }, {
        "id": 2,
        "username": "piek",
        "status": 1,
        "query": "--eventType fn:Transitive_action"
    }, {
        ...
    }]
    ```

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/queries",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```

**List queries of a specific username**
----
  Returns a list of all of the queries in the database of user ``username``, including their status.

* **URL**

  /queriesbyusername/:username

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**

   `username=[string]`

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

    ```javascript
    [{
        "id": 1,
        "username": "maarten",
        "status": 1,
        "query": "--eventType fn:Objective_influence"
    }, {
        "id": 5,
        "username": "maarten",
        "status": 1,
        "query": "--eventType fn:Transitive_action"
    }, {
        ...
    }]
    ```

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/queriesbyusername/maarten",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```

**Add a query to be processed by the knowledgestore**
----
  Adds a query to the database, which will be processed in the background by Xenon.

* **URL**

  /addquery

* **Method:**

  `POST`
  
* **URL Params**

    None

* **Data Params**

    ```javascript
    {
      "username": [string],
      "query": [string]
    }
    ```

* **Success Response:**

* **Code:** 200 <br />

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/addquery",
      dataType: "json",
      data: {
        "username": "maarten",
        "query": "--eventType fn:Transitive_action"
      },
      type : "POST",
      success : function(r) {
        console.log(r);
      }
    });
  ```
