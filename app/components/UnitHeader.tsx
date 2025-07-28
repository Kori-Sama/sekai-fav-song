import { Unit } from "@/servers/type";

interface UnitHeaderProps {
  unit: Unit;
}

export function UnitHeader({ unit }: UnitHeaderProps) {
  return (
    <div className="p-2 sm:p-4 text-center border-r border-gray-300 last:border-r-0">
      <img
        src={unit.logoImageUrl}
        alt={unit.name}
        className="h-12 sm:h-16 mx-auto mb-2"
        onError={(e) => {
          e.currentTarget.style.display = "none";
        }}
      />
      <div
        className="text-xs sm:text-sm font-medium"
        style={{ color: unit.colorCode }}
      >
        {unit.name}
      </div>
    </div>
  );
}
