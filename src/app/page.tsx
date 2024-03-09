import Navbar from "@/components/Navbar"
import DataList from "@/components/DataList"
import Add from "@/components/Add"

export const runtime = 'edge' // 'nodejs' (default) | 'edge'

export default function Home() {
  return(
    <main>
      <Navbar />
      <div className="content-wrapper">
        <DataList />
        <Add title={'Add List'} />
      </div>
    </main>
  )
}
