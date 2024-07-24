import { type NextPage } from "next";
import { NextSeo } from "next-seo";

import {
  CollapsibleLinks,
  type LinkItem,
  LinkType,
} from "~/components/base/collapsible-links";
import { type WithFooter } from "~/types/layout";

const PageAbout: WithFooter<NextPage> = () => {
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
    {
      type: LinkType.Youtube,
      title: "aftermovie",
      url: "https://www.youtube-nocookie.com/embed/0i2mWQAOJbo",
    },
  ] satisfies LinkItem[];

  return (
    <>
      <NextSeo title="Info" />
      <div className="flex flex-col gap-24 pb-16 leading-tight tracking-tight">
        <h1 className="text-3xl leading-none br:text-[42px] br:leading-[1.1]">
          ZEZ — Zavod za eksperimentalni zvuk ove godine slavi svoju 10.
          obljetnicu. KSET-ov program nesvakidašnje glazbe i avanturističkih
          pristupa zvuku obilježit će rođendan koncertima i događanjima kroz
          čitavu godinu uz brojne programske suradnje.
        </h1>

        <div className="flex max-w-4xl flex-col gap-24">
          <div className="flex flex-col gap-12 text-2xl tracking-[-0.036em] [&>div]:flex [&>div]:flex-col [&>div]:gap-2 [&_h2]:mb-1 [&_h2]:text-3xl [&_h2]:font-medium">
            <div>
              <p>
                Ova platforma kroz proteklo desetljeće gurala je hrpu
                raznovrsnih žanrova - od free jazz vratolomija preko prljavih
                riffova iz grotla pakla do eterične elektronike i pop napjeva -
                sve s namjerom da pokaže kako žanr sam po sebi više ne znači
                puno. On danas ne odvaja scene, već ih isprepliće. Svi ljudi,
                kolektivi, žanrovi i stilovi koji su godinama prošli KSET-ovom
                pozornicom imaju ključnu stvar zajedničku - kroz umjetnost žele
                otvoriti oči i uši prema rubnome. Onome što izmiče definiciji i
                škaklja maštu.
              </p>
              <p>
                ZEZ — Zavod za eksperimentalni zvuk 2023. godine slavio je svoju
                10. obljetnicu. KSET-ov program nesvakidašnje glazbe i
                avanturističkih pristupa zvuku obilježio je rođendan koncertima
                i događanjima kroz čitavu godinu uz brojne programske suradnje.
              </p>
              <p>
                Uz to, nezaobilazni ZEZ Festival zabrujio je u proljetnom
                terminu od 3. do 6. svibnja, a Izložba zvuka, rezidencijalni
                program i nova večer za mlade nade čudnovatog stvaralaštva
                ostvarila se na jesen. Soundtrack slavljeničkoj godini pružila
                je i nova ZEZ-ova radijska emisija u eteru Radio Studenta
              </p>
            </div>
            <div>
              <h2>About the project</h2>
              <p>
                In celebration of Zavod za eksperimentalni zvuk&apos;s (ZEZ)
                10th anniversary in 2023, ZEZ team and design-research
                collective DISKO, set out to create a visual language and system
                to be used throughout the year, suitable for various materials:
                festivals, concerts, residencies, workshops, and exhibitions.
                The goal was to encapsulate the essence of experimental music
                through a dynamic and versatile visual representation.
              </p>
              <p>
                Using coding techniques, a system of lines inspired by various
                types of music were developed. These lines vary in shape and
                color, as well as in their movement — whether slow, fast,
                vibrating, or flickering — to characterize different groups of
                music genres.
              </p>
            </div>
            <div>
              <h2>About the website</h2>
              <p>
                The ZEZ website features an interactive image generator. This
                tool allows you to experiment with different characterizations
                of lines that symbolize music genres, enabling you to create
                your own unique ZEZ experimental music image. Whether
                you&apos;re a fan of ambient drones or high-energy noise, you
                can explore the intersection of visual art and sound through
                this creative platform.
              </p>
              <p>
                We invite you to immerse yourself in the world of experimental
                music and art by generating images that resonate with your
                interpretation of the genre. Share your ZEZ image on Instagram
                and tag @zezfestival to contribute to our online depository,
                showcasing the diverse and vibrant community of experimental
                music enthusiasts. Your creations will help build a collective
                visual celebration of ZEZ&apos;s journey and impact.
              </p>
            </div>
            <div>
              <h2>Credits</h2>
              <p>
                ZEZ team: Nina Maštruko ?
                <br />
                Brand identity: DISKO (Andreja Lovreković, Martina Petric, Ela
                Meseldžić)
                <br />
                Image generator program: Dražen Hižak
                <br />
                Web development: Josip Igrec
              </p>
            </div>
          </div>

          <CollapsibleLinks className="text-2xl tracking-tight" links={links} />
        </div>
      </div>
    </>
  );
};

// PageInfo.getFooter = () => {
//   return (
//     <img
//       alt="background"
//       className="mt-52 h-52 w-screen object-cover object-top"
//       src={ImgVideoPoster.src}
//     />
//   );
// };

export default PageAbout;
