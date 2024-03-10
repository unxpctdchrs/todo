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
import DATA from '@/app/DATA'
import { Button } from '@/components/ui/button'
import { deleteData } from '@/lib/apiManager'

export default function DataList() {
  const [data, setData] = useState([])

  useEffect(()=>{
    getData().then((result) =>{
      setData(result)
    })
  }, [])

  // console.log({data})

  const deleteTodo = (id: number) =>{
    console.log(id)
    deleteData(id).then(()=>{
      getData().then((result) =>{
        setData(result)
      })
    })
  }

  return (
      <ScrollArea className="todoList rounded-md border">
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
                      <p>Due Date: {dataList.dueDate? format(dataList.dueDate, 'PPP'): 'no due date'}</p>
                    </CardContent>
                  </ResizablePanel>
                  {/* <ResizableHandle /> */}
                  <ResizablePanel defaultSize={25}>
                    <CardFooter className="flex h-full items-center justify-center p-6 ">
                      <Add 
                        btnTitle='Edit' 
                        title='Edit' 
                        description='Edit your todo list.' 
                        titleValue={dataList.title} 
                        descValue={dataList.description}
                        dueDateVal={dataList.dueDate}
                        id={dataList.id}
                        fromWhere={true}
                        margin='mr-10'
                      />
                    <Button variant="destructive" onClick={()=>{deleteTodo(dataList.id)}}>Delete</Button>
                    </CardFooter>
                  </ResizablePanel>
                </ResizablePanelGroup>
              </Card> 
          ) 
        })}
      </ScrollArea>
    )
}
