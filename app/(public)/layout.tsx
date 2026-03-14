import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import CustomCursor from '@/components/ui/CustomCursor'
import Preloader from '@/components/ui/Preloader'
import PageTransitionProvider from '@/components/ui/PageTransitionProvider'
import SmoothScrolling from '@/components/ui/SmoothScrolling'

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SmoothScrolling>
            <Preloader />
            <CustomCursor />
            <PageTransitionProvider>
                <div className="overflow-x-clip w-full relative">
                    <Navbar />
                    <main className="grow pt-24">
                        {children}
                    </main>
                    <Footer />
                </div>
            </PageTransitionProvider>
        </SmoothScrolling>
    )
}
