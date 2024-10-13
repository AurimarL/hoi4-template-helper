import React from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UnitCategory, units } from "@/lib/units";

export function CategoryDialog({
  categoryDialogOpen,
  setCategoryDialogOpen,
  handleCategorySelect,
  selectedCell,
  handleRemoveUnit,
}: {
  categoryDialogOpen: boolean;
  setCategoryDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleCategorySelect: (category: "infantry" | "mobile" | "armored") => void;
  selectedCell: { grid: "combat" | "support"; index: number } | null;
  handleRemoveUnit: () => void;
}) {
  return (
    <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
      <DialogContent className="bg-gray-800 text-gray-100">
        <DialogHeader>
          <DialogTitle className="text-2xl text-green-400">
            Select a category
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-2">
          {["infantry", "mobile", "armored"].map((category) => (
            <Button
              key={category}
              onClick={() =>
                handleCategorySelect(
                  category as "infantry" | "mobile" | "armored"
                )
              }
              className="justify-start bg-gray-700 hover:bg-gray-600 text-gray-100"
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>
        <DialogFooter>
          {selectedCell && (
            <Button
              onClick={handleRemoveUnit}
              className="col-span-2 bg-red-500 hover:bg-red-600 text-white"
            >
              Remove Unit
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function UnitDialog({
  dialogOpen,
  setDialogOpen,
  selectedCategory,
  handleUnitSelected,
  selectedCell,
  handleRemoveUnit,
}: {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedCategory: UnitCategory | null;
  handleUnitSelected: (name: string) => void;
  selectedCell: { grid: "combat" | "support"; index: number } | null;
  handleRemoveUnit: () => void;
}) {
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="bg-gray-800 text-gray-100">
        <DialogHeader>
          <DialogTitle className="text-2xl text-green-400">
            {selectedCategory}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
          <div className="grid grid-cols-aut gap-2">
            {Array.from(
              new Set(
                units
                  .filter((unit) => unit.category === selectedCategory)
                  .map((unit) => (
                    <div key={unit.id}>
                      <TooltipProvider>
                        <Tooltip defaultOpen={false}>
                          <TooltipTrigger>
                            <Button
                              onClick={() => handleUnitSelected(unit.name)}
                              className="justify-start bg-gray-700 hover:bg-gray-600 text-gray-100"
                            >
                              {unit.icon}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{unit.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ))
              )
            )}
          </div>
        </ScrollArea>
        <DialogFooter>
          {selectedCell && (
            <Button
              onClick={handleRemoveUnit}
              className="col-span-2 bg-red-500 hover:bg-red-600 text-white"
            >
              Remove Unit
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
