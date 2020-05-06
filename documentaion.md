# Documentation

## Create an ID
Request Get - https://alexander-ritik-task-manager.herokuapp.com/users

Request body
```json
{
  "name":"xyz",
  "email":"zyz@gmail.com",
  "password":"A1234",
  "age":20,
}
```
Response result 
```json
{
    "user": {
        "age": 0,
        "_id": "5eb2dc2b18100f00171abcdd",
        "name": "xyz",
        "email": "xyz@gmail.com",
        "createdAt": "2020-05-06T15:47:55.771Z",
        "updatedAt": "2020-05-06T15:47:56.006Z",
        "__v": 1
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWIyZGMyYjE4MTAwZjAwMTcxYWJjZGQiLCJpYXQiOjE1ODg3ODAwNzYsImV4cCI6MTU4OTM4NDg3Nn0.PU8dkkt742vNK6wg1AOmDC87SG2mCbIlX89EIn9jCZA"
}
```

## Login users
Request Get - https://alexander-ritik-task-manager.herokuapp.com/users/login 

Request body
```json
{
	"email":"rakeshkusrivastav@gmail.com",
	"password":"A1234"
}
```

Response Result
```json
{
    "user": {
        "age": 20,
        "_id": "5ea972afdcf3068537faa927",
        "name": "ritik",
        "email": "rakeshkusrivastav@gmail.com",
        "createdAt": "2020-04-29T12:27:27.033Z",
        "updatedAt": "2020-05-06T15:43:22.353Z",
        "__v": 33
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWE5NzJhZmRjZjMwNjg1MzdmYWE5MjciLCJpYXQiOjE1ODg3Nzk4MDIsImV4cCI6MTU4OTM4NDYwMn0.a9X11MeR7SgcgL9At3uaykHlvwopmD3jpSoDDaoEZU0"
}
```



## Create task
Request Get - https://alexander-ritik-task-manager.herokuapp.com/tasks

you also need to pass a header Authorization=Bearer {token} <br>
token is provided at time of login or time of creation of id

Request body
```json
{
	"description":"I am feeling like a rockstar",
	"completed":true
}
```

Response Result
```json
{
    "completed": true,
    "_id": "5eb2ddad18100f00171abcdf",
    "description": "I am feeling like a rockstar",
    "owner": "5eb2dc2b18100f00171abcdd",
    "createdAt": "2020-05-06T15:54:21.538Z",
    "updatedAt": "2020-05-06T15:54:21.538Z",
    "__v": 0
}
```


## logout / logoutAll
Request Get - https://alexander-ritik-task-manager.herokuapp.com/users/logout

and if pass /logoutAll it will remove all token

you also need to pass a header Authorization=Bearer {token} <br>
token is provided at time of login or time of creation of id



Response Result
```json
{
    "sucess":
}
```


## Read your profile
Request Get - https://alexander-ritik-task-manager.herokuapp.com/users/me

you also need to pass a header Authorization=Bearer {token} <br>
token is provided at time of login or time of creation of id



Response Result
```json
{
    "age": 0,
    "_id": "5eb2dc2b18100f00171abcdd",
    "name": "ritik",
    "email": "rakeshkusristav@gmail.com",
    "createdAt": "2020-05-06T15:47:55.771Z",
    "updatedAt": "2020-05-06T15:47:56.006Z",
    "__v": 1
}
```



## fetch your all task
Request Get - https://alexander-ritik-task-manager.herokuapp.com/tasks?sort=createdAt:asc

optional argument completed

you also need to pass a header Authorization=Bearer {token} <br>
token is provided at time of login or time of creation of id


Response Result
```json
[
    {
        "completed": true,
        "_id": "5eb2ddad18100f00171abcdf",
        "description": "I am feeling like a rockstar",
        "owner": "5eb2dc2b18100f00171abcdd",
        "createdAt": "2020-05-06T15:54:21.538Z",
        "updatedAt": "2020-05-06T15:54:21.538Z",
        "__v": 0
    }
]
```



## fetch task by its ID
Request Get - https://alexander-ritik-task-manager.herokuapp.com/tasks/{id}

eg : id=5ea4bb31b0e7ce59f769ff23

optional argument completed

you also need to pass a header Authorization=Bearer {token} <br>
token is provided at time of login or time of creation of id


Response Result
```json
{
    "completed": true,
    "_id": "5eb2ddad18100f00171abcdf",
    "description": "I am feeling like a rockstar",
    "owner": "5eb2dc2b18100f00171abcdd",
    "createdAt": "2020-05-06T15:54:21.538Z",
    "updatedAt": "2020-05-06T15:54:21.538Z",
    "__v": 0
}
```






