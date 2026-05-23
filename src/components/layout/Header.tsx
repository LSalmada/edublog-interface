import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import { Login02Icon, Mortarboard02Icon } from "@hugeicons/core-free-icons";

export const Header = () => {
  return (
    <header className="sticky top-0 w-full border-b bg-black">
      <div className="container flex items-center mx-auto justify-between px-4 py-6 sm:px-6 lg:px-8">
        <Link to={`/`}>
          <div className='flex flex-row items-center gap-2'>
            <HugeiconsIcon icon={Mortarboard02Icon} size={48} />
            <h1 className="flex items-center gap-2 font-semibold text-4xl">
              Edublog
            </h1>
          </div>
        </Link>

        <div>
          <Button size="sm" asChild>
            <Link to={`/login`}>
              <HugeiconsIcon icon={Login02Icon} />
              Login
            </Link>
          </Button>
        </div>
      </div>
    </header>
  )
}