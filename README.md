 <h1  align="center">
 iTools


</h1>

## Live 📍

<p align="center"><a href='https://i-task.vercel.app'>iTask</a></p>

<p align="center">
  <a >
    <img src=""
         alt="Screenshot">
  </a>
</p>

## Project Overview 🎉
<p style="text-align: justify;">This project I created by my curiosity about how works AI tools like image generator or chat. My main goals were to increase my skills in typescript, connections between client-server components, better and efficiently handling loading, error states than in my previous project - iTask. As I was going deeper into the project, I realized new things to learn or improve. The hardest part of this project were handling streaming Api responses and functionality of sending messages 
and how many different things can happen during this. This project caused a huge improve in my skills especially in what I mentioned above and give me idea for the next project that will be more challenging than iTools.</p>



**iTools** is a project involving authentication that relies on two AI-based tools. 

**AIReader** - allows you to upload PDF file by dropzone and after that chat with it to gain a specific information from your PDF. Files and messages are stored for every user. Chat uses a infinite message history on scroll.

**AImage** - generate a image according to your vision by your command, after that u can add photo to your invidual carousel collection or discard. Every saved image is stored and you can dowloand it

## Features 

- Authentication using Kinde
- Streaming API Responses in Real-Time
- Infinite Message Loading
- Data Fetching Using tRPC & Zod
- Functional PDF Viewer
- storing files and images
- chatting with PDF
- generating images by prompt
- handled loading,error states
- drag and drop uploads

## Tech/framework used 🔧

| Main Tech                                                    | Description                              |
| ------------------------------------------------------- | ---------------------------------------- |
| [React](https://nextjs.org)                           | Framework for React   |
| [Javascript](https://www.typescriptlang.org)                           | Extension of JavaScript   |
| [Redux Toolkit](https://trpc.io)                           | Tool for creating strongly-typed APIs in TypeScript, enabling communication between the client and the server   |
| [Express](https://kinde.com)                           |  Authentication tool  |
| [Nodejs](https://www.prisma.io)                           | Object-Relational Mapping (ORM)   |
| [Styled-Components](https://js.langchain.com/docs/guides/deployment/nextjs)                           | Infinite AI Memory  |
| [MongoDB](https://platform.openai.com/docs/introduction)                           |  Platform for working with artificial intelligence, enabling the use of advanced language models and other AI features.   |
| [cors](https://uploadthing.com)                           | Adds the capability of file uploads to the application  |
| [jsonwebtoken](https://www.pinecone.io)                           | Service for vector storage  |
| [axios](https://www.pinecone.io)                           | Service for vector storage  |

        
| and other packages |  |  
|-----------|:-----------:| 
| cookie-parser | bcrypt |  
|framer-motion  | react-hot-toster |  


   

  
    



## Screenshots 📺

<p align="center">
    <img src="" alt="Screenshot">
</p>

<p align="center">
    <img src="" alt="Screenshot">
</p>

<p align="center">
    <img src="" alt="Screenshot">
</p>




## Installation 💾

To get started, run this command
````
https://github.com/Hophop2/iTools.git
````
after that u will be need a .env file with:
````
KINDE_CLIENT_ID
KINDE_CLIENT_SECRET
KINDE_ISSUER_URL
KINDE_SITE_UR
KINDE_POST_LOGOUT_REDIRECT_URL
KINDE_POST_LOGIN_REDIRECT_URL

DATABASE_URL

UPLOADTHING_SECRET
UPLOADTHING_APP_ID

PINECONE_API_KEY

OPENAI_API_KEY
````

 




