interface Props {
    title?: string
    value?: string
}
export default function AboutSectionItem({title, value}: Props) {
  return (
    <div className="col-span-12 md:col-span-6">
      <div className="space-y-1">
        <div className="text-xs font-medium text-graySoft">{title}</div>
        <div className="text-sm font-extrabold text-blackSoft">
          {value}
        </div>
      </div>
    </div>
  );
}
