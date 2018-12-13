# Video Repository API

### Features
- Project video repository with HTTP methods
  - get All
  - get by Id
  - post

### Install

`$ npm install`

### Run app
`$ npm run dev`

### Run test
`$ npm run test`

### [HTTP Methonds]

- #### GET
``` ts
  app.route('/')
      .get((req, res, next) => {
      res.json({ message: 'Welcome to Video repository' });
```
- #### GET All /api/videos
``` ts
  app.route('/api/videos')
```
- #### GET by Id /api/videos/{id}
``` ts
  app.route('/api/videos/:id')
```
- #### POST /api/videos Insert for video list
  - payload Example
  ``` json
    [
      {
        "id": 5,
        "url": "http://video4",
        "description": "video4"
      }
    ]
  ```
