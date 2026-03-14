"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

const convex = convexUrl
    ? new ConvexReactClient(convexUrl)
    : null;

export default function ConvexClerkProvider({
    children,
}: {
    children: ReactNode;
}) {
    if (!convex) {
        return (
            <ClerkProvider
                publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string}
            >
                {children}
            </ClerkProvider>
        );
    }

    return (
        <ClerkProvider
            publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string}
        >
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                {children}
            </ConvexProviderWithClerk>
        </ClerkProvider>
    );
}
