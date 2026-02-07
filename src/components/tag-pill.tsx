import { Badge } from "@/components/ui/badge";
import type { Tag } from "@/lib/types";

type TagPillProps = {
  tag: Tag;
};

export function TagPill({ tag }: TagPillProps) {
  return (
    <Badge variant="secondary" className="rounded-full text-[11px]">
      {tag.name}
    </Badge>
  );
}
