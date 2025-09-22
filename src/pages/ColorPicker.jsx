// components/ColorPicker.jsx
export default function ColorPicker({ value, onChange }) {
  return (
    <div className="flex items-center gap-3">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-12 h-12 cursor-pointer"
      />
      <span className="text-gray-700">{value}</span>
    </div>
  );
}
