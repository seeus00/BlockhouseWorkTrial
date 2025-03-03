import Image from "next/image";
import Dashboard from "./dashboard/page";

// By default, the home page should display the dashboard
export default function Home() {
  return (
    <div>
        <Dashboard/>
    </div>
  );
}
