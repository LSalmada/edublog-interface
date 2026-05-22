import { HugeiconsIcon } from "@hugeicons/react";
import { Mortarboard02Icon } from "@hugeicons/core-free-icons";

export const Header = () => {
  return (
    <header className="sticky top-0 w-full border-b bg-black">
      <div className="container flex items-center mx-auto justify-between px-4 py-6 sm:px-6 lg:px-8">
        <div className='flex flex-row items-center gap-2'>
          <HugeiconsIcon icon={Mortarboard02Icon} size={48} />
          <h1 className="flex items-center gap-2 font-semibold text-4xl">
            Edublog
          </h1>
        </div>
      </div>
    </header>
  )
}