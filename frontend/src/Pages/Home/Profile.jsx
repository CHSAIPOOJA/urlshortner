import React, { useEffect, useState} from 'react';
import Service from "../../utils/http.js";
import {Avatar} from '@mantine/core';
import { Stack, Button } from '@mantine/core';
import { Text } from '@mantine/core';
const service =new Service();

export default function Profile(){

    const [user, setUser]=useState({});

    async function getMyData(){
        try{
            let data=await service.get("user/me");
            setUser(data);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        getMyData();
    }, []);

    return(
        <div>
            <Stack
      h={300}
      bg="var(--mantine-color-body)"
      align="center"
      justify="center"
      gap="md"
    >
      
     
            
            <Avatar src={user.avatar} alt="User Avatar" size="xl" radius="xl" />
            
            <Text></Text>
            <Text></Text>
            <Text size="lg">{user.name}</Text>
             <Text>{user.email}</Text>
            <Text size="md"><strong>User Id :</strong>{user._id} </Text>
           <Text size="md"><strong>Created At :</strong>{user.createdAt} </Text>
            
            <Text>{user.updatedAt}</Text>
             </Stack>
        </div>
    )

}