'use client'
import AuthSection from "@/components/Authentication/AuthSection"
import { usePathname } from "next/navigation"

const page = () => {
  const path = usePathname()
  return (<>
    <AuthSection type={path}/>
    </>
  )
}

export default page
