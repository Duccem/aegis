import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const GoToHome = () => {
  return (
    <Link href={"/"} className="flex items-center gap-2 text-sm  hover:underline">
      <ArrowLeft />
      <span className="ml-2">Go to Home</span>
    </Link>
  );
};

export default GoToHome;
