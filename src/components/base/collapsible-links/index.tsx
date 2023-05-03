import { type FC, type HTMLProps, type ReactNode } from "react";
import { YouTubeEmbed } from "react-social-media-embed";

import { cn } from "~/utils/style";

import { AspectRatio } from "../aspect-ratio";
import { Collapsible } from "../collapsible";
import $style from "./index.module.scss";

export enum LinkType {
  Facebook = "facebook",
  Instagram = "instagram",
  Spotify = "spotify",
  Youtube = "youtube",
  Soundcloud = "soundcloud",
  Bandcamp = "bandcamp",
  Website = "website",
  Radio = "radioshow",
}

export type LinkItem = {
  type: LinkType;
  title?: ReactNode;
  url: string;
};

export type CollapsibleLinksProps = HTMLProps<HTMLDivElement> & {
  links: LinkItem[];
};

export const CollapsibleLinks: FC<CollapsibleLinksProps> = ({
  links,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn(
        "flex flex-col gap-1 border-t border-t-black pt-1",
        props.className,
      )}
    >
      {links.map((link) => {
        const key = `${link.type}$${link.url}`;

        switch (link.type) {
          case LinkType.Youtube: {
            return (
              <Collapsible key={key} title={link.title ?? link.type}>
                <AspectRatio className={$style.youtube} ratio={16 / 9}>
                  <YouTubeEmbed
                    height="100%"
                    url={link.url}
                    width="100%"
                    youTubeProps={{
                      loading: "lazy",
                      opts: {
                        loop: 1,
                        modestbranding: 1,
                      },
                    }}
                  />
                </AspectRatio>
              </Collapsible>
            );
          }

          default: {
            return (
              <Collapsible
                key={key}
                title={
                  <a
                    className="flex-1"
                    href={link.url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {link.title ?? link.type}
                  </a>
                }
              />
            );
          }
        }
      })}
    </div>
  );
};
