'use client'

import React, { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Trash } from 'lucide-react'
import { Unit, units, UnitStats } from '@/lib/units'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { TemplateDesigner, TemplateStats } from '@/components/Templates'
import { CategoryDialog } from '@/components/Dialog'


export default function Page() {
  const [combatGrid, setCombatGrid] = useState<(Unit | null)[]>(Array(25).fill(null))
  const [supportGrid, setSupportGrid] = useState<(Unit | null)[]>(Array(5).fill(null))
  const [selectedCell, setSelectedCell] = useState<{ grid: 'combat' | 'support', index: number } | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<'infantry' | 'mobile' | 'armored' | 'support' | null>(null)

  const [armyExperience, setArmyExperience] = useState(0)
  const [totalStats, setTotalStats] = useState<UnitStats>({
    hp: 0, org: 0, recovery: 0, suppression: 0, weight: 0,
    supply: 0, softAttack: 0, hardAttack: 0, defense: 0,
    breakthrough: 0, armor: 0, piercing: 0, speed: 0,
    airAttack: 0, combatWidth: 0, hardness: 0, manpower: 0,
    trainingTime: 0, icCost: 0, reliability: 0, trickleback: 0, expLoss: 0
  })

  const handleCellClick = (grid: 'combat' | 'support', index: number) => {
    if (isSlotLocked(grid, index)) return
    setSelectedCell({ grid, index })

    if (grid === 'support') {
      setSelectedCategory('support')
      setDialogOpen(true)
    } else {
      const unitAbove = combatGrid[index - 5]
      if (unitAbove) {
        setSelectedCategory(unitAbove.category)
        setDialogOpen(true)
      } else {
        setCategoryDialogOpen(true)
      }
    }
  }

  const handleCategorySelect = (category: 'infantry' | 'mobile' | 'armored') => {
    setSelectedCategory(category)
    setCategoryDialogOpen(false)
    setDialogOpen(true)
  }

  const handleUnitSelected = (name: string) => {
    setDialogOpen(false)

    const selectedUnit = units.find(unit =>
      unit.category === selectedCategory && unit.name === name
    )

    if (selectedUnit && selectedCell) {
      handleUnitSelect(selectedUnit)
    }
  }

  const handleUnitSelect = (unit: Unit) => {
    if (selectedCell) {
      if (selectedCell.grid === 'support' && unit.category === 'support') {
        const newGrid = [...supportGrid]
        newGrid[selectedCell.index] = unit
        setSupportGrid(newGrid)
      } else if (selectedCell.grid === 'combat' && !isSlotLocked('combat', selectedCell.index, unit)) {
        const newGrid = [...combatGrid]
        newGrid[selectedCell.index] = unit
        setCombatGrid(newGrid)
      }
      setSelectedCell(null)
      setDialogOpen(false)
      setSelectedCategory(null)
      setArmyExperience(prev => prev + unit.xpCost)
    }
  }

  const handleRemoveUnit = () => {
    if (selectedCell) {
      if (selectedCell.grid === 'support') {
        const newGrid = [...supportGrid]
        newGrid[selectedCell.index] = null
        setSupportGrid(newGrid)
      } else {
        const newGrid = [...combatGrid]
        newGrid[selectedCell.index] = null
        setCombatGrid(newGrid)
      }
      setSelectedCell(null)
      setDialogOpen(false)
      setSelectedCategory(null)
    }
  }

  const isSlotLocked = (grid: 'combat' | 'support', index: number, selectedUnit?: Unit | null) => {
    if (grid === 'support') {
      return false // All support slots are unlocked
    } else {
      const row = Math.floor(index / 5)
      if (row === 0) return false // First row is always unlocked
      const unitAbove = combatGrid[index - 5]
      if (!unitAbove) return true // Slot is locked if the one above is empty
      if (selectedUnit && unitAbove.category !== selectedUnit.category) return true // Slot is locked if the unit above is of a different type
      return false
    }
  }

  const handleReset = () => {
    setCombatGrid(Array(25).fill(null))
    setSupportGrid(Array(5).fill(null))
    setArmyExperience(0)
  }

  useEffect(() => {
    const calculateTotalStats = () => {
      const newTotalStats = { ...totalStats }
      const allUnits = [...supportGrid, ...combatGrid].filter(unit => unit !== null) as Unit[]

      for (const stat in newTotalStats) {
        if (stat === 'org' || stat === 'hardness') {
          newTotalStats[stat as keyof UnitStats] = allUnits.reduce((sum, unit) => sum + unit.stats[stat as keyof UnitStats]!, 0) / allUnits.length
        } else if (stat === 'speed') {
          const combatUnits = allUnits.filter(unit => unit.category !== 'support')
          newTotalStats[stat as keyof UnitStats] = combatUnits.length > 0 ? Math.min(...combatUnits.map(unit => unit.stats.speed)) : 0
        } else if (stat === 'armor') {
          const highestArmor = Math.max(...allUnits.map(unit => unit.stats.armor || 0))
          const averageArmor = allUnits.reduce((sum, unit) => sum + (unit.stats.armor || 0), 0) / allUnits.length
          newTotalStats[stat as keyof UnitStats] = 0.4 * highestArmor + 0.6 * averageArmor
        } else if (stat === 'piercing') {
          const highestPiercing = Math.max(...allUnits.map(unit => unit.stats.piercing || 0))
          const averagePiercing = allUnits.reduce((sum, unit) => sum + (unit.stats.piercing || 0), 0) / allUnits.length
          newTotalStats[stat as keyof UnitStats] = 0.4 * highestPiercing + 0.6 * averagePiercing
        } else {
          newTotalStats[stat as keyof UnitStats] = allUnits.reduce((sum, unit) => sum + (unit.stats[stat as keyof UnitStats] || 0), 0)
        }
      }

      setTotalStats(newTotalStats)
    }

    calculateTotalStats()
  }, [supportGrid, combatGrid])

  return (
    <main className=''>
      <div className="my-8 text-center">
        <h1 className="text-4xl font-bold text-green-400 mb-2">HOI4 Land Template Designer</h1>
        <p className="text-lg">Create and optimize your Hearts of Iron IV division templates with this open-source tool.</p>
      </div>
      <div className="flex justify-around flex-col lg:flex-row gap-6">
        <TemplateDesigner combatGrid={combatGrid} supportGrid={supportGrid} isSlotLocked={isSlotLocked} handleCellClick={handleCellClick} />
        <TemplateStats totalStats={totalStats} />
      </div>
      <div className="mt-6 flex justify-around items-center">
        <Button variant="destructive" onClick={handleReset} className="flex space-y-2 items-center bg-red-700 hover:bg-red-600">
          <Trash className="w-4 h-4 mr-2" />
          Reset
        </Button>
        <div className="text-green-400 text-xl font-bold">{armyExperience} ★</div>
      </div>
      <CategoryDialog categoryDialogOpen={categoryDialogOpen} setCategoryDialogOpen={setCategoryDialogOpen} handleCategorySelect={handleCategorySelect} selectedCell={selectedCell} handleRemoveUnit={handleRemoveUnit} />
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-gray-800 text-gray-100">
          <DialogHeader>
            <DialogTitle className="text-2xl text-green-400">{selectedCategory}</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[300px] w-full rounded-md border p-4">
            <div className="grid grid-cols-aut gap-2">
              {Array.from(new Set(units
                .filter(unit => unit.category === selectedCategory)
                .map((unit) => (
                  <div
                    key={unit.id}
                  >
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
                )))
              )}

            </div>

          </ScrollArea>
          <DialogFooter>
            {selectedCell && (
              <Button onClick={handleRemoveUnit} className="col-span-2 bg-red-500 hover:bg-red-600 text-white">
                Remove Unit
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}
