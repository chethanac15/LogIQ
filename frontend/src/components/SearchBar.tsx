interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500 shadow-sm shadow-slate-200/40">
      <svg
        aria-hidden="true"
        className="h-4 w-4 text-slate-400"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search repositories"
        className="w-full border-none bg-transparent text-[15px] text-slate-900 outline-none placeholder:text-slate-400"
      />
    </label>
  );
}
