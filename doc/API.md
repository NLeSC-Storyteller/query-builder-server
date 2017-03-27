# long story short

- ``/``
- ``/list``
- ``/node/:id``
- ``/node/:id/children``
- ``/node/:id/children``
- ``/node/:id/children``
- ``/root``



# long story long


## ``/``

Returns json data corresponding with all of the nodes in the database.

URL | Method | URL_params | Data_params
--- | -------| ---------- | -----------
``/`` | 'GET' | None | None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

    ```javascript
    [{
        "child_of": null,
        "id": 1,
        "is_entity": 1,
        "is_expandable": 1,
        "is_instance": 0,
        "mention_count": 84027,
        "name": "www.w3.org/2002/07/owl#Thing",
        "type": "eventType",
        "query": "http://dbpedia.org/ontology/www.w3.org/2002/07/owl#Thing",
        "url": "http://dbpedia.org/ontology/www.w3.org/2002/07/owl#Thing"
    }, {
        "child_of": 1,
        "id": 2,
        "is_entity": 1,
        "is_expandable": 1,
        "is_instance": 0,
        "mention_count": 1,
        "name": "Activity",
        "type": "eventType",
        "query": "http://dbpedia.org/ontology/Activity",
        "url": "http://dbpedia.org/ontology/Activity"
    }, {
        "child_of": 2,
        "id": 3,
        "is_entity": 1,
        "is_expandable": 1,
        "is_instance": 0,
        "mention_count": 1,
        "name": "Game",
        "type": "eventType",
        "query": "http://dbpedia.org/ontology/Game",
        "url": "http://dbpedia.org/ontology/Game"
    }, ...]
    ```


* **Error Response:**

  None

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```


## ``/list``

Returns json data about the tables in the sqlite database.

URL | Method | URL_params | Data_params
--- | -------| ---------- | -----------
``/list`` | 'GET' | None | None

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

## ``/node/:id``

Returns json data corresponding to the node with ID equal to ``:id``.

URL | Method | URL_params | Data_params
--- | -------| ---------- | -----------
``/node/:id`` | 'GET' | Required | None
          |       | `id=[integer]` |

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

    ```javascript
    [{
        "child_of": 5,
        "id": 10,
        "is_entity": 0,
        "is_expandable": 0,
        "is_instance": 1,
        "mention_count": 1,
        "name": "United_Nations_Economic_and_Social_Council",
        "type": "agentInstance",
        "query": "http://dbpedia.org/resource/United_Nations_Economic_and_Social_Council",
        "url": "http://dbpedia.org/resource/United_Nations_Economic_and_Social_Council"
    }]
    ```

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "ID doesn't exist" }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/node/10",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```

## ``/node/:id/children``

Returns json data corresponding to the children of node with ID equal to ``:id``.

URL | Method | URL_params | Data_params
--- | -------| ---------- | -----------
``/node/:id/children`` | 'GET' | Required | None
                   |       | `id=[integer]` |

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

    ```javascript
    [{
        "child_of": 5,
        "id": 6,
        "is_entity": 0,
        "is_expandable": 0,
        "is_instance": 1,
        "mention_count": 18,
        "name": "Decree",
        "type": "lightEntity",
        "query": "http://dbpedia.org/resource/Decree",
        "url": "http://dbpedia.org/resource/Decree"
    }, {
        "child_of": 5,
        "id": 7,
        "is_entity": 0,
        "is_expandable": 0,
        "is_instance": 1,
        "mention_count": 4,
        "name": "Circa",
        "type": "lightEntity",
        "query": "http://dbpedia.org/resource/Circa",
        "url": "http://dbpedia.org/resource/Circa"
    }, {
        "child_of": 5,
        "id": 8,
        "is_entity": 0,
        "is_expandable": 0,
        "is_instance": 1,
        "mention_count": 3,
        "name": "Justice",
        "type": "lightEntity",
        "query": "http://dbpedia.org/resource/Justice",
        "url": "http://dbpedia.org/resource/Justice"
    }, {
        "child_of": 5,
        "id": 9,
        "is_entity": 0,
        "is_expandable": 0,
        "is_instance": 1,
        "mention_count": 1,
        "name": "Nova",
        "type": "lightEntity",
        "query": "http://dbpedia.org/resource/Nova",
        "url": "http://dbpedia.org/resource/Nova"
    }, ...]
    ```

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "No children found" }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/node/5/children",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```

## ``/search/node/:text``

Returns a list of id's of nodes with a substring equal to ``:text`` and, recursively, the parents of these nodes.

URL | Method | URL_params | Data_params
--- | -------| ---------- | -----------
``/search/node/:text`` | 'GET' | Required | None
                   |       | `text=[string]` |

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

    ```javascript
    [ 5, 2, 1 ]
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

## ``/queries``

Returns a list of all of the queries in the database, including their status.

URL | Method | URL_params | Data_params
--- | -------| ---------- | -----------
``/queries`` | 'GET' | None | None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

    ```javascript
    [ 5, 2, 1 ]
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

## ``/root``

Returns json data corresponding with the root node in the database. This is simply an alias for ``/node/1``.
