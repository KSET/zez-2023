import { type UrlObject } from "node:url";

import Link from "next/link";
import { useRouter } from "next/router";
import { type FC, type HTMLProps } from "react";

import { Button } from "~/components/base/button";
import { cn } from "~/utils/style";

import $style from "./index.module.scss";

export type NavLinkProps = {
  href: string | UrlObject | null;
  label: string;
  subItems?: (NavLinkProps | null | undefined)[];
};

const NavLink: FC<NavLinkProps> = ({ href, label, subItems }) => {
  const hasSubItems = 1 <= (subItems?.length ?? 0);
  const router = useRouter();
  const path = router.asPath;

  const active = (link: NavLinkProps): boolean => {
    if (path.startsWith(String(link.href))) {
      return true;
    }

    return link.subItems?.filter(Boolean).some((x) => active(x)) ?? false;
  };

  const isActive = active({ href, label, subItems });

  return (
    <li
      className={cn(
        hasSubItems ? ["group/item"] : null,
        isActive ? $style.active : null,
        $style.item,
      )}
    >
      <Link
        href={href ?? "#"}
        className={cn(
          "inline-block self-start rounded-full",
          $style.itemLinkText,
        )}
        onClick={(event) => {
          if (!href) {
            event.preventDefault();
          }
        }}
      >
        <Button active={isActive} tabIndex={-1}>
          {label}
        </Button>
      </Link>
      {hasSubItems ? (
        <div className={$style.subItems}>
          <ul>
            {subItems!.filter(Boolean).map((subItem) => (
              <NavLink key={String(subItem.href)} {...subItem} />
            ))}
          </ul>
        </div>
      ) : null}
    </li>
  );
};

export const SideNav: FC<HTMLProps<HTMLDivElement>> = (props) => {
  const links = [
    // {
    //   href: "#/događaji",
    //   label: "događaji",
    // },
    {
      href: null,
      label: "festival",
      subItems: [
        {
          href: "/festival/artists",
          label: "izvođači",
        },
        {
          href: "/festival/program",
          label: "program",
        },
      ],
    },
    {
      href: "/info",
      label: "info",
    },
  ] satisfies NavLinkProps[];

  return (
    <nav {...props} className={cn(props.className, $style.container)}>
      <ul className={$style.items}>
        {links.map((props) => (
          <NavLink key={props.href} {...props} />
        ))}
      </ul>
    </nav>
  );
};
