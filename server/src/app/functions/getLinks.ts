import type { Link } from "~/app/types/link";
import { db } from "~/infra/database";
import { links } from "~/infra/database/schemas/links";

export async function getLinks(): Promise<Link[]> {
	return db.select().from(links);
}
