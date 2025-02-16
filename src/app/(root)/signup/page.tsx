'use client'
import AuthSection from "@/components/Authentication/AuthSection"
import { usePathname } from "next/navigation"

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const path = usePathname()
  return (<>
    <AuthSection type={path}/>
    </>
  )
}

export default page