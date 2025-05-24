interface SkillTagProps {
  text: string;
  onRemove: () => void;
  variant?: "default" | "green" | "red";
}

export default function SkillTag({ text, onRemove, variant = "default" }: SkillTagProps) {
  const variantStyles = {
    default: "bg-gray-100 text-gray-800",
    green: "bg-green-100 text-green-800",
    red: "bg-red-100 text-red-800",
  };

  return (
    <div className={`${variantStyles[variant]} px-3 py-1 rounded-full text-sm flex items-center gap-1`}>
      {text}
      <button
        type="button"
        className="text-gray-500 hover:text-gray-700"
        onClick={onRemove}
        aria-label={`Remove ${text}`}
      >
        ×
      </button>
    </div>
  );
}
