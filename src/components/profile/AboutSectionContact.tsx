import { withBasePath } from "@/lib/basePath";

interface Props {
    contact?: string,
    social?: string
}

export default function AboutSectionContact({contact, social}: Props) {
  return (
    <div>
      <img
        src={withBasePath(`/social/${social}.png`)}
        alt={social}
        className="w-3 inline-block mr-1"
      />
      <span>{contact}</span>
    </div>
  );
}
