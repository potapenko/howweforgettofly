import { ArrowUpRight } from "@phosphor-icons/react/ArrowUpRight";
import { Link } from "react-router-dom";
import { EditorialSpot, doorwaySpots } from "./EditorialSpot";
import { useLocale } from "../i18n/LocaleContext";
import { canonicalBookHref } from "../navigation/bookNavigation";

interface RouteCardProps {
  number?: string;
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  tone?: "rust" | "ochre" | "blue" | "quiet";
}

export function RouteCard({
  number,
  eyebrow,
  title,
  body,
  href,
  tone = "quiet",
}: RouteCardProps) {
  const locale = useLocale();
  const spot = doorwaySpots[href];
  return (
    <Link
      className={`route-card tone-${tone}`}
      preventScrollReset
      to={canonicalBookHref(href, locale)}
    >
      <div className="route-card-topline">
        <span>{number ?? eyebrow}</span>
        <ArrowUpRight weight="thin" aria-hidden="true" />
      </div>
      {spot ? <EditorialSpot name={spot} /> : null}
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h3>{title}</h3>
        <p>{body}</p>
      </div>
    </Link>
  );
}
