interface Props {
  title?: string;
  active?: boolean;
  onClick?: () => void;
}

export default function Badge({ title = "", active = false, onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className={[
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold outline-none transition",
        active
          ? "border-pinkLight text-blackSoft bg-pinkSoft/55"
          : "border-gray-200 text-graySoft bg-gray-100 hover:bg-gray-200",
      ].join(" ")}
    >
      {title}
    </button>
  );
}
