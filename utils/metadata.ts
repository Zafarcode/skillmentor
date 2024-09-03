import type { Metadata } from 'next/types'

export function createMetadata(override: Metadata): Metadata {
	return {
		...override,
		openGraph: {
			title: override.title ?? 'Next Starter',
			description:
				override.description ??
				'Next.js + Prisma + Radix UI + Tailwind CSS + Vercel.',
			url: 'https://example.uz',
			images: 'https://example.uz/og.png',
			siteName: 'Next Starter',
			...override.openGraph,
		},
		twitter: {
			card: 'summary_large_image',
			creator: '@miracleprogrammer',
			title: override.title ?? 'Next Starter',
			description:
				override.description ??
				'Next.js + Prisma + Radix UI + Tailwind CSS + Vercel.',
			images: 'https://example.uz/og.png',
			...override.twitter,
		},
	}
}

export const baseURL =
	process.env.NODE_ENV === 'development'
		? new URL('http://localhost:3000')
		: new URL(`https://${process.env.VERCEL_URL!}`)
