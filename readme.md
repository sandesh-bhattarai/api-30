## Express
- Public accessible 
    /public
- code accessible
    /src


## Featrued CRUD 
- User Management
    a. User Create 
        method:     post
        url:        /user 
        payload:    TBD

    b. User List all 
        method:     get
        url:        /user 
        Payload:    querystring

    c. User Detail 
        method:     get
        url:        /user/:id
        payload:    not required
    
    d. User Update
        method:     put/patch
        url:        /user/:id
        payload:    TBD
    
    e. User Delete 
        method:     delete 
        url:        /user/:id
        payload:    not required


- user
- auth
- banner
    a. Create Banner 
        -> /banner, post method => payload: title, status, link, image: 
        -> response: {result: <content>, message: "Banner Created", meta: null}
    b. List All Banner 
        -> /banner,get method => payload: not required
        -> response: {result: [{_id: "", title: "", link: "", image: ""}], message: "All banner List", meta: null}
    c. Detail of a Banner 
        -> /banner/:id, get method => payload: not required
        -> response: {result: {_id: <Id>, title: "", link: "", image: ""}, message: "Banner Detail", meta: null}
    d. Edit Banner 
        -> /banner/:id, put method => payload: <same as of create>
        -> response: {result: {_id: <Id>, <response should be payload>}, message: "Banner Update", meta: null}
    d. Delete Banner 
        -> /banner/:id, delete method => payload: N/A
        -> response: {result: null, message: "Banner Deleted", meta: null}
- product
- category
- brand
- order

/src
    /config 
        => all the setting for project
    /router 
        => linked (controller call pass)
    /controller
        - user.controller.js
        - auth.controller.js
        ......
    /model 
        - user.model.js
        - auth.model.js
        - banner.model.js
        ......




/src
    /config 
        => all the setting for project
    /router 
        => linked (controller call pass)
    /modules
        /user
            - user.controller.js
            - user.model.js
            - user.router.js
            - user.service.js
            - user.middleware.js






# REST API 
- Sessionless
- stateless 

- Open ended API/Public
- Closed ended/private


                    UI                                                      REST API Server
------------------------------------------------------------------------------------------------------------------------
-> Open APi     ----------------------------------------------------------> - Receive
                                                                            - Validation 
                                                                            - Process    
                                                                            - Response (JSON)

-> Register/User Create --------------------------------------------------> - Login Check (TODO)
                                                                            - Check Permission (TODO)
                                                                            - File Upload (Completed)
                                                                            - Request Validae (Completed)
                                                                            - Regiser user(TODO)
                                                                            - OTP/token email svc 
                                                                                token => url 
                                                                                    -> FE URL/activate/token
                                                                            - response 

-> Activate Process     ---------- token ---------------------------------> - receive 
                                                                            - verify 
                                                                            - Activate 
                                                                                - notify 
                                                                            - Response 

-> Login Request ---------------------------------------------------------> - Receive 
                                                                            - Validate 
                                                                            - Process 
                                                                            - Response 
                                                                                - otp optional
                                                                                - token jwt (json based web token)
                                                                                - Bearer
                                                                                    - header.payload.signature
    - Store Cookie, localstorag <-------------------------------------------
                        Header: Authorization: bearer token
-> private API call -------------------------------------------------------->   - Verify token 
                                                                                - Receive the data
                                                                                ------------------


## 2 type DB
a. Relational DB
    - data relationship 
    - table to table 
    - sql db 
    for eg. mysql, postgresql, ms-sql, oracle, sqlite

b. Non-relational DB
    
    - mongodb


orders 
products 
users

orders
----------------
id  name                    product                 qty      price              amount              entry
--------------------------------------------------------------------------------------------------------------
1   Ram                     iPhone 12               1       120000              120000              Sandesh
--------------------------------------------------------------------------------------------------------------
2   ram                     iphone-12               1       110000              105000              sandesh


username                        users                   products                        
--------                       ----------              ---------------
id  name                       id     usernameId      id  name        price 
--------                       ---------------         -------------------------
1   Ram                        1       1             1   iPhone 12    120000
-------                        ---------------         
2   Sandesh                    2       1 
                               ---------------         
                               3       2

orders 
--------------- 
id      userId      productId        qty        amount          discount    entry
-------------------------------------------------------------------------------------
1       1           1               1           120000          0            3         
-------------------------------------------------------------------------------------
2       2           1               1           120000          10000       3



### MongoDB USer: 
api-30
### Mongodb Password: 
fC4txcddQ2rh5Ei5

mongodb+srv://api-30:fC4txcddQ2rh5Ei5@cluster0.nss1a.mongodb.net/


mongosh "mongodb+srv://cluster0.nss1a.mongodb.net/" --apiVersion 1 --username <username>


users
-------
{
    name: "",
    surname: ""
}

{
    fullname: ""
}


4 operations 
CRUD 
C- Create
R- Read 
U- Update 
D- Delete

## C- Create
- db.<collectionName/TableName>.insertOne(Object/JSON)
~SQL Insert => 
    INSERT INTO <table> (column, column1, ...., columnn) VALUES 
    (value, value1, ...,valuen),
    (value, value1, ...,valuen)

    INSERT INTO <table> SET 
        column = value, 
        column1 = value1,
        ...
        columnN = valueN

-> {acknowledge: <boolean>, insertedId: <ObjectI | undefined>}
e.g 
    db.users.insertOne({name: "", email: "", address: ""})

[{"name":"Ramesh Shrestha","email":"ramesh@example.com","address":"Kathmandu, Nepal","phone":"9845123456","role":"admin"},{"name":"Sita Rai","email":"sita@example.com","address":"Pokhara, Nepal","phone":"9779854321","role":"seller"},{"name":"Hari Tamang","email":"hari@example.com","address":"Biratnagar, Nepal","phone":"9867123450","role":"customer"},{"name":"Gita Thapa","email":"gita@example.com","address":"Bhaktapur, Nepal","phone":"9779845678","role":"customer"},{"name":"Sabin Bhattarai","email":"sabin@example.com","address":"Lalitpur, Nepal","phone":"9866123459","role":"seller"},{"name":"Anita Gurung","email":"anita@example.com","address":"Dharan, Nepal","phone":"9779865432","role":"customer"},{"name":"Bikash Shahi","email":"bikash@example.com","address":"Butwal, Nepal","phone":"9846123457","role":"admin"},{"name":"Kamala Thapa","email":"kamala@example.com","address":"Hetauda, Nepal","phone":"9779856789","role":"seller"},{"name":"Nabin Shrestha","email":"nabin@example.com","address":"Nepalgunj, Nepal","phone":"9867123458","role":"customer"},{"name":"Saraswati Rai","email":"saraswati@example.com","address":"Itahari, Nepal","phone":"9779845123","role":"customer"},{"name":"Rajesh Bhandari","email":"rajesh@example.com","address":"Birgunj, Nepal","phone":"9866123450","role":"seller"},{"name":"Kumari Gurung","email":"kumari@example.com","address":"Janakpur, Nepal","phone":"9779865432","role":"customer"},{"name":"Santosh Shahi","email":"santosh@example.com","address":"Dhangadhi, Nepal","phone":"9846123456","role":"admin"},{"name":"Ganga Thapa","email":"ganga@example.com","address":"Damak, Nepal","phone":"9779856789","role":"seller"},{"name":"Narendra Shrestha","email":"narendra@example.com","address":"Kalaiya, Nepal","phone":"9867123457","role":"customer"},{"name":"Rina Rai","email":"rina@example.com","address":"Tulsipur, Nepal","phone":"9779845123","role":"customer"},{"name":"Dinesh Bhandari","email":"dinesh@example.com","address":"Ghorahi, Nepal","phone":"9866123450","role":"seller"},{"name":"Sunita Gurung","email":"sunita@example.com","address":"Dhankuta, Nepal","phone":"9779865432","role":"customer"},{"name":"Roshan Shahi","email":"roshan@example.com","address":"Birendranagar, Nepal","phone":"9846123456","role":"admin"}]


[{"name":"Sita Sharma","email":"sita.sharma@example.com","phone":"9812345670","address":"Kathmandu, Nepal","role":"admin"},{"name":"Ram Thapa","email":"ram.thapa@example.com","phone":"9812345671","address":"Pokhara, Nepal","role":"seller"},{"name":"Gita Koirala","email":"gita.koirala@example.com","phone":"9812345672","address":"Lalitpur, Nepal","role":"customer"},{"name":"Hari Gurung","email":"hari.gurung@example.com","phone":"9812345673","address":"Bhaktapur, Nepal","role":"admin"},{"name":"Rita Maharjan","email":"rita.maharjan@example.com","phone":"9812345674","address":"Chitwan, Nepal","role":"seller"},{"name":"Mina Tamang","email":"mina.tamang@example.com","phone":"9812345675","address":"Dharan, Nepal","role":"customer"},{"name":"Sunil Shrestha","email":"sunil.shrestha@example.com","phone":"9812345676","address":"Butwal, Nepal","role":"admin"},{"name":"Kamal Rai","email":"kamal.rai@example.com","phone":"9812345677","address":"Hetauda, Nepal","role":"seller"},{"name":"Anita Lama","email":"anita.lama@example.com","phone":"9812345678","address":"Nepalgunj, Nepal","role":"customer"},{"name":"Ramesh Adhikari","email":"ramesh.adhikari@example.com","phone":"9812345679","address":"Janakpur, Nepal","role":"admin"}]


## R- Read 
- db.<collectionName>.find(filter, projection, options)
    - select all operation 
- db.<collectionName>.findOne(filter, projection, options)

### Filter 
    - object data type 

    - query operators 
        $gt, $gte, $lt, $lte, $eq, $ne, $in, $nin, $or, $and

    {
        key: value,
        key1: value1
    }
    ~ where key = value and key1 = value1

    {
        key: {$operationName: value}
    }

    users.age 
        age > 20 
    {
        age: {$gt: 20}
    }


    {
        $operation: [] || {}
    }


    {
        $or: [
            { age: {$gte: 16}},
            {age: {$lt: 35}}
        ]
    }
    ~ WHERE (age >= 16 or age < 35)


    ~ where of sql 
    select * from users where role ='admin';

## U- Update 
- db.<collectionName>.updateOne(filter, updatebody, option)
- db.<collectionName>.updateMany(filter, updatebody, option)

updateBody: 
{
    $set: value
}

## D- Delete 
- db.<collectionName>.deleteOne(filter)
- db.<collectionName>.deleteMany(filter)



### Core Integration 
- mongodb package 
    - db operate

### ORM/ODM Integration
- ORM => Object Relational Mapping/Modelling 
- ODM => Object Document Mapping/Modelling

sql Server => sequelize, typeorm, prisma

ACID

// transactions start
users
        // rollback
    userporofle
        // rollback
        order
            // commit 
            // rollback


## ER Diagram
- Entity 
    - Users
        - auth 
        - customers 
        - sellers 
        - admin
    - Product
    - Category
    - Brand 
    - Cart 
    - Order 
    - PaymentTranactions

- Users
    - _id 
    - name 
    - email 
    - address
    - password
    - userProvider [google, facebook]
    - userProviderId 
    - phone 
    - role 
    - status 
    - activationToken 
    - activeFor
    - forgetToken
    - forgetActivateFor
    - image 
    - createdAt
    - updatedAt

