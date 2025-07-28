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
    <div className="mt-8 space-y-4">
      <div className="text-center">
        <div className="inline-flex items-center space-x-4 bg-white px-6 py-3 rounded-full shadow-md">
          <div className="text-sm text-gray-600">
            已选择歌曲:{" "}
            <span className="font-semibold text-blue-600">{selectedCount}</span>{" "}
            / {totalCount}
          </div>
          <div className="w-32 bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* 清除按钮 */}
      {selectedCount > 0 && (
        <div className="text-center">
          <button
            onClick={onClearAll}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            🗑️ 清除所有选择
          </button>
        </div>
      )}
    </div>
  );
}
