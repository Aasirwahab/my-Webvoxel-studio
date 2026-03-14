import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const {
            name, email, company, phone, website, industry, teamSize,
            helpWith, bottleneck, contactMethod,
            // Legacy fields
            budget, details
        } = body

        const messageBody = helpWith || details

        // Validate required fields
        if (!name || !email || !messageBody) {
            return NextResponse.json(
                { error: 'Missing required fields.' },
                { status: 400 }
            )
        }

        // Create transporter using Gmail SMTP
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        })

        // Build detail rows for notification email
        const rows = [
            { label: 'Name', value: name },
            { label: 'Email', value: `<a href="mailto:${email}" style="color: #a78bfa; text-decoration: none;">${email}</a>` },
            { label: 'Company', value: company || '—' },
            { label: 'Phone', value: phone || '—' },
            { label: 'Website', value: website ? `<a href="${website}" style="color: #a78bfa; text-decoration: none;">${website}</a>` : '—' },
            { label: 'Industry', value: industry || '—' },
            { label: 'Team Size', value: teamSize || '—' },
            { label: 'Contact Method', value: contactMethod || '—' },
            ...(budget ? [{ label: 'Budget', value: budget }] : []),
            ...(bottleneck ? [{ label: 'Bottleneck', value: bottleneck }] : []),
        ]

        const tableRows = rows.map(r => `
            <tr>
                <td style="padding: 14px 0; border-bottom: 1px solid #1e1e1e; color: #888; font-size: 13px; text-transform: uppercase; letter-spacing: 1px; width: 140px;">${r.label}</td>
                <td style="padding: 14px 0; border-bottom: 1px solid #1e1e1e; font-size: 16px;">${r.value}</td>
            </tr>
        `).join('')

        // Email to the business (notification)
        const notificationMail = {
            from: `"WebVoxel Studio" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            replyTo: email,
            subject: `New Inquiry from ${name}${company ? ` (${company})` : ''} — WebVoxel Studio`,
            html: `
                <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #ffffff; border-radius: 12px; overflow: hidden;">
                    <div style="background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%); padding: 40px 40px 32px; border-bottom: 1px solid #222;">
                        <h1 style="margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">New Systems Inquiry</h1>
                        <p style="margin: 8px 0 0; color: #888; font-size: 14px;">Submitted via WebVoxel Studio — Book a Systems Call</p>
                    </div>

                    <div style="padding: 40px;">
                        <table style="width: 100%; border-collapse: collapse;">
                            ${tableRows}
                        </table>

                        <div style="margin-top: 32px;">
                            <p style="margin: 0 0 12px; color: #888; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">What they need help with</p>
                            <div style="background: #111; border: 1px solid #222; border-radius: 8px; padding: 20px; font-size: 15px; line-height: 1.7; color: #e5e5e5; white-space: pre-wrap;">${messageBody}</div>
                        </div>

                        <div style="margin-top: 32px; text-align: center;">
                            <a href="mailto:${email}" style="display: inline-block; background: #a78bfa; color: #000; padding: 14px 32px; border-radius: 50px; font-weight: 700; font-size: 15px; text-decoration: none; letter-spacing: 0.5px;">Reply to ${name}</a>
                        </div>
                    </div>

                    <div style="padding: 24px 40px; background: #0d0d0d; border-top: 1px solid #1e1e1e; text-align: center; color: #555; font-size: 12px;">
                        WebVoxel Studio · webvoxelstudio.uk
                    </div>
                </div>
            `,
        }

        // Confirmation email to the client
        const confirmationMail = {
            from: `"WebVoxel Studio" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `We received your inquiry, ${name.split(' ')[0]}! — WebVoxel Studio`,
            html: `
                <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #ffffff; border-radius: 12px; overflow: hidden;">
                    <div style="background: linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%); padding: 40px 40px 32px; border-bottom: 1px solid #222; text-align: center;">
                        <h1 style="margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">Thank You, ${name.split(' ')[0]}!</h1>
                        <p style="margin: 12px 0 0; color: #888; font-size: 16px; line-height: 1.6;">We have received your inquiry and will be in touch within <strong style="color: #a78bfa;">24 hours</strong>.</p>
                    </div>

                    <div style="padding: 40px; text-align: center;">
                        <div style="display: inline-block; background: #111; border: 1px solid #222; border-radius: 12px; padding: 24px 32px; margin-bottom: 32px; text-align: left; width: 100%; box-sizing: border-box;">
                            <p style="margin: 0 0 8px; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Your Submission Summary</p>
                            <p style="margin: 4px 0; font-size: 14px; color: #999; margin-top: 12px; line-height: 1.6;">${messageBody.slice(0, 200)}${messageBody.length > 200 ? '...' : ''}</p>
                        </div>

                        <p style="color: #888; font-size: 15px; line-height: 1.7; margin: 0 0 32px;">While you wait, explore our work or follow us for updates.</p>

                        <a href="https://www.webvoxelstudio.uk/works" style="display: inline-block; background: #a78bfa; color: #000; padding: 14px 32px; border-radius: 50px; font-weight: 700; font-size: 15px; text-decoration: none;">View Our Work →</a>
                    </div>

                    <div style="padding: 24px 40px; background: #0d0d0d; border-top: 1px solid #1e1e1e; text-align: center; color: #555; font-size: 12px;">
                        WebVoxel Studio · webvoxelstudio.uk · <a href="mailto:info@webvoxelstudio.uk" style="color: #555; text-decoration: none;">info@webvoxelstudio.uk</a>
                    </div>
                </div>
            `,
        }

        await transporter.sendMail(notificationMail)
        await transporter.sendMail(confirmationMail)

        return NextResponse.json({ success: true, message: 'Inquiry sent successfully!' })
    } catch (error) {
        console.error('Contact form error:', error)
        return NextResponse.json(
            { error: 'Failed to send email. Please try again.' },
            { status: 500 }
        )
    }
}
