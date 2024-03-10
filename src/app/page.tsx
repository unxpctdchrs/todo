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
          margin="mr-40 sm:mr-11 md:mr-16 lg:mr-20 xl:mr-24 2xl:mr-40"
        />
      </div>
    </main>
  )
}
