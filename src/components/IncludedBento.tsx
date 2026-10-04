import {type CSSProperties, type ReactElement} from 'react'
import {ArrowRight, BarChart3, Barcode, Boxes, CalendarCheck, Check, CheckCircle2, CreditCard, ScanLine, Sparkles, TrendingUp, Users} from 'lucide-react'
import {company} from '../config/company'
import {spotlight} from './site/shared'

/* ------------------------------------------------------------------------------------------
   "Everything SmartBill gives you" - bento grid.
   Titles + descriptions come from company.reasons (your content). The short bullet points and
   the sample screens are illustrative (marked "sample") - edit ITEMS below freely.
   ------------------------------------------------------------------------------------------ */
type Item = {
    key: string
    tone: string
    icon: typeof CreditCard
    layout: 'side' | 'stack'
    points: string[]
    explorer?: string                 // key of the SmartBill preview tab this card can jump to
    visual: () => ReactElement
}

function VisBilling() {
    return (
        <div className="pv5-vis pv5-receipt" aria-hidden="true">
            <div className="pv5-rc-head"><b>Bill #1042</b><em>Sample</em></div>
            <ul>
                {[['Rice 5 kg', '₹320'], ['Tea 250 g', '₹236'], ['Oil 1 L', '₹165']].map(([n, p]) => <li key={n}><span>{n}</span><b>{p}</b></li>)}
                <li className="extra"><span>Sugar 1 kg</span><b>₹46</b></li>
            </ul>
            <div className="pv5-rc-total"><span>Total</span><b className="t1">₹721</b><b className="t2">₹767</b></div>
            <div className="pv5-pay"><Check size={14}/> Pay now</div>
        </div>
    )
}

function VisInventory() {
    const rows: Array<[string, number, string]> = [['Rice 5 kg', 86, ''], ['Sugar 1 kg', 54, ''], ['Tea 250 g', 12, 'low'], ['Oil 1 L', 0, 'out']]
    return (
        <div className="pv5-vis pv5-stock" aria-hidden="true">
            {rows.map(([name, qty, state], i) => (
                <div key={name} className="pv5-stock-row" style={{'--i': i} as CSSProperties}>
                    <span>{name}</span>
                    <i><u className={state} style={{width: `${Math.max(5, qty)}%`}}/></i>
                    <b className={state}>{state === 'out' ? 'Out' : qty}</b>
                </div>
            ))}
            <div className="pv5-chip warn">1 low · 1 out of stock</div>
        </div>
    )
}

function VisBarcode() {
    return (
        <div className="pv5-vis pv5-scan" aria-hidden="true">
            <div className="pv5-scan-box">
                <div className="pv5-bars">{Array.from({length: 30}).map((_, i) => <i key={i} style={{'--w': `${[2, 4, 3, 6, 2, 5, 3, 2, 6, 4][i % 10]}px`} as CSSProperties}/>)}</div>
                <span className="pv5-laser"/>
            </div>
            <div className="pv5-scan-hit"><ScanLine size={15}/> <b>Surf Excel 1 kg</b> <em><Check size={12}/> Added</em></div>
        </div>
    )
}

function VisInsights() {
    return (
        <div className="pv5-vis pv5-chart" aria-hidden="true">
            <div className="pv5-chart-head"><b>₹14,780</b><em><TrendingUp size={12}/> 7 days</em></div>
            <div className="pv5-chart-bars">{[38, 62, 45, 80, 58, 92, 70].map((h, i) => <i key={i} style={{'--h': `${h}%`, '--i': i} as CSSProperties}/>)}</div>
        </div>
    )
}

function VisCustomers() {
    return (
        <div className="pv5-vis pv5-people" aria-hidden="true">
            <div className="pv5-avatars">{['A', 'R', 'S', 'M'].map((c, i) => <span key={c} style={{'--i': i} as CSSProperties}>{c}</span>)}<span className="more">+</span></div>
            <div className="pv5-inv"><span>INV-1042</span><em className="ok">Paid</em></div>
            <div className="pv5-inv"><span>INV-1043</span><em className="due">Due ₹1,240</em></div>
        </div>
    )
}

function VisGrow() {
    return (
        <div className="pv5-vis pv5-grow" aria-hidden="true">
            {['Billing', 'Inventory', 'Reports'].map((m, i) => <span key={m} className="mod" style={{'--i': i} as CSSProperties}><Check size={13}/> {m}</span>)}
            <span className="mod soon"><Sparkles size={13}/> More as you grow</span>
        </div>
    )
}

const ITEMS: Item[] = [
    {key: 'billing', tone: 'blue', icon: CreditCard, layout: 'side', explorer: 'billing', points: ['Search or scan, tap to add', 'Cash, card and UPI payments', 'GST-ready invoices'], visual: VisBilling},
    {key: 'inventory', tone: 'emerald', icon: Boxes, layout: 'stack', explorer: 'inventory', points: ['Live stock on every sale', 'Low-stock and out-of-stock alerts', 'Purchases update stock'], visual: VisInventory},
    {key: 'barcode', tone: 'violet', icon: Barcode, layout: 'stack', explorer: 'barcode', points: ['Works with USB scanners', 'Camera scanning on mobile', 'Find any product in seconds'], visual: VisBarcode},
    {key: 'insights', tone: 'amber', icon: BarChart3, layout: 'stack', explorer: 'insights', points: ['Sales trend by day', 'Top-selling products', 'Pending dues at a glance'], visual: VisInsights},
    {key: 'customers', tone: 'rose', icon: Users, layout: 'stack', points: ['Customer details in one place', 'Sales and invoices linked to each customer', 'See who owes you at a glance'], visual: VisCustomers},
    {key: 'grow', tone: 'indigo', icon: Sparkles, layout: 'side', points: ['Start with billing and inventory', 'Expand into more business management', 'One system that grows with you'], visual: VisGrow}
]

type Props = {
    /** jump to a tab of the SmartBill preview above */
    onPreview: (featureKey: string) => void
    /** items without a preview tab ask for a demo instead */
    onAsk: () => void
}

export function IncludedBento({onPreview, onAsk}: Props) {
    return (
        <div className="pv5-bento">
            {ITEMS.map((item, i) => {
                const reason = company.reasons?.[i]
                if (!reason) return null
                const Icon = item.icon
                const Visual = item.visual
                return (
                    <article key={item.key} className={`pv5-card k-${item.key} tone-${item.tone} ${item.layout}`} onMouseMove={spotlight} style={{'--i': i} as CSSProperties}>
                        <div className="pv5-text">
                            <div className="pv5-top"><span className="pv5-icon"><Icon size={20}/></span><span className="pv5-no">{String(i + 1).padStart(2, '0')}</span></div>
                            <h4>{reason.title}</h4>
                            <p>{reason.description}</p>
                            <ul className="pv5-points">{item.points.map(p => <li key={p}><CheckCircle2 size={14}/> {p}</li>)}</ul>
                            {item.explorer
                                ? <button type="button" className="pv5-more" onClick={() => onPreview(item.explorer!)}>See it in the preview <ArrowRight size={15}/></button>
                                : <button type="button" className="pv5-more" onClick={onAsk}><CalendarCheck size={15}/> Ask for a demo <ArrowRight size={15}/></button>}
                        </div>
                        <div className="pv5-vis-wrap"><Visual/></div>
                        <i className="pv5-line" aria-hidden="true"/>
                    </article>
                )
            })}
        </div>
    )
}
