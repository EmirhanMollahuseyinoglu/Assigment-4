// Emirhan Mollahüseyinoğlu - 2100005226
// js/objects.mjs ile ayni alti form, tiplerle. Calistir: npx tsx ts/objects.ts

type Cihaz = {
  id: string
  ad: string
  tur: 'lamba' | 'klima' | 'sensor'
  durum: 'açık' | 'kapalı'
  parlaklik?: number
}

const cihaz: Cihaz = { id: 'c1', ad: 'Salon Lambası', tur: 'lamba', durum: 'açık' }

// Form 5: tipler Cihaz'dan geliyor, ben bir sey yazmiyorum
let { ad, durum } = cihaz
console.log('form 5:', ad, durum)
// const { marka } = cihaz   --> TS2339, JS'te undefined gelirdi burada derlenmiyor

// Form 6: yeniden adlandirma. Iki noktadan sonraki sey TIP DEGIL, yeni isim
const { ad: cihazAdi } = cihaz
console.log('form 6:', cihazAdi)

// Form 7: parlaklik opsiyonel (number | undefined), varsayilanla number olur
const { parlaklik = 100 } = cihaz
console.log('form 7:', parlaklik + 1)

// Form 8: digerleri'nin tipi id'siz Cihaz
const { id, ...digerleri } = cihaz
console.log('form 8:', id, digerleri)

// Form 9: ic ice
type Ev = {
  sahip: { isim: string; sehir: string }
  odalar: string[]
}
const ev: Ev = {
  sahip: { isim: 'Emirhan', sehir: 'İstanbul' },
  odalar: ['salon', 'mutfak', 'banyo'],
}
const { sahip: { isim }, odalar: [ilkOda = 'oda yok'] } = ev
console.log('form 9:', isim, ilkOda)

// Form 10: anahtar keyof Cihaz olmali, duz string kabul edilmiyor
const alan: keyof Cihaz = 'tur'
const { [alan]: deger } = cihaz
console.log('form 10:', deger)
