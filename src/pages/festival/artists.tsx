import { atom, useAtom, useAtomValue } from "jotai";
import { type NextPage } from "next";
import Head from "next/head";
import { type FC, useMemo } from "react";

import { Animated } from "~/components/base/animated";
import { AppImage } from "~/components/base/image";
import { Tag } from "~/components/base/tag";
import { tags } from "~/store/tags";
import { api } from "~/utils/jotaiApi";
import { cn } from "~/utils/style";

const atomArtists = api.artists.getAll.atomWithQuery();

const atomTags = atom(
  Object.entries(tags)
    .map(([name, meta]) => ({ ...meta, name }))
    .sort((lt, gt) => lt.name.localeCompare(gt.name)),
);
const atomSelected = atom({} as Record<string, boolean>);

const TagList: FC = () => {
  const [selected, setSelected] = useAtom(atomSelected);
  const noneSelected = useMemo(() => {
    return !Object.entries(selected).some((x) => x[1]);
  }, [selected]);
  const tags = useAtomValue(atomTags);

  return (
    <>
      <div className="flex flex-wrap">
        {tags.map((tag) => {
          return (
            <Tag
              key={tag.name}
              color={tag.color}
              selected={selected[tag.name]}
              onClick={() => {
                setSelected((prev) => ({
                  ...prev,
                  [tag.name]: !prev[tag.name],
                }));
              }}
            >
              {tag.name}
            </Tag>
          );
        })}
      </div>
      <div className="mt-2">
        <span
          tabIndex={0}
          className={cn(
            "cursor-pointer underline",
            noneSelected &&
              "pointer-events-none select-none opacity-0 transition-opacity",
          )}
          onClick={() => setSelected({})}
        >
          Poništi
        </span>
      </div>
    </>
  );
};

const ArtistsList = () => {
  const allArtists = useAtomValue(atomArtists);
  const selected = useAtomValue(atomSelected);
  const artists = useMemo(() => {
    if (
      Object.entries(selected).filter(([, selected]) => selected).length === 0
    ) {
      return allArtists;
    }

    return allArtists.filter((artist) =>
      artist.tags.some((tag) => selected[tag]),
    );
  }, [allArtists, selected]);

  return (
    <Animated className="mt-24 flex flex-col gap-24 pb-24">
      {artists.map((artist) => {
        return (
          <article key={artist.id} className="grid grid-cols-[1fr_20rem] gap-4">
            <div>
              <h2 className="flex gap-2 text-[54px] leading-[0.8]">
                <span className="font-bold">{artist.name}</span>
                <span className="flex-1 uppercase">
                  ({artist.countries.join("/")})
                </span>
              </h2>
              <div className="mt-[.875rem] flex flex-col items-start">
                {artist.tags.map((tag) => {
                  return (
                    <Tag key={tag} asDisplay color={tags[tag].color}>
                      {tag}
                    </Tag>
                  );
                })}
              </div>
              <div
                dangerouslySetInnerHTML={{
                  __html: artist.description,
                }}
                className="mt-6 flex flex-col gap-2 leading-5"
              />
            </div>
            <AppImage
              alt={artist.name}
              aspectRatio={325 / 260}
              lazySrc={artist.image.blurDataURL}
              src={artist.image.src}
              observerOptions={{
                rootMargin: "128px",
              }}
            />
          </article>
        );
      })}
    </Animated>
  );
};

const PageFestivalArtists: NextPage = () => {
  return (
    <>
      <Head>
        <style>{`
        html {
          overflow-y: scroll;
        }
        `}</style>
      </Head>
      <div className="mr-10">
        <TagList />
        <ArtistsList />
      </div>
    </>
  );
};

export default PageFestivalArtists;
