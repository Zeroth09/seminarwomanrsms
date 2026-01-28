import Image from 'next/image'

export default function PosterThumbnail() {
    return (
        <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md">
            <div className="aspect-[3/4] relative bg-slate-100">
                <Image
                    src="/poster-seminar.png"
                    alt="Poster Seminar"
                    fill
                    className="object-cover"
                />
            </div>
            <div className="p-3 bg-white text-center">
                <p className="text-sm font-bold text-slate-700">
                    Poster Acara
                </p>
            </div>
        </div>
    )
}
