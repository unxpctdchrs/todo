"use client";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { updateData, insertData } from "@/lib/apiManager";
import DATA from "@/app/DATA";
import { toast } from "./ui/use-toast";

interface AddProps {
  btnTitle: string;
  title: string;
  description: string;
  titleValue: string;
  descValue: string;
  dueDateVal: Date | null;
  id: number | null;
  fromWhere: boolean
}

export default function Add(props: AddProps) {
  const [ dateVal, setDateVal] = useState<Date | null>(props.dueDateVal);
  const [ titleVal, setTitleVal ] = useState(props.titleValue || '')
  const [ descriptionVal, setDescriptionVal ] = useState(props.descValue || '')

  const onclick = () =>{
    const formData = {
      title: titleVal,
      description: descriptionVal,
      date: dateVal
    }
    // console.log(formData)

    if (props.fromWhere == true){
      // const updatedData: DATA = { id: 2, description: 'Updated task 2', isCompleted: false, dueDate: new Date(), title: "test69" }
      const updatedData: DATA = { id: props.id, title: titleVal, description: descriptionVal, dueDate: dateVal, isCompleted: false }
      updateData(updatedData)
        .then(data => {
          // Handle the updated data here
          // console.log('Updated data:', data);
          window.location.reload()
        })
        .catch(error => {
          // Handle any errors that occur during the update
          // console.error('Error updating data:', error);
        });
    } else{
      const insertedData: DATA = {id: props.id, title: titleVal, description: descriptionVal, dueDate: dateVal, isCompleted: false}
      insertData(insertedData)
        .then(data =>{
          // console.log('Inserted data:', data)
          window.location.reload()
        })
        .catch(error => {
          // console.error('Error inserting data:', error)
        })
    }
    
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="mr-40" variant="outline">
          {props.btnTitle}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>{props.title} List</DrawerTitle>
            <DrawerDescription>{props.description}</DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="flex items-center flex-col">
              <Input
                placeholder="Title"
                className="mb-5"
                value={titleVal}
                onChange={(e) => setTitleVal(e.target.value)}
              />
              <Textarea
                placeholder="Write your description here."
                className="mb-5"
                value={descriptionVal}
                onChange={(e) => setDescriptionVal(e.target.value)}
              />
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateVal && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateVal ? (
                      format(dateVal, "PPP")
                    ) : (
                      <span>Pick a due date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateVal ?? undefined}
                    onSelect={(date: Date | undefined) => {
                      if(date){
                        setDateVal(date)}
                      }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <DrawerFooter>
            <Button type="submit" onClick={onclick}>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
