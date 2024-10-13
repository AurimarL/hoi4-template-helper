import { Button } from "@/components/ui/button";
import { Lock, Plus } from "lucide-react";
import { Unit, UnitStats } from "@/lib/units";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TemplateDesigner({
  supportGrid,
  combatGrid,
  isSlotLocked,
  handleCellClick,
}: {
  combatGrid: (Unit | null)[];
  supportGrid: (Unit | null)[];
  isSlotLocked: (
    grid: "combat" | "support",
    index: number,
    selectedUnit?: Unit | null
  ) => boolean;
  handleCellClick: (grid: "combat" | "support", index: number) => void;
}) {
  return (
    <div className="flex-none p-2 m-2 rounded-lg shadow-lg border border-green-700">
      <h1 className="text-3xl font-bold mb-6 text-green-400">
        Battalion Template Designer
      </h1>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-semibold mb-2 text-green-400">Support</h2>
          <div className="flex md:flex-col gap-2">
            {supportGrid.map((unit, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-12 h-12 md:w-14 md:h-14 text-2xl bg-gray-600 hover:bg-gray-500 border-green-600"
                onClick={() => handleCellClick("support", index)}
              >
                {unit ? unit.icon : <Plus className="w-6 h-6 text-green-400" />}
              </Button>
            ))}
          </div>
        </div>
        <div className="flex-none">
          <h2 className="text-xl font-semibold mb-4 text-green-400">Combat</h2>
          <div className="grid grid-cols-5 gap-2">
            {combatGrid.map((unit, index) => {
              const isLocked = isSlotLocked("combat", index);
              return (
                <div className="flex justify-center" key={index}>
                  <Button
                    variant="outline"
                    className={`w-12 h-12 md:w-14 md:h-14 text-2xl ${
                      isLocked
                        ? "bg-gray-200 cursor-not-allowed"
                        : "bg-gray-600 hover:bg-gray-500 border-green-600"
                    }`}
                    onClick={() => handleCellClick("combat", index)}
                    disabled={isLocked}
                  >
                    {unit ? (
                      unit.icon
                    ) : isLocked ? (
                      <Lock className="w-6 h-6 text-gray-400" />
                    ) : (
                      <Plus className="w-6 h-6 text-green-400" />
                    )}
                  </Button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export function TemplateStats({ totalStats }: { totalStats: UnitStats }) {
  return (
    <Card className="flex-none p-2 m-2 bg-gray-700 border-green-700 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl text-green-400">
          Template Stats
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <h3 className="text-base font-semibold mb-2 text-green-400">
              Base Stats
            </h3>
            <table className="w-full">
              <tbody>
                {[
                  ["🚀 Speed", "speed", "km/h"],
                  ["❤️ HP", "hp", ""],
                  ["🏛️ Organization", "org", ""],
                  ["🔄 Recovery Rate", "recovery", ""],
                  ["🤐 Suppression", "suppression", ""],
                  ["⚖️ Weight", "weight", ""],
                  ["📦 Supply use", "supply", ""],
                  ["🔧 Reliability", "reliability", ""],
                  ["🩹 Trickleback", "trickleback", ""],
                  ["📚 Exp. loss", "expLoss", ""],
                ].map(([label, key, unit]) => (
                  <tr
                    key={label}
                    className="border-b border-gray-600 last:border-b-0"
                  >
                    <td className="py-1">{label}</td>
                    <td className="py-1 text-right">
                      {key
                        ? totalStats[key as keyof UnitStats]?.toFixed(2) ||
                          "0.00"
                        : "0.00"}
                      {unit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h3 className="text-base font-semibold mb-2 text-green-400">
              Combat Stats
            </h3>
            <table className="w-full">
              <tbody>
                {[
                  ["🔫 Soft attack", "softAttack"],
                  ["💥 Hard attack", "hardAttack"],
                  ["✈️ Air Attack", "airAttack"],
                  ["🛡️ Defense", "defense"],
                  ["⚔️ Breakth.", "breakthrough"],
                  ["🚙 Armor", "armor"],
                  ["🎯 Piercing", "piercing"],
                  ["🏴 Combat width", "combatWidth"],
                  ["🪨 Hardness", "hardness"],
                ].map(([label, key]) => (
                  <tr
                    key={label}
                    className="border-b border-gray-600 last:border-b-0"
                  >
                    <td className="py-1">{label}</td>
                    <td className="py-1 text-right">
                      {key
                        ? totalStats[key as keyof UnitStats]?.toFixed(2) ||
                          "0.00"
                        : "0.00"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h3 className="text-base font-semibold mb-2 text-green-400">
              Equipment
            </h3>
            <table className="w-full">
              <tbody>
                {[
                  ["👥 Manpower", "manpower"],
                  ["⏱️ Training time", "trainingTime", "days"],
                  ["💰 IC Cost", "icCost"],
                ].map(([label, key, unit]) => (
                  <tr
                    key={label}
                    className="border-b border-gray-600 last:border-b-0"
                  >
                    <td className="py-1">{label}</td>
                    <td className="py-1 text-right">
                      {key
                        ? totalStats[key as keyof UnitStats]?.toFixed(0) || "0"
                        : "0"}
                      {unit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
