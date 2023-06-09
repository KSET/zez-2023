import { type NextPage } from "next";
import Link, { type LinkProps } from "next/link";
import { type FC } from "react";

import { escapeSelector } from "~/utils/style";

const artistLink = (name: string) => {
  return {
    pathname: `/festival/artists`,
    hash: `#${encodeURIComponent(escapeSelector(`artist-${name}`))}`,
  };
};

const EventLink: FC<{ name: string; link?: LinkProps["href"] }> = ({
  name,
  link,
}) => {
  if (!link) {
    return <>{name}</>;
  }

  if (typeof link === "string") {
    return (
      <a
        className="underline"
        href={link}
        rel="noopener noreferrer"
        target="_blank"
      >
        {name}
      </a>
    );
  }

  return (
    <Link className="underline" href={link}>
      {name}
    </Link>
  );
};

const PageFestivalProgram: NextPage = () => {
  const eventDays = [
    {
      date: "srijeda 03.05.",
      events: [
        {
          time: "20:00",
          name: "Ulaz",
          link: "https://www.kset.org/dogadaj/2023-05-03-zez-festival-puce-mary-kenji-araki/",
        },
        {
          time: "21:15",
          name: "Kenji Araki",
          link: artistLink("Kenji Araki"),
        },
        {
          time: "22:15",
          name: "Puce Mary",
          link: artistLink("Puce Mary"),
        },
      ],
    },
    {
      date: "četvrtak 04.05.",
      events: [
        {
          time: "15:00 - 19:00",
          name: "Tin Dožić: Radionica terenskog snimanja",
        },
        {
          time: "20:00",
          name: "Ulaz",
          link: "https://www.kset.org/dogadaj/2023-05-04-zez-festival-czn-valentina-magaletti-joao-pais-anti-teleological-rock-combo/",
        },
        {
          time: "21:15",
          name: "The Anti-Teleological Rock Combo",
          link: artistLink("The Anti-Teleological Rock Combo"),
        },
        {
          time: "22:15",
          name: "CZN: Valentina Magaletti & João Pais",
          link: artistLink("CZN"),
        },
      ],
    },
    {
      date: "petak 05.05.",
      events: [
        {
          time: "20:00",
          name: "Ulaz",
          link: "https://www.kset.org/dogadaj/2023-05-05-zez-festival-felicia-atkinson-manja-ristic/",
        },
        {
          time: "20:45",
          name: "Manja Ristić",
          link: artistLink("Manja Ristić"),
        },
        {
          time: "21:45",
          name: "Félicia Atkinson",
          link: artistLink("Félicia Atkinson"),
        },
      ],
    },
    {
      date: "subota 06.05.",
      events: [
        {
          time: "14:00 - 16:00",
          name: "Tarik Haskić: Radionica osviještenog slušanja",
          link: "https://www.kset.org/dogadaj/2023-05-04-zez-festival-radionica-terenskog-snimanja/",
        },
        {
          time: "21:00",
          name: "Ulaz",
          link: "https://www.kset.org/dogadaj/2023-04-06-zez-festival-petbrick-bile-eater-osol/",
        },
        {
          time: "21:15",
          name: "OSOL",
          link: artistLink("OSOL"),
        },
        {
          time: "22:00",
          name: "Bile Eater",
          link: artistLink("Bile Eater"),
        },
        {
          time: "22:45",
          name: "Petbrick",
          link: artistLink("PETBRICK"),
        },
        {
          time: "Afterparty:",
        },
        {
          time: "00:00 - 1:30",
          name: "lilacube",
          link: artistLink("lilacube"),
        },
        {
          time: "01:30 - 04:00",
          name: "DJ Extinction",
          link: artistLink("DJ Extinction"),
        },
      ],
    },
  ];

  return (
    <div className="mt-12 flex flex-col gap-[42px] tracking-tight">
      {eventDays.map((eventDay) => {
        return (
          <div key={eventDay.date}>
            <h2 className="text-[42px] leading-none">{eventDay.date}</h2>
            <ol className="mt-4 text-[26px] leading-9">
              {eventDay.events.map((event) => {
                return (
                  <li key={`${event.time}-${event.name ?? ""}`}>
                    {event.time}{" "}
                    {event.name ? (
                      <strong>
                        <EventLink {...event} />
                      </strong>
                    ) : null}
                  </li>
                );
              })}
            </ol>
          </div>
        );
      })}
    </div>
  );
};

export default PageFestivalProgram;
