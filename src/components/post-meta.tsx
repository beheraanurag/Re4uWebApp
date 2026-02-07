import { formatDate } from "@/lib/format";
import type { Author } from "@/lib/types";

type PostMetaProps = {
  publishedAt?: string | null;
  author?: Author | null;
};

export function PostMeta({ publishedAt, author }: PostMetaProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
      {publishedAt ? <span>{formatDate(publishedAt)}</span> : null}
      {author?.name ? <span>· {author.name}</span> : null}
    </div>
  );
}
