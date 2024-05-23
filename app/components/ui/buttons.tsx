"use client";
import Link from "next/link";

interface ViewCurseButtonProps {
  linkto: number;
}
export function ViewCurseButton({ linkto }: ViewCurseButtonProps) {
  return (
    <Link href={{ pathname: `/viewcurse/${linkto}` }}>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">View Curse</button>
    </Link>
  );
}
interface RegistrationButtonProps {
  linkto: number;
}
export function RegistrationButton({ linkto }: RegistrationButtonProps) {
  return (
    <Link href={{ pathname: `/registration/${linkto}` }}>
      <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-1 px-2 rounded">Registration on this curse</button>
    </Link>
  );
}
export function BackToDashboardnButton() {
  return (
    <Link href="/">
      <button className="text-white w-full border rounded-md px-3 py-2 bg-sky-900 hover:bg-sky-950" >Go to Dashboard</button>
    </Link>
  );
}

export default function CreateYourCurseButton() {
  return (
    <Link href="/createcurse">
      <button className=" text-black font-bold w-full border rounded-md px-6 py-6 bg-blue-50 hover:bg-blue-100" >Go to Create Your Own Curse</button>
    </Link>
  );
}




