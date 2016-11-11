**Show Tables**
----
  Returns json data about the tables in the sqlite db.

* **URL**

  /list
  
* **Method:**

  `GET`
  
* **URL Params**

  None

* **Data Params**

  None

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

* **URL**

  /root
  
* **Method:**

  `GET`
  
* **URL Params**

  None

* **Data Params**

  None

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


* **URL**

  /
  
* **Method:**

  `GET`
  
*  **URL Params**

  None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `[{"id":1,"url":"http://dbpedia.org/ontology/www.w3.org/2002/07/owl#Thing","name":"www.w3.org/2002/07/owl#Thing","mention_count":84027,"instance_count":0,"parent_id":null},{"id":2,"url":"http://dbpedia.org/ontology/Activity","name":"Activity","mention_count":1,"instance_count":0,"parent_id":1}, ...`
 
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
