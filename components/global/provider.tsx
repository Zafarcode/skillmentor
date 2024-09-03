'use client'
import { ThemeProvider } from '@/components/global/theme-provider'
import { ChildrenProps } from '@/types'
import { SessionProvider } from 'next-auth/react'

const RootProvider = ({ children }: ChildrenProps) => {
	return (
		<ThemeProvider
			attribute='class'
			defaultTheme='system'
			enableSystem
			disableTransitionOnChange
		>
			<SessionProvider>{children}</SessionProvider>
		</ThemeProvider>
	)
}

export default RootProvider
