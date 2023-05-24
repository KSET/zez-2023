import { type LinkItem } from "~/components/base/collapsible-links";

import { type TagName } from "./tags";

export type Artist = {
  id: number;
  name: string;
  countries: string[];
  tags: TagName[];
  description: string;
  image: {
    src: string;
    width?: number;
    height?: number;
    blurDataURL?: string;
  };
  links?: LinkItem[];
};
