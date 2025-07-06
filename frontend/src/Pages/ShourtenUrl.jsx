import React from 'react'
import { useState } from 'react';
import Service from "../utils/http.js";
const service = new Service();
import { Container, Text } from '@mantine/core';
import { Stack, Button } from '@mantine/core';
import { TextInput } from '@mantine/core';
import { Anchor } from '@mantine/core';




export default function ShourtenUrl() {

  async function generateShortUrl(){
    try{
      let data=await service.post("s",input);
      setResponse(data);
      console.log(data);
    }
    catch(error){
      console.log(error);
    }
  }
  const [input, setInput] =useState({
    "originalUrl": "",
    "expiresAt": "",
    "title": "",
    "customUrl": ""
  })
  const [response, setResponse]=useState(null);
  return (
    <div>

       <Container size={'sm'}>
        
        {response ? <>{response.shortCode}</>:
      <Stack m='xl'
      
    >
      <Text size="25px" style={{ "textShadow":"1px 2px 3px"}}> Shorten your URL here</Text>
      <TextInput onChange={(e)=>{
        setInput({...input, originalUrl: e.target.value});
      }} required label="Original URl" />
      
      
    
    
    

    <TextInput onChange={(e)=>{ setInput({...input, customUrl: e.target.value});}}
      label="Customize your link (optional)"
      description=""
      placeholder="Input placeholder"
    />

    <TextInput onChange={(e)=>{ setInput({...input, title: e.target.value});}}
      label="Title (optional)"
      description=""
      placeholder="Input placeholder"
    />

    <TextInput onChange={(e)=>{ setInput({...input, expiresAt: e.target.value});}}
      label="Date of Expiry (optional)"
      description=""
      placeholder="Input placeholder"
    />
    <Button disabled={input.originalUrl.length<5} onClick={()=>{generateShortUrl()}}> Generate and shourten URL</Button>
      

  
    </Stack> }
       </Container>

    </div>
  )
}
