 <h1  align="center">
 iTools


</h1>

## Live 📍

<p align="center"><a href='https://i-tools.vercel.app'>iTools app - AIReader and AImage</a></p>

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
| [Next.js](https://nextjs.org)                           | Framework for React   |
| [Typescript](https://www.typescriptlang.org)                           | Extension of JavaScript   |
| [tRPC](https://trpc.io)                           | Tool for creating strongly-typed APIs in TypeScript, enabling communication between the client and the server   |
| [Kinde](https://kinde.com)                           |  Authentication tool  |
| [Prisma](https://www.prisma.io)                           | Object-Relational Mapping (ORM)   |
| [Langchain](https://js.langchain.com/docs/guides/deployment/nextjs)                           | Infinite AI Memory  |
| [Openai](https://platform.openai.com/docs/introduction)                           |  Platform for working with artificial intelligence, enabling the use of advanced language models and other AI features.   |
| [Uploadthing](https://uploadthing.com)                           | Adds the capability of file uploads to the application  |
| [Pinecone](https://www.pinecone.io)                           | Service for vector storage  |
| [Tailwind](https://tailwindcss.com)                           | Tool for rapidly building user interfaces by defining CSS classes directly in the HTML code.   |
| [React-pdf](https://tailwindcss.com)                           | Assists in displaying PDF files in a React-based application.   |
        
| and other packages |  |  
|-----------|:-----------:| 
| hookform/resolvers | tailwind-merge  |  
| lucide-react | pdf-parse | 
|shadcn  | react-hook-form |  
|  mantine/hooks | react-markdown | 
| zod | react-resize-detector |  
|  ai | react-textarea-autosize | 
|framer-motion  | simplebar-react |  
|  resize-detector | tailwindcss-animate | 

   

  
    



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
every enviroments u can get from these links:
- [Kinde](https://kinde.com)
- [Langchain](https://js.langchain.com/)
- [database](https://planetscale.com)
- [Pinecone](https://www.pinecone.io)
- [Openai](https://platform.openai.com/)
 




