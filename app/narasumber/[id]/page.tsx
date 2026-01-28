import Link from 'next/link'
import { ArrowLeft, Briefcase, GraduationCap, Award, MapPin } from 'lucide-react'
import { speakers } from '@/lib/speakers'
import { notFound } from 'next/navigation'

// Generate static params if we were doing static export, but for now standard dynamic is fine
export function generateStaticParams() {
    return speakers.map((speaker) => ({
        id: speaker.id,
    }))
}

export default async function SpeakerPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const speaker = speakers.find((pid) => pid.id === params.id)

    if (!speaker) {
        notFound()
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* Header / Banner */}
            <div className={`h-48 md:h-64 bg-gradient-to-r ${speaker.color} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="container mx-auto px-4 h-full flex items-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-white/90 hover:text-white font-medium transition-colors bg-white/10 backdrop-blur-md px-4 py-2 rounded-full absolute top-8 left-4 md:left-8"
                    >
                        <ArrowLeft size={18} />
                        Kembali
                    </Link>
                </div>
            </div>

            <div className="container mx-auto px-4 -mt-24 relative z-10">
                <div className="max-w-4xl mx-auto">
                    {/* Profile Card */}
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-8">
                        <div className="p-8 md:p-10 text-center md:text-left flex flex-col md:flex-row items-center gap-8">
                            {/* Avatar */}
                            <div className={`w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br ${speaker.color} flex items-center justify-center text-white font-black text-4xl md:text-5xl shadow-lg border-4 border-white shrink-0`}>
                                {speaker.image.startsWith('/') ? (
                                    <img
                                        src={speaker.image}
                                        alt={speaker.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    speaker.image
                                )}
                            </div>

                            {/* Basic Info */}
                            <div className="flex-1">
                                <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2 leading-tight">
                                    {speaker.name}
                                </h1>
                                <p className="text-lg text-primary font-bold mb-4">{speaker.institution}</p>
                                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                                    {speaker.tags.map((tag) => (
                                        <span key={tag} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-sm font-semibold">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Content Grid */}
                        <div className="grid md:grid-cols-3 gap-0 md:divide-x divide-slate-100 border-t border-slate-100">
                            {/* About */}
                            <div className="p-8 md:col-span-2 space-y-8">
                                <section>
                                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <Briefcase className="text-primary" size={20} />
                                        Tentang
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed text-lg">
                                        {speaker.about}
                                    </p>
                                </section>

                                <section>
                                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <Award className="text-secondary" size={20} />
                                        Pengalaman Profesional
                                    </h3>
                                    <ul className="space-y-3">
                                        {speaker.experience.map((exp, idx) => (
                                            <li key={idx} className="flex gap-3 text-slate-600">
                                                <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 shrink-0"></span>
                                                {exp}
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                            </div>

                            {/* Sidebar Info */}
                            <div className="p-8 bg-slate-50 md:bg-white space-y-8">
                                <section>
                                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <GraduationCap className="text-accent" size={20} />
                                        Pendidikan
                                    </h3>
                                    <ul className="space-y-4">
                                        {speaker.education.map((edu, idx) => (
                                            <li key={idx} className="text-sm">
                                                <div className="font-semibold text-slate-700">{edu.split(' - ')[0]}</div>
                                                <div className="text-slate-500">{edu.split(' - ')[1]}</div>
                                            </li>
                                        ))}
                                    </ul>
                                </section>

                                <section>
                                    <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                                        <MapPin className="text-green-600" size={20} />
                                        Keahlian
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {speaker.expertise.map((skill, idx) => (
                                            <span key={idx} className="px-3 py-1 bg-white border border-slate-200 text-slate-600 rounded-full text-xs font-semibold shadow-sm">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
