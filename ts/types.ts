// Emirhan Mollahüseyinoğlu - 2100005226
// Sadece TypeScript'in ekledigi konular (T1-T5). Calistir: npx tsx ts/types.ts

type Cihaz = { ad: string; watt: number; oda?: string }
const cihaz: Cihaz = { ad: 'Klima', watt: 1200 }

// ---------- T1: desenin icindeki { ad: string } tip degil, yeniden adlandirma ----------
const { ad: string } = cihaz // "string" adinda bir DEGISKEN olustu!
console.log('T1 yanlis:', string)
// dogrusu: tip desenin tamamindan sonra yazilir
const { ad, watt }: { ad: string; watt: number } = cihaz
console.log('T1 dogru:', ad, watt)

// ---------- T2: tuple donus tipi ve as const ----------
// tip yazmazsam TS bunu (string | number)[] sanar
function olcumTipsiz() {
  return [24, 'salon']
}
// tuple yazinca her pozisyonun tipi belli
function olcum(): [number, string] {
  return [24, 'salon']
}
const [d1, o1] = olcumTipsiz() // ikisi de string | number | undefined
const [derece, oda] = olcum() // derece: number, oda: string
console.log('T2 tipsiz:', d1, o1)
console.log('T2 tuple:', derece.toFixed(1), oda.toUpperCase())

// as const: dizi readonly tuple olur, tipler de sabit deger olur
const ayar = [22, 'klima'] as const // readonly [22, "klima"]
const [hedef, hedefCihaz] = ayar // hedef: 22, hedefCihaz: "klima"
console.log('T2 as const:', hedef, hedefCihaz)
// ayar[0] = 30   --> TS2540, readonly oldugu icin degistirilemez

// ---------- T3: noUncheckedIndexedAccess ----------
const odalar: string[] = ['salon', 'mutfak']
const [ilk] = odalar // tipi string | undefined
// 1. yol: kontrol et
if (ilk !== undefined) {
  console.log('T3 kontrol:', ilk.toUpperCase())
}
// 2. yol: varsayilan ver
const [ilk2 = 'oda yok'] = odalar
console.log('T3 varsayilan:', ilk2.toUpperCase())
// bos dizide gercekten undefined geliyor, yani TS hakli
const bos: string[] = []
const [yok] = bos
console.log('T3 bos dizi:', yok)

// ---------- T4: opsiyonel alan ve varsayilan ----------
const { oda: oda1 } = cihaz // string | undefined
const { oda: oda2 = 'bilinmiyor' } = cihaz // string
console.log('T4:', oda1, oda2.length)

// ---------- T5: destructuring'in sebep oldugu bir derleme hatasi ----------
const cihazlar: Cihaz[] = [cihaz, { ad: 'Lamba', watt: 9 }]
// find bulamazsa undefined doner, undefined parcalanamaz
// @ts-expect-error TS2339: Property 'watt' does not exist on type 'Cihaz | undefined'.
const { watt: lambaWatt } = cihazlar.find((c) => c.ad === 'Lamba')
console.log('T5 hatali satir (sansa calisti):', lambaWatt)
// duzeltme: bulunamazsa kullanilacak bir yedek ver
const { watt: guvenliWatt } = cihazlar.find((c) => c.ad === 'Kombi') ?? { watt: 0 }
console.log('T5 duzeltilmis:', guvenliWatt)
