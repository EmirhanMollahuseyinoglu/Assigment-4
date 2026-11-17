// Emirhan Mollahüseyinoğlu - 2100005226
// Props ve children, TypeScript. Calistir: npx tsx ts/props.tsx
import type { ComponentProps, PropsWithChildren, ReactElement, ReactNode } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

const ciz = (etiket: string, eleman: ReactElement) =>
  console.log(etiket, renderToStaticMarkup(eleman))

// ---------- P1: props tek nesne, tipi desenin tamamindan sonra ----------
type KartProps = { baslik: string; children?: ReactNode }

function KartA(props: KartProps) {
  return <section><h2>{props.baslik}</h2>{props.children}</section>
}
function KartB({ baslik, children }: KartProps) {
  return <section><h2>{baslik}</h2>{children}</section>
}
ciz('P1 A:', <KartA baslik="Salon">2 cihaz açık</KartA>)
ciz('P1 B:', <KartB baslik="Salon">2 cihaz açık</KartB>)

// ---------- P2: children sadece bir prop ----------
ciz('P2 etiket arasi:', <KartB baslik="Mutfak">ocak kapalı</KartB>)
ciz('P2 children prop:', <KartB baslik="Mutfak" children="ocak kapalı" />)

// ---------- P3: children neler olabilir (ReactNode hepsini kabul ediyor) ----------
function Kutu({ children }: { children?: ReactNode }) {
  return <div>{children}</div>
}
ciz('P3 string:', <Kutu>merhaba</Kutu>)
ciz('P3 sayi:', <Kutu>{24}</Kutu>)
ciz('P3 tek eleman:', <Kutu><b>klima</b></Kutu>)
ciz('P3 birkac eleman:', <Kutu><b>klima</b><i>lamba</i></Kutu>)
ciz('P3 undefined:', <Kutu>{undefined}</Kutu>)
ciz('P3 null:', <Kutu>{null}</Kutu>)
ciz('P3 false:', <Kutu>{false}</Kutu>)
// <Kutu>{() => 'selam'}</Kutu>   --> TS2322, fonksiyon ReactNode degil (JS'te bos ciziyordu)

// fonksiyon children istiyorsam tipini kendim yazarim
function Sicaklik({ children }: { children: (derece: number) => ReactNode }) {
  return <div>{children(24)}</div>
}
ciz('P3 fonksiyon:', <Sicaklik>{(derece) => `Salon ${derece} derece`}</Sicaklik>)

// ---------- P4: children + rest, rest'in tipi section'in kabul ettigi her sey ----------
type BolumProps = { baslik: string } & ComponentProps<'section'>

function Bolum({ baslik, children, ...rest }: BolumProps) {
  return <section {...rest}><h2>{baslik}</h2>{children}</section>
}
ciz('P4:', <Bolum baslik="Salon" id="salon" className="oda">lamba açık</Bolum>)

function OnceSpread({ children, ...rest }: ComponentProps<'section'>) {
  return <section {...rest} className="kart">{children}</section>
}
function SonraSpread({ children, ...rest }: ComponentProps<'section'>) {
  return <section className="kart" {...rest}>{children}</section>
}
ciz('P4 once spread:', <OnceSpread className="benim">x</OnceSpread>)
ciz('P4 sonra spread:', <SonraSpread className="benim">x</SonraSpread>)

// ---------- P5: props mu children mi ----------
type PanelTip = { header: ReactNode; footer: ReactNode; children?: ReactNode }

function PanelProps({ header, footer, children }: PanelTip) {
  return (
    <div className="panel">
      <header>{header}</header>
      <main>{children}</main>
      <footer>{footer}</footer>
    </div>
  )
}
function PanelChildren({ children }: { children?: ReactNode }) {
  return <div className="panel">{children}</div>
}
ciz('P5 props ile:',
  <PanelProps header={<h2>Salon</h2>} footer="3 cihaz">
    <p>Lamba açık</p>
  </PanelProps>
)
ciz('P5 children ile:',
  <PanelChildren>
    <header><h2>Salon</h2></header>
    <main><p>Lamba açık</p></main>
    <footer>3 cihaz</footer>
  </PanelChildren>
)
// <PanelProps header={<h2>Salon</h2>}>...</PanelProps>   --> TS2741, footer eksik diye derlenmiyor

// ---------- P6: varsayilan degerler ----------
// null'i gosterebilmek icin tipe bilerek null ekledim
type LambaProps = { ad: string; parlaklik?: number | null }

function Lamba({ ad, parlaklik = 50 }: LambaProps) {
  return <p>{ad}: %{parlaklik}</p>
}
ciz('P6 verilmedi:', <Lamba ad="Salon" />)
ciz('P6 undefined:', <Lamba ad="Salon" parlaklik={undefined} />)
ciz('P6 null:', <Lamba ad="Salon" parlaklik={null} />)

// ---------- P7: tipler ----------
// 1) children?: ReactNode --> children opsiyonel, cizilebilen her sey olur
function Etiket({ children }: { children?: ReactNode }) {
  return <span>{children}</span>
}
ciz('P7 ReactNode bos:', <Etiket />)
ciz('P7 ReactNode dolu:', <Etiket>açık</Etiket>)

// 2) PropsWithChildren<T> --> T'ye children?: ReactNode ekler, ben yazmam
type RenkliProps = PropsWithChildren<{ renk: string }>
function Renkli({ renk, children }: RenkliProps) {
  return <span style={{ color: renk }}>{children}</span>
}
ciz('P7 PropsWithChildren:', <Renkli renk="red">sıcak</Renkli>)
// <Renkli>sıcak</Renkli>   --> TS2741, renk zorunlu

// 3) ComponentProps<'button'> --> gercek <button>'in kabul ettigi butun props
type DugmeProps = ComponentProps<'button'>
function Dugme({ children, ...rest }: DugmeProps) {
  return <button {...rest}>{children}</button>
}
ciz('P7 ComponentProps:', <Dugme type="submit" disabled>Kaydet</Dugme>)
// <Dugme href="/ayarlar">Git</Dugme>   --> TS2322, button'da href yok
// <Dugme type="gonder">Git</Dugme>     --> TS2322, type sadece submit/reset/button olabilir

// 4) children'i daraltmak: sadece string
function SadeceYazi({ children }: { children: string }) {
  return <b>{children.toUpperCase()}</b>
}
ciz('P7 sadece string:', <SadeceYazi>klima</SadeceYazi>)
// <SadeceYazi><i>klima</i></SadeceYazi>   --> TS2745, eleman string degil
// <SadeceYazi />                           --> TS2741, children zorunlu
