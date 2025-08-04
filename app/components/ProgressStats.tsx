interface ProgressStatsProps {
  selectedCount: number;
  totalCount: number;
  onClearAll: () => void;
}

export function ProgressStats({
  selectedCount,
  totalCount,
  onClearAll,
}: ProgressStatsProps) {
  const percentage = (selectedCount / totalCount) * 100;

  return (
    <div className="mt-4 space-y-4">

      (
      <div className="text-center">
        <button
          onClick={onClearAll}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          🗑️ 清除所有选择
        </button>
      </div>
      )
    </div>
  );
}
