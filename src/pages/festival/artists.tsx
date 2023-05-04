import { atom, useAtom, useAtomValue } from "jotai";
import { type NextPage } from "next";
import Head from "next/head";
import { type FC, useMemo, useState } from "react";

import ImageIconFilter from "~/assets/page/festival/artists/icon-filter.svg";
import { Animated } from "~/components/base/animated";
import { Button } from "~/components/base/button";
import { AppDrawer } from "~/components/base/drawer";
import { AppImage } from "~/components/base/image";
import { Tag } from "~/components/base/tag";
import { tags } from "~/store/tags";
import { api } from "~/utils/jotaiApi";
import { cn, escapeSelector } from "~/utils/style";

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
  const [tagSelectorOpen, setTagSelectorOpen] = useState(false);

  return (
    <>
      <div className="max-br:hidden">
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
      </div>
      <div className="flex items-center tracking-tight br:hidden">
        <h1 className="text-2xl">Svi izvođači</h1>

        <Button
          className="ml-auto flex-row text-2xl"
          onClick={() => {
            setTagSelectorOpen((prev) => !prev);
          }}
        >
          <span className="flex items-center gap-2 py-0.5">
            Filtriraj
            <img
              alt="filtriraj"
              className="inline-block"
              src={(ImageIconFilter as { src: string }).src}
            />
          </span>
        </Button>

        <AppDrawer open={tagSelectorOpen} onChange={setTagSelectorOpen}>
          <div className="relative mt-2 flex h-full flex-col text-center text-2xl tracking-tight">
            <button
              className="absolute left-0 text-[#c5c5c5]"
              type="button"
              onClick={() => setTagSelectorOpen(false)}
            >
              Natrag
            </button>
            <h1 className="mx-auto">Filtriraj</h1>

            <div className="flex flex-1 items-center">
              <div className="flex flex-1 flex-wrap gap-y-3">
                {tags.map((tag) => {
                  return (
                    <Tag
                      key={tag.name}
                      className="px-3"
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
            </div>

            <div className="mt-auto flex">
              <Button
                className="w-full border-[#8e8e8e] text-[42px] leading-none text-[#8e8e8e]"
                onClick={() => setTagSelectorOpen(false)}
              >
                odaberi
              </Button>
            </div>
          </div>
        </AppDrawer>
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
    <Animated className="my-5 flex flex-col gap-16 br:my-24 br:gap-24">
      {artists.map((artist) => {
        return (
          <article
            key={artist.id}
            className="flex scroll-m-16 flex-col-reverse gap-4 tracking-tight br:grid br:grid-cols-[1fr_20rem]"
            id={escapeSelector(`artist-${artist.name}`)}
          >
            <div>
              <h2 className="flex gap-2 text-[40px] leading-[0.95] br:text-[54px]">
                <span className="font-bold">{artist.name}</span>
                <span className="uppercase br:flex-1">
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
                className="mt-6 flex flex-col gap-1.5 leading-5 br:gap-2"
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
      <div className="br:mr-[18px]">
        <TagList />
        <ArtistsList />
      </div>
    </>
  );
};

export default PageFestivalArtists;
