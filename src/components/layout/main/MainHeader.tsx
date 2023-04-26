import Link from "next/link";
import { type FC } from "react";
import { type UrlObject } from "url";

import { fontDisplay } from "~/utils/font";
import { cn } from "~/utils/style";

export type NavLinkProps = {
  href: string | UrlObject;
  label: string;
  subItems?: Omit<NavLinkProps, "subItems">[];
};

const NavLink: FC<NavLinkProps> = ({ href, label, subItems }) => {
  const hasSubItems = 1 <= (subItems?.length ?? 0);

  return (
    <li className={cn(hasSubItems ? ["relative", "group/item"] : undefined)}>
      <Link href={href}>
        <div className="rounded-full border-4 border-black bg-white px-4 py-2 leading-none hover:bg-black hover:text-white">
          {label}
        </div>
      </Link>
      {hasSubItems ? (
        <ul className="absolute z-10 hidden flex-col items-start gap-1 overflow-clip pt-1 hover:flex group-hover/item:flex">
          {subItems!.map((subItem) => (
            <NavLink key={String(subItem.href)} {...subItem} />
          ))}
        </ul>
      ) : null}
    </li>
  );
};

export const MainHeader: FC = () => {
  const links = [
    {
      href: "#/concerts",
      label: "concerts",
    },
    {
      href: "#/festival",
      label: "festival",
      subItems: [
        {
          href: "#/lineup",
          label: "lineup",
        },
        {
          href: "#/artists",
          label: "artists",
        },
        {
          href: "#/programme",
          label: "programme",
        },
      ],
    },
    {
      href: "#/info",
      label: "info",
    },
  ] satisfies NavLinkProps[];

  return (
    <header
      className={cn(
        "container flex text-4xl max-br:text-xl",
        fontDisplay.className,
      )}
    >
      <nav className="my-4 flex-1">
        <ul className="flex flex-wrap items-center justify-end gap-x-8 gap-y-2 max-br:gap-x-2">
          {links.map((props) => (
            <NavLink key={props.href} {...props} />
          ))}
        </ul>
      </nav>
    </header>
  );
};
