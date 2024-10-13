
import React from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function CategoryDialog({ categoryDialogOpen, setCategoryDialogOpen, handleCategorySelect, selectedCell, handleRemoveUnit }: {
    categoryDialogOpen: boolean,
    setCategoryDialogOpen: React.Dispatch<React.SetStateAction<boolean>>,
    handleCategorySelect: (category: "infantry" | "mobile" | "armored") => void,
    selectedCell: { grid: 'combat' | 'support', index: number } | null,
    handleRemoveUnit: () => void
}) {
    return (

        <Dialog open={categoryDialogOpen} onOpenChange={setCategoryDialogOpen}>
            <DialogContent className="bg-gray-800 text-gray-100">
                <DialogHeader>
                    <DialogTitle className="text-2xl text-green-400">Select a category</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-2">
                    {['infantry', 'mobile', 'armored'].map((category) => (
                        <Button
                            key={category}
                            onClick={() => handleCategorySelect(category as 'infantry' | 'mobile' | 'armored')}
                            className="justify-start bg-gray-700 hover:bg-gray-600 text-gray-100"
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </Button>
                    ))}
                </div>
                <DialogFooter>
                    {selectedCell && (
                        <Button onClick={handleRemoveUnit} className="col-span-2 bg-red-500 hover:bg-red-600 text-white">
                            Remove Unit
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}