'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '../shadcn/breadcrumb'
import { Separator } from '../shadcn/separator'
import { SidebarTrigger } from '../shadcn/sidebar'
import NavLink from './nav-link'
import ThemeSwitcher from './theme-switcher'

const segmentLabels: Record<string, string> = {
    account: 'Account',
    assignments: 'Assignments',
    geo: 'Geo',
    playground: 'Playground',
    security: 'Security',
    settings: 'Settings',
}

type BreadcrumbEntry = {
    href?: string
    label: string
}

function humanizeSegment(segment: string) {
    return decodeURIComponent(segment)
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, (character) => character.toUpperCase())
}

function buildBreadcrumbs(
    pathname: string,
    assignmentId: string | null,
    assignmentTitle: string | null
) {
    const segments = pathname.split('/').filter(Boolean)

    if (!segments.length) {
        return [{ label: 'Workspace' }]
    }

    return segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join('/')}`
        const isAssignmentDetail =
            segments[0] === 'assignments' && index === 1 && segment === assignmentId

        return {
            href: index === segments.length - 1 ? undefined : href,
            label: isAssignmentDetail
                ? assignmentTitle || 'Assignment'
                : segmentLabels[segment] || humanizeSegment(segment),
        } satisfies BreadcrumbEntry
    })
}

export default function Header() {
    const pathname = usePathname()

    const segments = React.useMemo(
        () => pathname.split('/').filter(Boolean),
        [pathname]
    )
    const assignmentId =
        segments[0] === 'assignments' && segments[1] ? segments[1] : null

    const [assignmentTitle, setAssignmentTitle] = React.useState<string | null>(null)

    React.useEffect(() => {
        if (!assignmentId) {
            setAssignmentTitle(null)
            return
        }

        const controller = new AbortController()

        setAssignmentTitle(null)

        void fetch(`/api/assignments/${assignmentId}`, {
            cache: 'no-store',
            signal: controller.signal,
        })
            .then(async (response) => {
                if (!response.ok) {
                    return null
                }

                return response.json()
            })
            .then((data) => {
                if (typeof data?.title === 'string' && !controller.signal.aborted) {
                    setAssignmentTitle(data.title)
                }
            })
            .catch(() => {
                if (!controller.signal.aborted) {
                    setAssignmentTitle(null)
                }
            })

        return () => {
            controller.abort()
        }
    }, [assignmentId])

    const breadcrumbs = React.useMemo(
        () => buildBreadcrumbs(pathname, assignmentId, assignmentTitle),
        [pathname, assignmentId, assignmentTitle]
    )

    return (
        <header className="flex h-16 shrink-0 items-center gap-3 px-4 sm:px-5 lg:px-6">
            <div className="flex min-w-0 flex-1 items-center gap-3">
                <SidebarTrigger className="size-8" />
                <Separator
                    className="data-[orientation=vertical]:h-4"
                    orientation="vertical"
                />

                <div className="min-w-0 flex-1">
                    <Breadcrumb>
                        <BreadcrumbList className="min-w-0">
                            {breadcrumbs.map((item, index) => (
                                <React.Fragment key={`${item.label}-${index}`}>
                                    <BreadcrumbItem className="min-w-0">
                                        {item.href ? (
                                            <BreadcrumbLink
                                                asChild
                                                className="truncate"
                                            >
                                                <Link href={item.href}>{item.label}</Link>
                                            </BreadcrumbLink>
                                        ) : (
                                            <BreadcrumbPage className="truncate">
                                                {item.label}
                                            </BreadcrumbPage>
                                        )}
                                    </BreadcrumbItem>
                                    {index < breadcrumbs.length - 1 ? (
                                        <BreadcrumbSeparator />
                                    ) : null}
                                </React.Fragment>
                            ))}
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>

                <NavLink guest path="/auth/sign-in" text="Sign In" />
            </div>

            <ThemeSwitcher />
        </header>
    )
}
