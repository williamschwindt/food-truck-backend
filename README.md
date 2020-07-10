# Food-Truck Backend

_base url_: https://food-truck-dev1.herokuapp.com/api

> ## Auth
  - ### **POST** `/auth/register`
    - Returns the newly created user's id as well as a JSON Web Token.
    - Your request body must include a username, password and user_type.

  - ### **POST** `/auth/login`
    - Returns the newly created user's id as well as a JSON Web Token.
    - Your request body must include the username and password.

--------
________

> ## Users

  - ### **GET** `/users`
    - *PROTECTED*
    - Returns an array of all the users in the database.
  
  - ### **GET** `/users/:id`
    - *PROTECTED*
    - Returns the user with the specified id.
    
  - ### **PUT** `/users/:id`
    - *PROTECTED*
    - Returns the updated user.
    
  - ### **DELETE** `/users/:id`
    - *PROTECTED*
    - Deletes user.
    - No response body.
    
--------
________

> ## Stores

  - ### **GET** `/stores`
    - *PROTECTED*
    - Returns an array of all the stores in the db.
    
  - ### **GET** `/stores/:id`
    - *PROTECTED*
    - Returns the store with the specifed id.
    
  - ### **GET** `/stores/address/:address`
    - *PROTECTED*
    - Returns the store with the specified address.
    
  - ### **GET** 'stores/citystate/:citystate'
    - *PROTECTED*
    - Returns store with the specified citystate.
    - (example) bend, or.
    
  - ### **POST** `/stores`
    - *PROTECTED*
    - Request body needs store_name, store_address, and citystate.
    - Returns added store.
    
  - ### **PUT** `/stores/:id`
    - *PROTECTED*
    - Returns the updated store.
    
  - ### **DELETE** `/stores/:id`
    - *PROTECTED*
    - Deletes store.
    - No response body.

  - ### **GET** `/stores/:id/items`
    - *PROTECTED*
    - Returns an array of all items associated with specified store.
    
  - ### **POST** `/stores/:id/items`
    - *PROTECTED*
    - Request body needs name and price.
    - Returns the added item.
    
--------
________

> ## Items

  - ### **GET** `/items`
    - *PROTECTED*
    - Returns an array of all the items in the database.
  
  - ### **GET** `/items/:id`
    - *PROTECTED*
    - Returns the item with the specified id.
    
  - ### **PUT** `/items/:id`
    - *PROTECTED*
    - Returns the updated item.
    
  - ### **DELETE** `/item/:id`
    - *PROTECTED*
    - Deletes item.
    - No response body.




