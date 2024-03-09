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
import { format } from "date-fns"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import Add from '@/components/Add'

interface DATA {
  title: string,
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
          
            <Card key={i} className='flex-auto ml-10 mr-10 mt-5 mb-5'>
              <ResizablePanelGroup
                direction='horizontal'
              >
                <ResizablePanel defaultSize={75}>
                  <CardHeader>
                    <CardTitle>{dataList.title}</CardTitle>
                    <CardDescription>{dataList.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>Due Date: {format(dataList.dueDate, 'PPP')}</p>
                  </CardContent>
                </ResizablePanel>
                <ResizablePanel defaultSize={25}>
                  <CardFooter className="flex h-full items-center justify-center p-6">
                    <Add title={'Edit'}/>
                  </CardFooter>
                </ResizablePanel>
              </ResizablePanelGroup>
            </Card> 
        ) 
      })}
    </ScrollArea>
  )
}
