<h1 align="center">⛰️ CYCLOOP</h1>
<p align="center">
<img src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white" />
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
<img src="https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=Cloudflare&logoColor=white" />
<img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white" />
</p>
<p align="center"><b>Service Upload</b> with <b>S3 SDK</b> and <b>Cloudflare R2</b></p>

---

## 🔀 Basic Request

- CURL example

```shell
curl --location 'http://localhost:4100/api/upload' \
--header 'x-api-key: [secret key]' \
--form 'file=@"/path/to/file"'
```

- Javascript Fetch example

```js
const formData = new FormData()
formData.append('file', fileInput.files[0])

fetch('http://localhost:4100/api/upload', {
  method: 'POST',
  headers: {
    'x-api-key': 'your-secret-key-here',
  },
  body: formData,
})
  .then((res) => res.json())
  .then((data) => console.log('Success:', data))
  .catch((err) => console.error('Upload error:', err))
```

- Response `201`

```json
{
  "data": {
    "url": "https://cloudflare.com/file_name.jpeg",
    "name": "file_name.jpeg",
    "size": 12345
  },
  "message": "Upload successful"
}
```

- Response `400`

```json
{
  "data": null,
  "message": "No file uploaded!"
}
```

- Response `401`

```json
{
  "error": "Unauthorized"
}
```

- Response `500`

```json
{
  "error": "Upload error"
}
```

---

## 🏃 How to run

- Clone this repository
- Copy `.env.example` to `.env` and adjust according to the Cloudflare R2 credentials you have

---

## 🕸️ Stack

- Express.js + Typescript
- Sharp (Compress image)
- Aws SDK

---

## 📖 Docs

- Swagger Docs <a href="https://cycloop.pace11.my.id/api-docs/" target="_blank">(here)</a>
