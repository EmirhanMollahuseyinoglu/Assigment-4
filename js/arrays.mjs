// Emirhan Mollahüseyinoğlu - 2100005226
// Dizi destructuring (form 1-4). Calistir: node js/arrays.mjs
// Veriler: akilli ev projemdeki odalar, lambalar ve sicakliklar.

// Form 1: fonksiyon bir dizi donduruyor, degerleri sirayla aliyorum
function enSogukEnSicak(sicakliklar) {
  return [Math.min(...sicakliklar), Math.max(...sicakliklar)]
}
const [enSoguk, enSicak] = enSogukEnSicak([21, 24, 19, 26])
console.log('form 1:', enSoguk, enSicak)

// ayni sey destructuring olmadan (uzun yol)
const sonuc = enSogukEnSicak([21, 24, 19, 26])
const enSoguk2 = sonuc[0]
const enSicak2 = sonuc[1]
console.log('form 1 uzun yol:', enSoguk2, enSicak2)

// dizide olmayan eleman undefined gelir
const [bir, iki, uc] = enSogukEnSicak([21, 24])
console.log('form 1 eksik eleman:', bir, iki, uc)

// Form 2: birinciyi atla, ikinciyi al, kalanlari topla
const odalar = ['salon', 'mutfak', 'yatak odası', 'banyo']
const [, ikinciOda, ...digerOdalar] = odalar
console.log('form 2:', ikinciOda, digerOdalar)

// rest (solda, toplar) ile spread (sagda, acar) ayni uc nokta ama ters is
const yeniOdalar = [...odalar, 'balkon']
console.log('form 2 spread:', yeniOdalar)

// kalan yoksa rest bos dizi olur, undefined olmaz
const [tekOda, ...kalan] = ['salon']
console.log('form 2 bos rest:', tekOda, kalan)

// Form 3: iki degiskeni gecici degisken olmadan yer degistir
let acikLamba = 'salon lambası'
let kapaliLamba = 'mutfak lambası';
[acikLamba, kapaliLamba] = [kapaliLamba, acikLamba]
console.log('form 3:', acikLamba, kapaliLamba)

// Form 4: varsayilan degerler
const [parlaklik = 50, renk = 'beyaz'] = []
console.log('form 4:', parlaklik, renk)

// undefined varsayilani calistirir, null calistirmaz
const [p2 = 50, r2 = 'beyaz'] = [80, undefined]
console.log('form 4 undefined:', p2, r2)
const [p3 = 50, r3 = 'beyaz'] = [null, 'sarı']
console.log('form 4 null:', p3, r3)
