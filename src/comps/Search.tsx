import { CrossIcon, SearchIcon } from "@/assets/Icons";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";

export default function Search() {
  return (
    <Drawer>
      <DrawerTrigger className="uppercase text-muted-foreground flex gap-2">
        <SearchIcon className="text-black size-6" /> Search
      </DrawerTrigger>
      <DrawerContent>
        <div className="p-16">
          <div className="border-b border-b-black flex gap-4">
            <SearchIcon className="size-10" />
            <input
              type="text"
              className="text-2xl outline-none uppercase w-full"
              placeholder="search"
            />
            <DrawerClose>
              <button>
                <CrossIcon />
              </button>
            </DrawerClose>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
