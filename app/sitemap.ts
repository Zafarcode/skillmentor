import { baseURL } from '@/utils/metadata'
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: `${baseURL}/`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 0.7,
		},
		// Add more URLs here
	]
}
