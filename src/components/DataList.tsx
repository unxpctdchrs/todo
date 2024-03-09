'use client'
import { getData, updateData } from '../lib/apiManager'
import { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

interface DATA {
  description: string,
  dueDate: string,
  id: number,
  isCompleted: boolean
}

export default function DataList() {
  const [data, setData] = useState([])

  useEffect(()=>{
    getData().then((result) =>{
      setData(result)
    })
  }, [])

  // console.log({data})

  // const updatedData: DATA = { id: 2, description: 'Updated task 2', isCompleted: false, dueDate: "7 Maret 2024" };
  // updateData(updatedData)
  //   .then(data => {
  //     // Handle the updated data here
  //     console.log('Updated data:', data);
  //   })
  //   .catch(error => {
  //     // Handle any errors that occur during the update
  //     console.error('Error updating data:', error);
  //   });

  return (
    <ScrollArea className="todoList rounded-md border ml-10">
      {data.map((dataList: DATA, i)=>{
        return(
          <Card key={i} className='flex-auto w-5/6 m-10'>
            <CardHeader>
              <CardTitle>Task ID: {dataList.id}</CardTitle>
              <CardDescription>{dataList.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>{dataList.dueDate}</p>
            </CardContent>
            <CardFooter>
              <p>isCompleted: {dataList.isCompleted}</p>
            </CardFooter>
          </Card>
        ) 
      })}
      
    </ScrollArea>
  )
}
