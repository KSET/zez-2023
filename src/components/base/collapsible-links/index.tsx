import {
  type FC,
  type HTMLProps,
  type PropsWithChildren,
  type ReactNode,
  useCallback,
  useMemo,
} from "react";
import { YouTubeEmbed } from "react-social-media-embed";

import { api } from "~/utils/queryApi";
import { cn } from "~/utils/style";

import { AspectRatio } from "../aspect-ratio";
import { Collapsible, type CollapsibleProps } from "../collapsible";
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

const LinkSoundcloud: FC<{ link: LinkItem }> = ({ link }) => {
  const itemUrl = link.url;
  const embedUrl = useMemo(() => {
    const url = new URL(itemUrl);
    url.hostname = "w.soundcloud.com";
    url.pathname = "/player/";
    url.searchParams.set("url", itemUrl);
    url.searchParams.set("color", "#ff5500");
    url.searchParams.set("auto_play", "false");
    url.searchParams.set("hide_related", "false");
    url.searchParams.set("show_comments", "true");
    url.searchParams.set("show_user", "true");
    url.searchParams.set("show_reposts", "false");
    url.searchParams.set("show_teaser", "true");

    return url.toString();
  }, [itemUrl]);

  return (
    <Collapsible renderOnOpen title={link.title ?? link.type}>
      <iframe
        allow="autoplay"
        frameBorder="no"
        height="166"
        scrolling="no"
        src={embedUrl}
        width="100%"
      />
    </Collapsible>
  );
};

const bandcampEmbeddableRegex = /^\/(album|track)\//;
const LinkBandcamp: FC<{ link: LinkItem }> = ({ link }) => {
  const isEmbeddable = useMemo(() => {
    const itemUrl = new URL(link.url);

    return bandcampEmbeddableRegex.test(itemUrl.pathname);
  }, [link.url]);

  const RenderEmbed: FC = useCallback(() => {
    const embedQuery = api.embed.bandcamp.useQuery(
      {
        url: link.url,
      },
      {
        refetchOnWindowFocus: false,
        // refetchOnReconnect: false,
        // refetchOnMount: false,
      },
    );

    if (embedQuery.isLoading) {
      return <span>Loading...</span>;
    }

    if (embedQuery.isError) {
      return <span>Error loading embed</span>;
    }

    const embedInfo = embedQuery.data?.embed;

    if (!embedInfo?.url) {
      return null;
    }

    return (
      <iframe
        seamless
        className="h-[120px] w-full border-none"
        src={embedInfo.url}
        style={{
          height: embedInfo.height,
        }}
      >
        <a href={link.url}>
          {embedInfo.title ?? link.title ?? "Bandcamp link"}
        </a>
      </iframe>
    );
  }, [link.url, link.title]);

  return (
    <LinkDefault
      renderOnOpen
      link={link}
      title={isEmbeddable ? link.title ?? link.type : null}
    >
      {isEmbeddable ? <RenderEmbed /> : null}
    </LinkDefault>
  );
};

const LinkDefault: FC<
  PropsWithChildren<
    Partial<CollapsibleProps> & {
      link: LinkItem;
    }
  >
> = ({ link, ...props }) => {
  return (
    <Collapsible
      {...props}
      title={
        props.title ?? (
          <a
            className="flex-1"
            href={link.url}
            rel="noopener noreferrer"
            target="_blank"
          >
            {link.title ?? link.type}
          </a>
        )
      }
    />
  );
};

export const CollapsibleLinks: FC<CollapsibleLinksProps> = ({
  links,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn(
        "flex flex-col gap-1 border-t-2 border-t-off-black pt-1",
        props.className,
      )}
    >
      {links.map((link) => {
        const key = `${link.type}$${link.url}`;

        switch (link.type) {
          case LinkType.Youtube: {
            return (
              <Collapsible
                key={key}
                renderOnOpen
                title={link.title ?? link.type}
              >
                <AspectRatio className={$style.youtube} ratio={16 / 9}>
                  <YouTubeEmbed
                    height="100%"
                    url={link.url}
                    width="100%"
                    youTubeProps={{
                      loading: "lazy",
                      opts: {
                        playerVars: {
                          loop: 1,
                          modestbranding: 1,
                        },
                      },
                    }}
                  />
                </AspectRatio>
              </Collapsible>
            );
          }

          case LinkType.Soundcloud: {
            return <LinkSoundcloud key={key} link={link} />;
          }

          case LinkType.Bandcamp: {
            return <LinkBandcamp key={key} link={link} />;
          }
        }

        return <LinkDefault key={key} link={link} />;
      })}
    </div>
  );
};
