interface DemoFillButtonProps {
  onFill: () => void;
  label?: string;
}

const DemoFillButton = ({ onFill, label }: DemoFillButtonProps) => {
  return (
    <div className="rounded-lg border border-blue-200 bg-blue-50 p-2.5">
      <p className="text-sm font-medium text-blue-800">
        <strong>Just looking around?</strong> Fill this form with sample data.
      </p>
      <button
        type="button"
        onClick={onFill}
        className="mt-1.5 rounded bg-blue-600 px-3 py-1 text-xs text-white transition-colors hover:bg-blue-700"
      >
        {label ?? "Fill demo data"}
      </button>
    </div>
  );
};

export default DemoFillButton;
