import { redirect } from "next/navigation"

export default function Homepage() {
  return redirect('/dashboard/properties')
}