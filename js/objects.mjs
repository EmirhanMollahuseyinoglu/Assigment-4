// Emirhan Mollahüseyinoğlu - 2100005226
// Nesne destructuring (form 5-10). Calistir: node js/objects.mjs
// Veriler: akilli ev projemdeki cihazlar.

const cihaz = { id: 'c1', ad: 'Salon Lambası', tur: 'lamba', durum: 'açık' }

// Form 5: ozellikleri isimle al
let { ad, durum } = cihaz
console.log('form 5:', ad, durum)

// uzun yol
const ad2 = cihaz.ad
const durum2 = cihaz.durum
console.log('form 5 uzun yol:', ad2, durum2)

// olmayan ozellik undefined gelir, hata vermez
const { marka } = cihaz
console.log('form 5 olmayan alan:', marka)

// Form 6: alirken ismini degistir
const { ad: cihazAdi } = cihaz
console.log('form 6:', cihazAdi)

// Form 7: varsayilan deger
const { parlaklik = 100 } = cihaz
console.log('form 7:', parlaklik)

// yeniden adlandirma + varsayilan birlikte
const { oda: bulunduguOda = 'bilinmiyor' } = cihaz
console.log('form 7 isim + varsayilan:', bulunduguOda)

// alan varsa varsayilan kullanilmaz
const { durum: simdikiDurum = 'kapalı' } = cihaz
console.log('form 7 alan varsa:', simdikiDurum)

// Form 8: id'yi ayir, gerisini yeni bir nesnede topla
const { id, ...digerleri } = cihaz
console.log('form 8:', id, digerleri)

// rest yeni bir nesnedir, asil nesne degismez
console.log('form 8 asil nesne:', Object.keys(cihaz).length, 'alan')

// Form 9: ic ice desenler, nesnenin icinde dizi
const ev = {
  sahip: { isim: 'Emirhan', sehir: 'İstanbul' },
  odalar: ['salon', 'mutfak', 'banyo'],
}
const { sahip: { isim }, odalar: [ilkOda] } = ev
console.log('form 9:', isim, ilkOda)

// uzun yol
const isim2 = ev.sahip.isim
const ilkOda2 = ev.odalar[0]
console.log('form 9 uzun yol:', isim2, ilkOda2)

// Form 10: anahtar bir degiskenden geliyor
const alan = 'tur'
const { [alan]: deger } = cihaz
console.log('form 10:', deger)

// uzun yol: cihaz[alan]
console.log('form 10 uzun yol:', cihaz[alan])
