import type { Link } from "~/app/types/link"

export function mountCsv(links: Link[]) {
  const csvContent = links.map(link => [
    link.originalUrl,
    link.shortUrl,
    link.accessCount,
    link.createdAt.toISOString()
  ]).join('\n')

  const headers = ['Original URL', 'Short URL', 'Access Count', 'Created At'].join(',')
  const csvData = `${headers}\n${csvContent}`

  return csvData
}