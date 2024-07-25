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
                Over the past decade, this platform has pushed a variety of
                genres — from free jazz acrobatics and dirty riffs from the
                depths of hell to ethereal electronics and pop tunes — all with
                the intention of showing that genres themselves no longer mean
                much. Today, they don&apos;t separate scenes but intertwine
                them. All the people, collectives, genres, and styles that have
                graced KSET&apos;s stage over the years have one key thing in
                common — they aim to open eyes and ears to the fringe through
                art. To what escapes definition and tickles the imagination.
              </p>
              <p>
                ZEZ — the Institute for Experimental Sound celebrated its 10th
                anniversary in 2023. KSET&apos;s program of unconventional music
                and adventurous approaches to sound marked the occasion with
                concerts and events throughout the year, alongside numerous
                program collaborations. Additionally, the indispensable ZEZ
                Festival resonated in the spring from May 3 to 6, and the Sound
                Exhibition, a residency program, and a new evening for young
                hopefuls of curious creation took place in the fall. The
                celebratory year&apos;s soundtrack was also provided by a new
                ZEZ radio show on Radio Student.
              </p>
            </div>

            <div>
              <h2>About the website</h2>
              <p>
                To celebrate ZEZ&apos;s 10th anniversary in 2023, ZEZ and the
                design-research collective DISKO developed a new visual language
                for festivals, concerts, residencies, workshops, and
                exhibitions. Code was used to design a program that generates a
                system of lines to represent the diversity and experimental
                nature of the ZEZ festival.
              </p>
              <p>
                These lines vary in shape and color, as well as in their
                movement — whether slow, fast, vibrating, or flickering — to
                characterize different music genres. The main visual for ZEZ,
                which visualizes all genres, celebrates the festival&apos;s 10th
                anniversary, providing a venue for listening to and expressing
                the unconventional.
              </p>
              <p>
                Eight parameters influence the visual outcome of the image
                generator: 1. Selection of one of the five line types, 2. Bundle
                size—the number of lines emerging from a single bundle, 3. Speed
                of line movement, 4. Line weight—the thickness of the line, 5.
                Line discontinuity—whether the line is dashed or solid, 6.
                Amplitude—the intensity of line movement, 7. Line color, and 8.
                Background color.
              </p>
              <p>
                This program was incorporated into the ZEZ website, allowing
                everyone to experiment with these parameters and create their
                own unique ZEZ visuals. We invite you to immerse yourself in the
                world of experimental music and art by generating images that
                resonate with your interpretation of the genre.
              </p>
              <p>
                Share your ZEZ image on Instagram and tag @zezfestival to
                contribute to our online depository, showcasing the diverse and
                vibrant community of experimental music enthusiasts. Your
                creations will help build a collective visual celebration of
                ZEZ&apos;s journey and impact.
              </p>
            </div>

            <div>
              <h2>Credits (ZEZ &apos;23)</h2>
              <p>
                Public Relations: Ivan Odak, Marjan Klišanin, Nina Maštruko,
                KSET PR team
                <br />
                Organisation: Luka Babić, Mirna Čupić, Patrik Klepić, Vid
                Marinović, Nina Maštruko, Tin Miletić, Matija Resman
                <br />
                Production: KSET music section
                <br />
                Brand identity: Martina Petric, Ela Meseldžić, Andreja
                Lovreković
                <br />
                Photograhy: Palma Poljaković
                <br />
                Web development: Josip Igrec
                <br />
                Image generator program: Dražen Hižak, Josip Igrec
                <br />
                Typography: Dwight (Lift type)
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
