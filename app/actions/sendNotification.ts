'use server'

export async function sendWhatsappNotification(pendaftar: any) {
    const ticketLink = `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3001'}/ticket/${pendaftar.id}`

    // Format Phone Number (08 -> 62)
    let phone = pendaftar.no_telepon.replace(/\D/g, '')
    if (phone.startsWith('0')) {
        phone = '62' + phone.slice(1)
    }

    const message = `Halo ${pendaftar.nama_lengkap},

Terima kasih telah mendaftar di seminar *Woman's Wellbeing*.

Berikut adalah *Tiket QR Code* Anda untuk akses masuk acara:
${ticketLink}

Harap tunjukkan QR Code ini di meja registrasi saat acara.

Sampai jumpa!
*Panitia RSMS*`

    try {
        const fonnteRes = await fetch('https://api.fonnte.com/send', {
            method: 'POST',
            headers: {
                'Authorization': '7FK7cr9MhSWyNYfaRFgd', // Token Fonnte
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                target: phone,
                message: message,
                countryCode: '62',
            }),
        })

        const responseText = await fonnteRes.text()
        console.log('Fonnte Response:', responseText)

        if (!fonnteRes.ok) {
            return { success: false, error: responseText }
        }
        return { success: true }
    } catch (err) {
        console.error('Fonnte Network Error:', err)
        return { success: false, error: 'Network Error' }
    }
}
