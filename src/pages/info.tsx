import { type NextPage } from "next";
import { NextSeo } from "next-seo";

import ImgVideoPoster from "~/assets/page/index/bg.png";
import { Button } from "~/components/base/button";
import { Collapsible } from "~/components/base/collapsible";

enum LinkType {
  Facebook = "fb",
  Instagram = "ig",
  Spotify = "spotify",
  Youtube = "yt",
  Soundcloud = "soundcloud",
  Bandcamp = "bandcamp",
  Website = "web",
  Radio = "radioshow",
}

const PageInfo: NextPage = () => {
  const links = [
    {
      type: LinkType.Facebook,
      url: "https://www.facebook.com/zavodzaeksperimentalnizvuk",
    },
    {
      type: LinkType.Instagram,
      url: "https://www.instagram.com/zezfestival",
    },
    {
      type: LinkType.Spotify,
      url: "https://open.spotify.com/user/zezfestival",
    },
    {
      type: LinkType.Radio,
      url: "https://open.spotify.com/user/zezfestival",
    },
  ] satisfies {
    type: LinkType;
    url: string;
  }[];

  return (
    <>
      <NextSeo title="Info" />
      <div className="mx-auto flex max-w-3xl flex-col gap-6 text-2xl">
        <p className="text-4xl leading-none">
          ZEZ — Zavod za eksperimentalni zvuk ove godine slavi svoju 10.
          obljetnicu. KSET-ov program nesvakidašnje glazbe i avanturističkih
          pristupa zvuku obilježit će rođendan koncertima i događanjima kroz
          čitavu godinu uz brojne programske suradnje.
        </p>
        <p>
          Uz to, nezaobilazni ZEZ Festival zabrujit će u proljetnom terminu od
          3. do 6. svibnja, a Izložba zvuka, rezidencijalni program i nova večer
          za mlade nade čudnovatog stvaralaštva ostvarit će se na jesen.
          Soundtrack slavljeničkoj godini pružit će i nova ZEZ-ova radijska
          emisija u eteru Radio Studenta.
        </p>
        <p>
          ZEZ je započeo 2013. godine kao koncertni program, a s vremenom
          mutirao u festivalske formate i stvorio hibridne događaje poput
          Izložbe zvuka i rezidencijalnog programa. Nit vodilja svih programa je
          stvoriti prostor za slušati drugačije - ono što je drugačije, one koji
          su drugačiji i na drugačiji način. Ova platforma kroz proteklo
          desetljeće gurala je hrpu raznovrsnih žanrova - od free jazz
          vratolomija preko prljavih riffova iz grotla pakla do eterične
          elektronike i pop napjeva - sve s namjerom da pokaže kako žanr sam po
          sebi više ne znači puno. On danas ne odvaja scene, već ih isprepliće.
          Svi ljudi, kolektivi, žanrovi i stilovi koji su godinama prošli
          KSET-ovom pozornicom imaju ključnu stvar zajedničku - kroz umjetnost
          žele otvoriti oči i uši prema rubnome. Onome što izmiče definiciji i
          škaklja maštu.
        </p>

        <Collapsible title={<span className="text-3xl">aftermovie</span>}>
          <iframe
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            className="aspect-video w-full pt-2"
            frameBorder="0"
            src="https://www.youtube-nocookie.com/embed/0i2mWQAOJbo"
            title="ZEZ Festival 2022 - Aftermovie"
          />
        </Collapsible>

        {links.length > 0 ? (
          <div className="mt-36 flex flex-wrap gap-2 text-5xl">
            {links.map((link) => (
              <a
                key={[link.type, link.url].join("$")}
                href={link.url}
                rel="noreferrer noopener"
                target="_blank"
              >
                <Button>{link.type}</Button>
              </a>
            ))}
          </div>
        ) : null}
      </div>

      <img
        alt="background"
        className="mt-52 h-52 w-screen object-cover object-top"
        src={ImgVideoPoster.src}
      />
    </>
  );
};

export default PageInfo;
