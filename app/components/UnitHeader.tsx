import { Unit } from "@/servers/type";

interface UnitHeaderProps {
  unit: Unit;
}

export function UnitHeader({ unit }: UnitHeaderProps) {
  return (
    <div className="p-3 sm:p-4 text-center flex flex-col justify-center items-center min-h-[120px] w-20 sm:w-24">
      <img
        src={unit.logoImageUrl}
        alt={unit.name}
        className="h-8 sm:h-12 mx-auto mb-2"
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
