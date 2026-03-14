import BookACallContent from '@/components/sections/contact/BookACallContent'

export const metadata = {
    title: 'Book a Systems Call | WebVoxel Studio',
    description: 'Book a call with WebVoxel Studio to discuss AI systems, workflow automation, custom software, or operational tools for your business.',
}

export default function BookACallPage() {
    return (
        <main className="bg-bg-primary text-text-primary min-h-screen">
            <BookACallContent />
        </main>
    )
}
