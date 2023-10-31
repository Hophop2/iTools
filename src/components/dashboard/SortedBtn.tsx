"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SortedProps {
  position: string;
  setPosition: React.Dispatch<React.SetStateAction<string>>;
}

const SortedBtn = ({ position, setPosition }: SortedProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="mr-5 bg-transparent hover:bg-transparent hover:text-violet-600 ">
          Sort by:
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-12">
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem className="cursor-pointer" value="newest">
            Newest
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className="cursor-pointer" value="oldest">
            Oldest
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem
            className="cursor-pointer"
            value="alphabetical"
          >
            Alphabetical
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortedBtn;
