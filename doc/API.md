**Show Tables**
----
  Returns json data about the tables in the sqlite db.

URL | Method | URL_params | Data_params 
--- | -------| ---------- | -----------
/list | 'GET' | None | None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{"name":"entities"},{"name":"sqlite_sequence"},{"name":"instances"}]`
 
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
    
**Get Root Node**
----
  Returns json data corresponding with the root node in the database.

URL | Method | URL_params | Data_params 
--- | -------| ---------- | -----------
/root | 'GET' | None | None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{"id":1,"url":"http://dbpedia.org/ontology/www.w3.org/2002/07/owl#Thing","name":"www.w3.org/2002/07/owl#Thing","mention_count":84027,"instance_count":0,"parent_id":null}]`
 
* **Error Response:**

  None

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/root",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
  
**Get All Nodes**
----
  Returns json data corresponding with all of the nodes in the database.

URL | Method | URL_params | Data_params 
--- | -------| ---------- | -----------
/ | 'GET' | None | None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{"id":1,"url":"http://dbpedia.org/ontology/www.w3.org/2002/07/owl#Thing","name":"www.w3.org/2002/07/owl#Thing","mention_count":84027,"instance_count":0,"parent_id":null},{"id":2,"url":"http://dbpedia.org/ontology/Activity","name":"Activity","mention_count":1,"instance_count":0,"parent_id":1}, ...]`
 
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
  
**Get Node By ID**
----
  Returns json data corresponding with the node corresponding to ID in the database.

URL | Method | URL_params | Data_params 
--- | -------| ---------- | -----------
/node/:id | 'GET' | Required | None
          |       | `id=[integer]` | 

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{"id":12,"url":"http://dbpedia.org/ontology/Bank","name":"Bank","mention_count":1180,"instance_count":248,"parent_id":10}]`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{ error : "User doesn't exist" }`

* **Sample Call:**

  ```javascript
    $.ajax({
      url: "/node/12",
      dataType: "json",
      type : "GET",
      success : function(r) {
        console.log(r);
      }
    });
  ```
