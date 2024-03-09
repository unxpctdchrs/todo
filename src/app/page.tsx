import Navbar from "@/components/Navbar"
import DataList from "@/components/DataList"
import Add from "@/components/Add"

export default function Home() {
  return(
    <main>
      <Navbar />
      <div className="content-wrapper">
        <DataList />
        <Add 
          btnTitle='Add List' 
          title="Add" 
          description="Add your new todo." 
          titleValue="" 
          descValue=""
          dueDateVal={null}
          id={null}
          fromWhere={false}
        />
      </div>
    </main>
  )
}
