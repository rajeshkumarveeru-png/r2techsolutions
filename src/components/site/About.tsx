import {type CSSProperties} from 'react'
import {CheckCircle2, Compass, Hammer, LifeBuoy, Palette, Rocket} from 'lucide-react'
import {company} from '../../config/company'
import {Photo, spotlight, useReveal} from './shared'

/* the four steps come straight from your "About our approach" paragraph */
const STEPS = [
    {icon: Compass, title: 'Understand', text: 'We begin with the requirement, not the software - understanding your process first.'},
    {icon: Palette, title: 'Design', text: 'Designing the right experience for the people who will use it every day.'},
    {icon: Hammer, title: 'Build', text: 'Building the solution around the way your business works.'},
    {icon: LifeBuoy, title: 'Support', text: 'Staying available when it needs support, updates and improvements.'}
]

export function About() {
    const [imgRef, imgIn] = useReveal<HTMLDivElement>()
    const [copyRef, copyIn] = useReveal<HTMLDivElement>()
    const [stepsRef, stepsIn] = useReveal<HTMLOListElement>()

    return (
        <section id="about" className="rv-about" aria-labelledby="rv-about-title">
            <div className="v3-container rv-about-grid">
                <div className={`rv-about-media rv-fade${imgIn ? ' in' : ''}`} ref={imgRef}>
                    <div className="rv-about-photo">
                        <Photo src={company.aboutImage} alt="Our digital solutions"/>
                        <div className="rv-photo-shine" aria-hidden="true"/>
                    </div>
                    <div className="rv-image-badge"><Rocket size={17}/><span><strong>Build.</strong> Improve. Support.</span></div>
                    <ul className="rv-about-chips" aria-label="Highlights">
                        {company.stats.slice(0, 3).map((s, i) => (
                            <li key={s.label} style={{'--i': i} as CSSProperties}><b>{s.value}</b><small>{s.label}</small></li>
                        ))}
                    </ul>
                </div>

                <div className={`rv-about-copy rv-fade${copyIn ? ' in' : ''}`} ref={copyRef} style={{'--d': '.1s'} as CSSProperties}>
                    <span className="rv-label">ABOUT OUR APPROACH</span>
                    <h2 id="rv-about-title">Good technology should make business easier.</h2>
                    <p>
                        We begin with the requirement, not the software. That means understanding your process, designing the right experience,
                        building the solution and staying available when it needs support.
                    </p>
                    <div className="rv-principles">
                        {(company.reasons || []).slice(0, 4).map((reason, index) => (
                            <div className="rv-principle" key={reason.title} onMouseMove={spotlight} style={{'--i': index} as CSSProperties}>
                                <span className="rv-principle-no">0{index + 1}</span>
                                <CheckCircle2 size={18}/>
                                <div><strong>{reason.title}</strong><p>{reason.description}</p></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="v3-container">
                <ol className={`rv-steps rv-fade${stepsIn ? ' in' : ''}`} ref={stepsRef} aria-label="How we work">
                    {STEPS.map((s, i) => {
                        const Icon = s.icon
                        return (
                            <li key={s.title} style={{'--i': i} as CSSProperties} onMouseMove={spotlight}>
                                <span className="rv-step-no">{String(i + 1).padStart(2, '0')}</span>
                                <span className="rv-step-icon"><Icon size={22}/></span>
                                <h3>{s.title}</h3>
                                <p>{s.text}</p>
                            </li>
                        )
                    })}
                </ol>
            </div>
        </section>
    )
}
