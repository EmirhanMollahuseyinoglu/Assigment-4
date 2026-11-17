# Destructuring Field Guide

Name: Emirhan Mollahüseyinoğlu  
Student number: 2100005226

Bonuses claimed: **Bonus 2: Depth** (`js/bonus.mjs`) and **Bonus 3: Real code**. Both come before the log section.

Bütün örneklerde kendi akıllı ev projemdeki verileri kullandım (odalar, lambalar, klima, sıcaklıklar).
Buradaki bütün çıktılar `npm run all` komutunun gerçek çıktısından kopyalandı, tamamı `output.txt` içinde.

## Run

```
npm install
npm run all      # runs the JS, TS and bonus examples
npm run check    # type-checks in strict mode
```

`npm run all` komutuna `js/bonus.mjs` dosyasını da ekledim (`package.json` içinde `bonus` scripti).

## Field guide

Kısa not: **desen** (pattern) eşittirin solundaki şekildir. Sağdaki değer bu şekle göre parçalanır.
Her formda "uzun yol" diye aynı işi düz atamalarla da yazdım, çünkü desenin ne yaptığını en iyi o gösteriyor.

### Form 1: values by position, `const [x, y] = f()`

**Syntax:** `const [enSoguk, enSicak] = enSogukEnSicak(sicakliklar)`

**Example** (`js/arrays.mjs`):

```js
function enSogukEnSicak(sicakliklar) {
  return [Math.min(...sicakliklar), Math.max(...sicakliklar)]
}
const [enSoguk, enSicak] = enSogukEnSicak([21, 24, 19, 26])
console.log('form 1:', enSoguk, enSicak)
```

**Output:** `form 1: 19 26`

Long way:

```js
const sonuc = enSogukEnSicak([21, 24, 19, 26])
const enSoguk2 = sonuc[0]
const enSicak2 = sonuc[1]
```

**Use it when:** bir fonksiyon birden fazla değeri dizi olarak döndürüyorsa. `useState` ve `useReducer` da tam olarak bu.

**Watch out:** isim önemli değil, sadece sıra önemli. Dizide olmayan eleman hata vermez, `undefined` olur:
`form 1 eksik eleman: 21 24 undefined`

### Form 2: skip an item and collect the rest, `const [, second, ...others] = list`

**Syntax:** `const [, ikinciOda, ...digerOdalar] = odalar`

**Example** (`js/arrays.mjs`):

```js
const odalar = ['salon', 'mutfak', 'yatak odası', 'banyo']
const [, ikinciOda, ...digerOdalar] = odalar
console.log('form 2:', ikinciOda, digerOdalar)
```

**Output:** `form 2: mutfak [ 'yatak odası', 'banyo' ]`

Long way: `const ikinciOda = odalar[1]` and `const digerOdalar = odalar.slice(2)`

**Use it when:** dizinin başından bir iki eleman lazım, gerisi tek bir dizide kalsın istiyorsam.

**Watch out:**
- Boş virgül bir elemanı atlar. Virgülleri saymak zor, iki taneden fazla atlama varsa `odalar[3]` yazmak daha okunaklı.
- `...digerOdalar` desende **rest**'tir: kalanları **toplar**. `[...odalar, 'balkon']` ise ifadede **spread**'dir: diziyi **açar**. Aynı üç nokta, ters iş.
  `form 2 spread: [ 'salon', 'mutfak', 'yatak odası', 'banyo', 'balkon' ]`
- Kalan eleman yoksa rest `undefined` değil boş dizi olur: `form 2 bos rest: salon []`
- Rest en sonda olmak zorunda.

### Form 3: swap two variables, `[a, b] = [b, a]`

**Syntax:** `[acikLamba, kapaliLamba] = [kapaliLamba, acikLamba]`

**Example** (`js/arrays.mjs`):

```js
let acikLamba = 'salon lambası'
let kapaliLamba = 'mutfak lambası';
[acikLamba, kapaliLamba] = [kapaliLamba, acikLamba]
console.log('form 3:', acikLamba, kapaliLamba)
```

**Output:** `form 3: mutfak lambası salon lambası`

Long way:

```js
const gecici = acikLamba
acikLamba = kapaliLamba
kapaliLamba = gecici
```

**Use it when:** iki değeri geçici değişken kullanmadan değiştirmek istiyorsam.

**Watch out:** burada `const`/`let` yok, yani bu bir bildirim değil atama. Değişkenler `let` olmalı.
Ve önceki satırın sonunda noktalı virgül şart. Koymayınca hata aldım, log'da 1. madde.

### Form 4: default values in arrays, `const [a = 1, b = 2] = []`

**Syntax:** `const [parlaklik = 50, renk = 'beyaz'] = []`

**Example** (`js/arrays.mjs`):

```js
const [parlaklik = 50, renk = 'beyaz'] = []
console.log('form 4:', parlaklik, renk)

const [p2 = 50, r2 = 'beyaz'] = [80, undefined]
console.log('form 4 undefined:', p2, r2)
const [p3 = 50, r3 = 'beyaz'] = [null, 'sarı']
console.log('form 4 null:', p3, r3)
```

**Output:**

```
form 4: 50 beyaz
form 4 undefined: 80 beyaz
form 4 null: null sarı
```

Long way: `const parlaklik = dizi[0] === undefined ? 50 : dizi[0]`

**Use it when:** dizi kısa gelebilir ve değişkenin boş kalmasını istemiyorsam.

**Watch out:** varsayılan sadece `undefined` için çalışır. `null` bir değer sayılır ve aynen gelir (çıktıda `null sarı`).

### Form 5: properties by name, `let { a, b } = t`

**Syntax:** `let { ad, durum } = cihaz`

**Example** (`js/objects.mjs`):

```js
const cihaz = { id: 'c1', ad: 'Salon Lambası', tur: 'lamba', durum: 'açık' }
let { ad, durum } = cihaz
console.log('form 5:', ad, durum)
```

**Output:** `form 5: Salon Lambası açık`

Long way: `let ad = cihaz.ad` and `let durum = cihaz.durum`

**Use it when:** bir nesnenin birkaç alanını çok kullanacaksam ve her seferinde `cihaz.` yazmak istemiyorsam.

**Watch out:** değişkenin adı alanın adıyla aynı olmak zorunda. Yanlış yazarsam hata vermez, sessizce `undefined` gelir:
`form 5 olmayan alan: undefined`. Diziden farklı olarak burada sıra önemli değil.

### Form 6: rename while you take it, `const { a: alpha } = t`

**Syntax:** `const { ad: cihazAdi } = cihaz`

**Example** (`js/objects.mjs`):

```js
const { ad: cihazAdi } = cihaz
console.log('form 6:', cihazAdi)
```

**Output:** `form 6: Salon Lambası`

Long way: `const cihazAdi = cihaz.ad`

**Use it when:** aynı isimde bir değişkenim zaten varsa (bende `ad` vardı) ya da alanın adı o yerde anlaşılmıyorsa.

**Watch out:** soldaki kaynak, sağdaki yeni isim. Nesne yazarken `{ ad: 'x' }` de "ad'a x koy" demek olduğu için ters gibi geliyor.
Eski isim değişken olmuyor. Bunu tuzak 6'da gösterdim: `tuzak 6: Kombi undefined` (ikincisi `typeof ad`).

### Form 7: default values in objects, `const { a = 1 } = t`

**Syntax:** `const { parlaklik = 100 } = cihaz`

**Example** (`js/objects.mjs`):

```js
const { parlaklik = 100 } = cihaz
console.log('form 7:', parlaklik)

const { oda: bulunduguOda = 'bilinmiyor' } = cihaz
console.log('form 7 isim + varsayilan:', bulunduguOda)

const { durum: simdikiDurum = 'kapalı' } = cihaz
console.log('form 7 alan varsa:', simdikiDurum)
```

**Output:**

```
form 7: 100
form 7 isim + varsayilan: bilinmiyor
form 7 alan varsa: açık
```

Long way: `const parlaklik = cihaz.parlaklik === undefined ? 100 : cihaz.parlaklik`

**Use it when:** alan opsiyonelse. Ayar nesnelerinde ve React props'ta en çok kullanılan form bu.

**Watch out:** form 4 ile aynı kural, sadece `undefined` varsayılanı çalıştırır, `null` çalıştırmaz (tuzak 2).
Yeniden adlandırma ile beraber yazılırken sıra `alan: yeniIsim = varsayilan` şeklinde.

### Form 8: rest in an object, `const { a, ...others } = t`

**Syntax:** `const { id, ...digerleri } = cihaz`

**Example** (`js/objects.mjs`):

```js
const { id, ...digerleri } = cihaz
console.log('form 8:', id, digerleri)
console.log('form 8 asil nesne:', Object.keys(cihaz).length, 'alan')
```

**Output:**

```
form 8: c1 { ad: 'Salon Lambası', tur: 'lamba', durum: 'açık' }
form 8 asil nesne: 4 alan
```

Long way: yeni bir nesne oluşturup `id` dışındaki alanları tek tek kopyalamak.

**Use it when:** bir alanı ayırıp gerisini olduğu gibi başka yere vereceksem. React'te `{ children, ...rest }` tam bu (P4).

**Watch out:** `digerleri` yeni bir nesne, asıl nesne değişmiyor (hâlâ 4 alan). Ama kopya yüzeysel, iç nesneler ortak kalır (tuzak 4).
Dizideki gibi burada da rest en sonda olmalı.

### Form 9: nested patterns, `const { p: { x }, list: [first] } = t`

**Syntax:** `const { sahip: { isim }, odalar: [ilkOda] } = ev`

**Example** (`js/objects.mjs`):

```js
const ev = {
  sahip: { isim: 'Emirhan', sehir: 'İstanbul' },
  odalar: ['salon', 'mutfak', 'banyo'],
}
const { sahip: { isim }, odalar: [ilkOda] } = ev
console.log('form 9:', isim, ilkOda)
```

**Output:** `form 9: Emirhan salon`

Long way:

```js
const isim2 = ev.sahip.isim
const ilkOda2 = ev.odalar[0]
```

**Use it when:** verinin şekli belli ve sadece bir iki kat derindeyse (API cevabı gibi).

**Watch out:** `sahip` ve `odalar` burada değişken **olmuyor**, onlar sadece yol. Değişken olanlar `isim` ve `ilkOda`.
Ara nesne yoksa hata veriyor. `sahip` alanı olmayan bir nesnede denedim:
`TypeError: Cannot read properties of undefined (reading 'isim')`.
İki kattan fazlası okunmuyor, o zaman uzun yol daha iyi.

### Form 10: a computed key, `const { [key]: value } = t`

**Syntax:** `const { [alan]: deger } = cihaz`

**Example** (`js/objects.mjs`):

```js
const alan = 'tur'
const { [alan]: deger } = cihaz
console.log('form 10:', deger)
```

**Output:** `form 10: lamba`

Long way: `const deger = cihaz[alan]`

**Use it when:** hangi alanı alacağım bir değişkenden geliyorsa (mesela sıralama yapılacak sütunun adı).

**Watch out:** burada yeni isim vermek zorunlu (`: deger`). Sadece `{ [alan] }` yazılamıyor çünkü değişkenin adı belli olmaz.
Açıkçası uzun yol (`cihaz[alan]`) daha kısa ve daha net, bu formu tek başına kullanmam.

### Form 11: patterns in parameters, `function f({ a = 1, b } = {})`

**Syntax:** `function cihazEkle({ ad, durum = 'kapalı' } = {})`

**Example** (`js/params.mjs`):

```js
function cihazEkle({ ad, durum = 'kapalı' } = {}) {
  return { ad, durum }
}
console.log('form 11:', cihazEkle({ ad: 'Klima' }))
console.log('form 11 argumansiz:', cihazEkle())
```

**Output:**

```
form 11: { ad: 'Klima', durum: 'kapalı' }
form 11 argumansiz: { ad: undefined, durum: 'kapalı' }
```

Long way:

```js
function cihazEkle(secenekler) {
  if (secenekler === undefined) secenekler = {}
  const ad = secenekler.ad
  const durum = secenekler.durum === undefined ? 'kapalı' : secenekler.durum
  return { ad, durum }
}
```

**Use it when:** fonksiyon tek bir ayar nesnesi alıyorsa. Çağıran taraf isimleri yazdığı için sıra karışmıyor. React bileşenleri hep böyle.

**Watch out:** burada iki farklı varsayılan var. `durum = 'kapalı'` tek bir alan için, sondaki `= {}` ise parametrenin tamamı için.
`= {}` olmayınca argümansız çağrı patlıyor:
`form 11 korumasiz: Cannot destructure property 'ad' of 'undefined' as it is undefined.`

Dizi parametresi de olur (11b): `const konumYaz = ([kat, oda]) => ...`, output: `form 11b: 2. kat, yatak odası`

### Form 12: patterns in loops, `for (const [k, v] of Object.entries(o))`

**Syntax:** `for (const [oda, derece] of Object.entries(sicakliklar))`

**Example** (`js/params.mjs`):

```js
const sicakliklar = { salon: 24, mutfak: 22, banyo: 26 }
for (const [oda, derece] of Object.entries(sicakliklar)) {
  console.log('form 12 nesne:', oda, derece)
}

const lambalar = new Map([['salon', true], ['mutfak', false]])
for (const [oda, acikMi] of lambalar) {
  console.log('form 12 map:', oda, acikMi)
}
```

**Output:**

```
form 12 nesne: salon 24
form 12 nesne: mutfak 22
form 12 nesne: banyo 26
form 12 map: salon true
form 12 map: mutfak false
```

Long way: `for (const cift of Object.entries(sicakliklar)) { const oda = cift[0]; const derece = cift[1] }`

**Use it when:** bir nesnenin ya da Map'in hem anahtarı hem değeri lazımsa.

**Watch out:** düz nesne doğrudan `for...of` ile dönülmez, `Object.entries` gerekir. Map'te gerekmez, o zaten çift verir.
Dizide sıra numarası için `cihazlar.entries()`, nesne dizisinde ise nesne deseni kullandım:
`form 12 dizi: 0 lamba` ve `form 12 nesne dizisi: Lamba 9`

## Pitfalls

Hepsi `js/pitfalls.mjs` içinde, çıktılar gerçek.

**Pitfall 1: destructuring `undefined` or `null` throws.**

```js
const { ad } = cihazlar.find((c) => c.ad === 'Kombi')
```

Output: `tuzak 1: TypeError: Cannot destructure property 'ad' of 'cihazlar.find(...)' as it is undefined.`

Why: desen aslında `sagTaraf.ad` okuyor, `undefined.ad` okunamadığı için hata veriyor. `find` bulamayınca `undefined` döndürüyor.

**Pitfall 2: a default does not apply to `null`.**

```js
const ayar = { parlaklik: null, renk: undefined }
const { parlaklik = 50, renk = 'beyaz' } = ayar
```

Output: `tuzak 2: null beyaz`

Why: varsayılan sadece değer `=== undefined` ise devreye giriyor. `null` "bilerek boş" demek, JavaScript onu bir değer sayıyor.

**Pitfall 3: assigning without `const`/`let` needs parentheses.**

```js
({ oda, kat } = konum)
```

Output: `tuzak 3: salon 1`

Why: satır `{` ile başlayınca JavaScript onu kod bloğu sanıyor, sonra `=` görünce şaşırıyor. Parantezsiz hali:
`SyntaxError: Unexpected token '='`. Parantez "bu bir ifade" demek.

**Pitfall 4: it copies references, not deep copies.**

```js
const ev = { sahip: { isim: 'Emirhan' }, odaSayisi: 3 }
let { sahip, odaSayisi } = ev
sahip.isim = 'Ali'
odaSayisi = 10
```

Output: `tuzak 4: Ali 3`

Why: `sahip` bir nesne, değişkene nesnenin kendisi değil adresi geliyor, yani ikisi aynı nesneyi gösteriyor. `odaSayisi` ise sayı, o kopyalanıyor.
Bu yüzden isim değişti ama oda sayısı değişmedi.

**Pitfall 5: order does not matter in objects, it does in arrays.**

```js
const { kat: k, oda: o } = { oda: 'mutfak', kat: 2 }
const [odaAdi, katNo] = [2, 'mutfak']
```

Output:

```
tuzak 5 nesne: mutfak 2
tuzak 5 dizi: 2 mutfak
```

Why: nesne deseni isme bakıyor, dizi deseni sıraya. Dizide yanlış sırada yazınca `odaAdi` değişkenine 2 geldi ve hiçbir hata çıkmadı.

**Pitfall 6: after a rename the old name does not exist.**

```js
const { ad: cihazAdi } = { ad: 'Kombi' }
console.log('tuzak 6:', cihazAdi, typeof ad)
```

Output: `tuzak 6: Kombi undefined`

Why: `{ ad: cihazAdi }` içinde `ad` sadece "nereden alınacağı", değişken olan `cihazAdi`.

## TypeScript topics

Hepsi `ts/types.ts` içinde.

**T1: `{ ad: string }` in a pattern is a rename, not a type.**

```ts
const { ad: string } = cihaz // "string" adında bir DEĞİŞKEN oluştu
console.log('T1 yanlis:', string)
const { ad, watt }: { ad: string; watt: number } = cihaz
console.log('T1 dogru:', ad, watt)
```

Output: `T1 yanlis: Klima` and `T1 dogru: Klima 1200`

Desenin içinde iki nokta zaten form 6 için kullanılıyor, o yüzden TypeScript orayı tip için kullanamıyor. Tip desenin **tamamından sonra** yazılıyor.
İlk satır derleniyor, hata vermiyor, o yüzden tehlikeli. Hata ancak sonra `ad` kullanmaya çalışınca geliyor: `error TS2304: Cannot find name 'ad'.`

**T2: a tuple return type and `as const`.**

```ts
function olcumTipsiz() { return [24, 'salon'] }       // (string | number)[]
function olcum(): [number, string] { return [24, 'salon'] }
const [derece, oda] = olcum()                          // number, string
const ayar = [22, 'klima'] as const                    // readonly [22, "klima"]
```

Output: `T2 tuple: 24.0 SALON` and `T2 as const: 22 klima`

Tip yazmayınca TypeScript diziyi "string ya da number karışık, uzunluğu belirsiz" sanıyor, o yüzden `d1.toFixed(1)` derlenmiyor:
`error TS18048: 'd1' is possibly 'undefined'.` Tuple yazınca her pozisyonun tipi ve uzunluk belli oluyor.
`as const` iki şey yapıyor: diziyi readonly tuple yapıyor ve tipleri sabit değere indiriyor (`hedef` tipi `number` değil `22`).
Değiştirmeyi denedim: `error TS2540: Cannot assign to '0' because it is a read-only property.`

**T3: `noUncheckedIndexedAccess`.**

```ts
const odalar: string[] = ['salon', 'mutfak']
const [ilk] = odalar              // string | undefined
if (ilk !== undefined) { ... }    // 1. yol: kontrol
const [ilk2 = 'oda yok'] = odalar // 2. yol: varsayılan
```

Output: `T3 kontrol: SALON`, `T3 varsayilan: SALON`, `T3 bos dizi: undefined`

`string[]` kaç eleman olduğunu söylemiyor, bu ayar açıkken TypeScript "olmayabilir" diyor. Boş dizide gerçekten `undefined` geldi, yani haklı.
Kontrol etmeden kullanınca: `error TS18048: 'ilk' is possibly 'undefined'.` Tuple'da bu sorun yok çünkü uzunluk belli.

**T4: optional fields and defaults.**

```ts
type Cihaz = { ad: string; watt: number; oda?: string }
const { oda: oda1 } = cihaz                // string | undefined
const { oda: oda2 = 'bilinmiyor' } = cihaz // string
```

Output: `T4: undefined 10`

`?` olan alanın tipi `string | undefined`. Varsayılan verince `undefined` ihtimali kalkıyor, tip `string` oluyor ve `oda2.length` yazabiliyorum.
Yani form 7 TypeScript'te sadece değeri değil tipi de düzeltiyor.

**T5: a compile error caused by destructuring.**

```ts
// @ts-expect-error TS2339: Property 'watt' does not exist on type 'Cihaz | undefined'.
const { watt: lambaWatt } = cihazlar.find((c) => c.ad === 'Lamba')
const { watt: guvenliWatt } = cihazlar.find((c) => c.ad === 'Kombi') ?? { watt: 0 }
```

Output: `T5 hatali satir (sansa calisti): 9` and `T5 duzeltilmis: 0`

Message: `error TS2339: Property 'watt' does not exist on type 'Cihaz | undefined'.`
Bu tuzak 1'in derleme zamanındaki hali. `find` bulamazsa `undefined` döner, TypeScript bunu biliyor ve parçalamaya izin vermiyor.
Hatalı satır çalışınca 9 yazdı çünkü Lamba listede vardı, ama olmasaydı tuzak 1'deki TypeError gelirdi.
Düzeltme: `?? { watt: 0 }` ile yedek nesne vermek (ya da önce `if` ile kontrol etmek).

## Props and children

Kod: `js/props.jsx` ve `ts/props.tsx`. Hepsi `renderToStaticMarkup` ile çizildi, çıktılar gerçek.

Önce ikisinin farkı, kendi cümlelerimle:
- **props**: bileşenin aldığı **tek nesne**. JSX'te yazdığım her özellik bu nesnenin bir alanı oluyor.
- **children**: o nesnenin alanlarından sadece biri. Farkı, değerini özellik olarak değil **etiketlerin arasına** yazıyor olmam.

Yani children props'un dışında ayrı bir şey değil, props'un içinde özel isimli bir alan.

### P1: props is one object

```jsx
function KartA(props) {
  return <section><h2>{props.baslik}</h2>{props.children}</section>
}
function KartB({ baslik, children }) {
  return <section><h2>{baslik}</h2>{children}</section>
}
```

```
P1 A: <section><h2>Salon</h2>2 cihaz açık</section>
P1 B: <section><h2>Salon</h2>2 cihaz açık</section>
P1 props nesnesi: { baslik: 'Salon', sayi: 2, children: 'içerik' }
```

İkisi aynı sonucu veriyor. `KartB` aslında **form 11**: parametrenin yerine desen yazılmış. Desenin kendisi de **form 5**: nesneden isimle alan almak.
`KartB`, `KartA`'nın ilk satırına `const { baslik, children } = props` yazılmış hali.
Props nesnesini yazdırınca `children`'ın `baslik` ve `sayi` ile yan yana durduğunu gördüm.

### P2: children is only a prop

```jsx
<KartB baslik="Mutfak">ocak kapalı</KartB>
<KartB baslik="Mutfak" children="ocak kapalı" />
```

```
P2 etiket arasi: <section><h2>Mutfak</h2>ocak kapalı</section>
P2 children prop: <section><h2>Mutfak</h2>ocak kapalı</section>
```

Çıktı birebir aynı. Etiket arasına yazmak sadece `children` prop'unu vermenin başka bir yazılışı.

İkisini birden denedim:

```jsx
<KartB baslik="Mutfak" children="prop olan">arada yazan</KartB>
```

`P2 ikisi birden: <section><h2>Mutfak</h2>arada yazan</section>`

Etiket arasındaki kazandı, prop olarak yazdığım sessizce kayboldu. Hata ya da uyarı çıkmadı.

### P3: what children can be

```jsx
function Kutu({ children }) {
  return <div>{children}</div>
}
```

| children | Code | Output | On screen |
|---|---|---|---|
| string | `<Kutu>merhaba</Kutu>` | `<div>merhaba</div>` | yazı görünür |
| number | `<Kutu>{24}</Kutu>` | `<div>24</div>` | sayı görünür |
| zero | `<Kutu>{0}</Kutu>` | `<div>0</div>` | 0 **görünür** |
| one element | `<Kutu><b>klima</b></Kutu>` | `<div><b>klima</b></div>` | eleman görünür |
| several elements | `<Kutu><b>klima</b><i>lamba</i></Kutu>` | `<div><b>klima</b><i>lamba</i></div>` | hepsi sırayla |
| undefined | `<Kutu>{undefined}</Kutu>` | `<div></div>` | hiçbir şey |
| missing | `<Kutu />` | `<div></div>` | hiçbir şey |
| null | `<Kutu>{null}</Kutu>` | `<div></div>` | hiçbir şey |
| false | `<Kutu>{false}</Kutu>` | `<div></div>` | hiçbir şey |
| true | `<Kutu>{true}</Kutu>` | `<div></div>` | hiçbir şey |
| function | `<Kutu>{() => 'selam'}</Kutu>` | `<div></div>` | hiçbir şey, terminalde uyarı |

What I learned:
- `undefined`, `null`, `false`, `true` çizilmiyor. `{kosul && <b>...</b>}` bu yüzden çalışıyor. Ama `0` çiziliyor, yani `{liste.length && ...}` yazarsam ekranda 0 çıkar.
- Fonksiyon çizilmiyor ve terminalde şu uyarı çıkıyor (stderr'e gittiği için `output.txt` içinde yok):
  `Functions are not valid as a React child. This may happen if you return children instead of <children /> from render. Or maybe you meant to call this function rather than return it.`
- Fonksiyon ancak bileşen onu kendisi çağırırsa işe yarıyor:

```jsx
function Sicaklik({ children }) {
  return <div>{children(24)}</div>
}
<Sicaklik>{(derece) => `Salon ${derece} derece`}</Sicaklik>
```

`P3 fonksiyonu cagirinca: <div>Salon 24 derece</div>`

- children'ın tipi sabit değil, ne yazdığıma göre değişiyor:

```
P3 tip: string | dizi mi: false      (yazı)
P3 tip: object | dizi mi: false      (tek eleman)
P3 tip: object | dizi mi: true       (iki eleman)
P3 tip: undefined | dizi mi: false   (hiç yok)
```

Bu yüzden `children.map(...)` ya da `children.length` yazmak güvenli değil, tek eleman gelince dizi olmuyor.

### P4: separating children from the other props

```jsx
function Bolum({ baslik, children, ...rest }) {
  return <section {...rest}><h2>{baslik}</h2>{children}</section>
}
<Bolum baslik="Salon" id="salon" className="oda">lamba açık</Bolum>
```

`P4: <section id="salon" class="oda"><h2>Salon</h2>lamba açık</section>`

Bir satırda üç iş var: `baslik` ve `children`'ı kendim kullanmak için aldım (form 5), kalanları `rest` içinde topladım (form 8),
sonra `{...rest}` ile `<section>`'a geri açtım (spread). Desende toplama, JSX'te açma.

Sıra kimin kazanacağını belirliyor:

```jsx
<section {...rest} className="kart">   // önce spread
<section className="kart" {...rest}>   // sonra spread
```

```
P4 once spread: <section class="kart">x</section>
P4 sonra spread: <section class="benim">x</section>
```

Sonra yazılan kazanıyor, çünkü JSX özellikleri soldan sağa tek bir nesnede toplanıyor ve aynı isim gelince üstüne yazılıyor (`{ ...rest, className: 'kart' }` gibi).
Spread'i önce yazarsam bileşenin değeri sabit kalır, sonra yazarsam kullanan kişi değiştirebilir.

Bir şeyi ayırmayı unutursam rest'in içinde kalıp DOM'a gidiyor:

`P4 ayirmadan: <section title="ipucu olur" id="x">y</section>`

### P5: props or children?

Aynı panel iki şekilde:

```jsx
// 1) üst ve alt kısım prop
function PanelProps({ header, footer, children }) {
  return (
    <div className="panel">
      <header>{header}</header>
      <main>{children}</main>
      <footer>{footer}</footer>
    </div>
  )
}
<PanelProps header={<h2>Salon</h2>} footer="3 cihaz"><p>Lamba açık</p></PanelProps>

// 2) her şey children
function PanelChildren({ children }) {
  return <div className="panel">{children}</div>
}
```

```
P5 props ile: <div class="panel"><header><h2>Salon</h2></header><main><p>Lamba açık</p></main><footer>3 cihaz</footer></div>
P5 children ile: <div class="panel"><header><h2>Salon</h2></header><main><p>Lamba açık</p></main><footer>3 cihaz</footer></div>
P5 children ters sira: <div class="panel"><footer>3 cihaz</footer><header><h2>Salon</h2></header></div>
```

HTML aynı çıktı ama kontrol başka yerde:
- **Props ile** yerleşime bileşen karar veriyor. Header hep üstte, footer hep altta, ben yanlış sıraya koyamam. Birden fazla "boşluk" varsa ve hepsi aynı düzende olsun istiyorsam bunu seçerim (bütün oda kartları aynı görünsün gibi).
- **Children ile** her şeye kullanan karar veriyor. Üçüncü çıktıda footer'ı üste yazdım, `<main>`'i unuttum, bileşen hiçbir şey diyemedi. Tek bir içerik alanı varsa ve bileşen sadece çerçeveyse (kutu, kart) bunu seçerim.

Children'dan tek tane var, o yüzden iki ayrı yer doldurmam gerekince ikincisi mecburen prop oluyor.

### P6: defaults

```jsx
function Lamba({ ad, parlaklik = 50 }) {
  return <p>{ad}: %{parlaklik}</p>
}
```

```
P6 verilmedi: <p>Salon: %50</p>
P6 undefined: <p>Salon: %50</p>
P6 null: <p>Salon: %</p>
P6 80: <p>Salon: %80</p>
```

Bu form 7. Prop'u hiç yazmamak ile `undefined` vermek aynı şey, ikisinde de varsayılan çalışıyor.
`null` verince varsayılan çalışmıyor, `null` da çizilmediği için (P3) ekranda `Salon: %` diye yarım bir yazı kalıyor.
Veritabanından `null` gelen bir alanı doğrudan prop olarak verirsem bu olur. Çözüm: verirken `parlaklik={deger ?? undefined}` yazmak.

### P7: types

**`children?: ReactNode`**: children opsiyonel, çizilebilen her şey olabilir (string, sayı, eleman, dizi, null, undefined, boolean).

```
P7 ReactNode bos: <span></span>
P7 ReactNode dolu: <span>açık</span>
```

Rejects: fonksiyon. JavaScript'te boş çizip uyarı veriyordu (P3), TypeScript'te hiç derlenmiyor:
`error TS2322: Type '() => string' is not assignable to type 'ReactNode'.`

Tipte `children` hiç yoksa etiket arasına bir şey yazamıyorum:
`Property 'children' does not exist on type 'IntrinsicAttributes & { baslik: string; }'.`

**`PropsWithChildren<T>`**: kendi tipime `children?: ReactNode` ekliyor, elle yazmıyorum.

```tsx
type RenkliProps = PropsWithChildren<{ renk: string }>
```

`P7 PropsWithChildren: <span style="color:red">sıcak</span>`

Rejects: kendi alanım eksikse. `<Renkli>sıcak</Renkli>` için:
`error TS2741: Property 'renk' is missing in type '{ children: string; }' but required in type '{ renk: string; }'.`
Hata mesajında `children`'ın props nesnesinin içinde yazması P2'yi bir daha gösteriyor.

**`ComponentProps<'button'>`**: gerçek `<button>` etiketinin kabul ettiği bütün props (children dahil). P4'teki rest ile beraber kullanılıyor.

```tsx
function Dugme({ children, ...rest }: ComponentProps<'button'>) {
  return <button {...rest}>{children}</button>
}
```

`P7 ComponentProps: <button type="submit" disabled="">Kaydet</button>`

Rejects:
- `<Dugme href="/ayarlar">`: `Property 'href' does not exist on type 'IntrinsicAttributes & ClassAttributes<HTMLButtonElement> & ButtonHTMLAttributes<HTMLButtonElement>'. Did you mean 'ref'?`
- `<Dugme type="gonder">`: `error TS2322: Type '"gonder"' is not assignable to type '"button" | "submit" | "reset" | undefined'.`

**Narrowing children**: `children: string` yazınca sadece yazı kabul ediliyor ve zorunlu oluyor.

`P7 sadece string: <b>KLIMA</b>`

- `<SadeceYazi />`: `error TS2741: Property 'children' is missing in type '{}' but required in type '{ children: string; }'.`
- `<SadeceYazi><i>klima</i></SadeceYazi>`: `error TS2745: This JSX tag's 'children' prop expects type 'string' which requires multiple children, but only a single child was provided.`

### Extra experiments

**Is `key` a prop?** `<AnahtarDene key="k1" ad="Lamba" />` içinde `props.key` okudum:

`Deneme key: <p>key: undefined | ad: Lamba</p>`

Terminalde uyarı: ``AnahtarDene: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop.``
`key` React'in kendisi için, bileşene verilmiyor. Aynı değer lazımsa `id` gibi ayrı bir prop daha vermem gerekiyor.

**What if a component changes its props?** `props.baslik = 'yeni başlık'` yazdım:

```
Deneme props degistirme: TypeError: Cannot assign to read only property 'baslik' of object '#<Object>'
Deneme props degistirme sonuc: <p>eski başlık</p>
```

Props nesnesi dondurulmuş, bileşen onu değiştiremiyor. Destructuring ile alınmış değişkeni (`let { baslik }`) değiştirmek hata vermez ama o sadece yerel değişkeni değiştirir, props aynı kalır.

**What if children is missing?** `children.toUpperCase()` yapan bileşene children vermedim:

`Deneme children yok: TypeError: Cannot read properties of undefined (reading 'toUpperCase')`

children verilmeyince `undefined` (P3). TypeScript'te bunu `children: string` yazarak derleme zamanında yakalıyorum (P7).

## JavaScript vs TypeScript

Desenin kendisi hiçbir formda değişmiyor. Değişen, sağ tarafın ya da parametrenin tipi. Hata mesajları kendi denemelerimden.

| Form | Stays the same | What I add in TypeScript | Error when I get it wrong |
|---|---|---|---|
| 1 `const [x, y] = f()` | the pattern | fonksiyona tuple dönüş tipi `[number, number]` | tip yazmayınca `TS18048: 'd1' is possibly 'undefined'.` |
| 2 `[, b, ...rest]` | the pattern | bir şey eklemedim ama eleman `string \| undefined` oluyor, kontrol gerekiyor | `TS18048: 'ikinciOda' is possibly 'undefined'.` |
| 3 `[a, b] = [b, a]` | the pattern | iki değişken aynı tipte olmalı | `TS2322: Type 'string' is not assignable to type 'number'.` |
| 4 `[a = 1] = []` | the pattern and the default | bir şey eklemedim, varsayılan tipi `number` yapıyor | varsayılansız `const [x] = []`: `TS2493: Tuple type '[]' of length '0' has no element at index '0'.` |
| 5 `{ a, b } = t` | the pattern | nesnenin tipi (`type Cihaz`) | `TS2339: Property 'marka' does not exist on type 'Cihaz'.` (JS'te sessizce `undefined`) |
| 6 `{ a: alpha }` | the pattern | hiçbir şey. Tip desenin **içine** yazılmaz, sonuna yazılır | `{ ad: string }` yazıp `ad` kullanınca `TS2304: Cannot find name 'ad'.` |
| 7 `{ a = 1 }` | the pattern and the default | tipte alan `?` ile opsiyonel | varsayılan vermeyince `TS18048: 'parlaklik' is possibly 'undefined'.` |
| 8 `{ a, ...others }` | the pattern | bir şey eklemedim, rest'in tipi kendiliğinden çıkıyor | ayırdığım alanı rest'te arayınca `TS2339: Property 'id' does not exist on type '{ ad: string; durum: string; parlaklik?: number \| undefined; }'.` |
| 10 `{ [key]: value }` | the pattern | anahtarın tipi `keyof Cihaz` | anahtar düz `string` olunca `TS2537: Type 'Cihaz' has no matching index signature for type 'string'.` |
| 11 `f({ a = 1, b }: T = {})` | the pattern and the defaults | `: Tip` desenin sonuna. `= {}` için bütün alanlar opsiyonel olmalı | tip yazmayınca `TS7031: Binding element 'ad' implicitly has an 'any' type.` Zorunlu alan varken `= {}`: `TS2741: Property 'ad' is missing in type '{}' but required in type 'Girdi'.` |
| 11b `([x, y]) =>` | the pattern | parametreye tuple tipi `[number, string]` | eksik eleman: `TS2345: Argument of type '[number]' is not assignable to parameter of type '[number, string]'.` |
| 12 `for (const [k, v] of ...)` | the pattern | `Record<string, number>` ve `Map<string, boolean>` | `Object.entries` unutunca `TS2488: Type 'Record<string, number>' must have a '[Symbol.iterator]()' method that returns an iterator.` |

## Bonus 2: Depth

Kod `js/bonus.mjs` içinde, `npm run bonus` ile tek başına çalışıyor. Üç konu seçtim.

### A: what does an array pattern really call?

Dizi deseni sadece dizide çalışmıyor:

```js
const [ilkHarf, ikinciHarf, ...kalanHarfler] = 'klima'
const [oda1, oda2, oda3] = new Set(['salon', 'mutfak', 'salon'])
const [[ilkOda, ilkDurum]] = new Map([['salon', true], ['mutfak', false]])
```

```
A1 string: k l [ 'i', 'm', 'a' ]
A2 set: salon mutfak undefined
A3 map: salon true
```

Set'te `salon` iki kere vardı, tekrar silindiği için üçüncü değişken `undefined` kaldı.

Neyin çağrıldığını görmek için içine `console.log` koyduğum bir nesne yazdım:

```js
const izlenen = {
  [Symbol.iterator]() {
    console.log('   Symbol.iterator cagrildi')
    let n = 0
    return {
      next() { n++; console.log('   next cagrildi', n); return { value: n * 10, done: false } },
      return() { console.log('   return cagrildi (desen isini bitirdi)'); return { done: true } },
    }
  },
}
const [x, y] = izlenen
```

```
   Symbol.iterator cagrildi
   next cagrildi 1
   next cagrildi 2
   return cagrildi (desen isini bitirdi)
A5 iterator: 10 20
```

Conclusion: dizi deseni index ile (`[0]`, `[1]`) okumuyor. Önce `Symbol.iterator` metodunu çağırıyor, sonra her değişken için bir kere `next()`.
İki değişken vardı, tam iki kere çağırdı, sonra "işim bitti" diye `return()` çağırdı. Benim iterator'ım hiç `done: true` demiyor, yani sonsuz, ama sorun olmadı.
Sonsuz generator'da da aynı: `generator uretti: 1`, `generator uretti: 2`, sonra durdu.

Bu yüzden düz nesne dizi deseniyle parçalanamıyor, `Symbol.iterator`'ı yok:

`A6 duz nesne: TypeError: {(intermediate value)} is not iterable`

Tersi oluyor, nesne deseni diziye uygulanabiliyor çünkü dizi de `0`, `1`, `length` alanları olan bir nesne:

`A7 diziye nesne deseni: 3 lamba` (`const { length, 0: bas } = [...]`)

### B: the order of evaluation

```js
function pahaliVarsayilan() {
  console.log('   pahaliVarsayilan CALISTI')
  return 50
}
const { parlaklik: p1 = pahaliVarsayilan() } = { parlaklik: 80 }
const { parlaklik: p2 = pahaliVarsayilan() } = {}
```

```
B1 deger var: 80
   pahaliVarsayilan CALISTI
B1 deger yok: 50
```

Varsayılan baştan hesaplanmıyor, sadece değer `undefined` ise hesaplanıyor. İlk satırda fonksiyon hiç çalışmadı.

Varsayılan aynı desendeki önceki değişkeni kullanabiliyor ama sonrakini kullanamıyor:

```js
const { watt = 10, saatlik = watt * 2 } = { watt: 100 }   // olur
const { a = b, b = 1 } = {}                               // olmaz
```

```
B2 onceki degisken: 100 200
B3 sonraki degisken: ReferenceError: Cannot access 'b' before initialization
```

Desen soldan sağa çalışıyor. `a`'nın varsayılanı hesaplanırken `b` daha oluşmamış. `saatlik` 20 değil 200 çıktı, yani `watt`'ın varsayılanı değil gerçek değeri kullanıldı.

Sırayı sayaçla da gördüm:

```js
let sira = 0
const [ilk = ++sira, ikinci = ++sira, ucuncu = ++sira] = [undefined, 'dolu', undefined]
```

`B4 sira: 1 dolu 2 | sayac: 2`

Ortadaki dolu olduğu için onun `++sira`'sı hiç çalışmadı, sayaç 3 değil 2'de kaldı. Yan etkisi olan bir fonksiyonu varsayılan yapmak bu yüzden riskli, çalışıp çalışmayacağı veriye bağlı.

### C: destructuring in other places

```js
try {
  null.ad
} catch ({ name, message }) {
  console.log('C1 catch:', name, '|', message)
}
```

`C1 catch: TypeError | Cannot read properties of null (reading 'ad')`

`catch (hata)` da bir parametre gibi, o yüzden form 11 orada da çalışıyor.

```js
const klima = { derece: 0, mod: '' };
[klima.derece, klima.mod] = [22, 'soğutma']
```

`C2 atama hedefi: { derece: 22, mod: 'soğutma' }`

Desendeki hedef değişken olmak zorunda değil, atanabilen her şey olur. Form 3 (swap) de aslında bunun özel hali.

```
C3 for...in: 0 string
C3 for...in: 1 string
C3 for...of: lamba 9
C3 for...of: klima 1200
```

`for...in` anahtar veriyor (dizide index, o da string olarak), `for...of` değer veriyor. `[ad, watt]` deseni ancak `for...of` ile anlamlı.
`for...in` ile dizi deseni yazarsam anahtar string'i harf harf parçalanır, `C4 anahtarin ilk harfi: s` bunu gösteriyor (A1 ile aynı sebep, string iterable).

## Bonus 3: Real code

Üç yerden baktım:
- **Task Manager**: kendi Assignment 3 projem (`assignment3/src/`).
- **Library**: bu projenin `node_modules` klasöründeki esbuild 0.28.2 (`tsx` onu kullanıyor), dosya `node_modules/esbuild/lib/main.js`.
  Bu dosya derlenmiş çıktı, `worker_threads2`, `path3` gibi sonu rakamlı isimler oradan geliyor.
- **Open source**: [shadcn-ui/ui](https://github.com/shadcn-ui/ui), commit `e62c943`, klasör `apps/v4/registry/new-york-v4/ui/`. React bileşen kütüphanesi olduğu için seçtim, props kısmıyla doğrudan ilgili.

Satır numaraları bu sürümlere göre.

### Case 1: `assignment3/src/App.tsx`, line 70

```tsx
const [state, dispatch] = useReducer(taskReducer, initialState)
```

**Form:** 1 (values by position).

**Without destructuring:**

```tsx
const sonuc = useReducer(taskReducer, initialState)
const state = sonuc[0]
const dispatch = sonuc[1]
```

`useReducer` nesne değil dizi döndürüyor, bu sayede isimleri ben seçiyorum. Nesne döndürseydi iki tane `useReducer` kullanınca form 6 ile yeniden adlandırmam gerekirdi.

### Case 2 (React props): `assignment3/src/TaskRow.tsx`, line 5

```tsx
export default function TaskRow({ task, onNext, onDelete }: TaskRowProps) {
```

**Form:** 11 (patterns in parameters), the pattern inside is form 5.

**Without destructuring:**

```tsx
export default function TaskRow(props: TaskRowProps) {
  const task = props.task
  const onNext = props.onNext
  const onDelete = props.onDelete
```

**Prop or children:** `task`, `onNext`, `onDelete` üçü de prop. Bu bileşenin children'ı **yok**: `App.tsx` satır 58'de `<TaskRow ... />` diye kendini kapatan etiketle çağırıyorum, arasına bir şey yazmıyorum. `TaskRowProps` tipinde de `children` yok, yani arasına bir şey yazsam TypeScript reddeder (P7).
Children bileşenin içinde var: satır 10'daki `<button onClick={onNext}>Next</button>` içinde `onClick` button'ın prop'u, `Next` yazısı button'ın children'ı.

Bir şey daha fark ettim: `task`'ı aldım ama içini açmadım, aşağıda `task.title` ve `task.status` yazıyorum. `{ task: { title, status }, onNext, onDelete }` (form 9) de yazabilirdim ama o zaman `title`'ın neyin başlığı olduğu belli olmazdı. Böyle kalması daha iyi.

### Case 3: `node_modules/esbuild/lib/main.js`, line 2394

```js
let { port1: mainPort, port2: workerPort } = new worker_threads2.MessageChannel();
```

**Form:** 6 (rename while you take it).

**Without destructuring:**

```js
let kanal = new worker_threads2.MessageChannel();
let mainPort = kanal.port1;
let workerPort = kanal.port2;
```

Yeniden adlandırmanın iyi bir kullanımı. `port1` ve `port2` hiçbir şey anlatmıyor, yeni isimler hangisinin ne işe yaradığını söylüyor. Ayrıca `kanal` diye sadece iki satır yaşayan bir değişkene gerek kalmıyor.

### Case 4: `node_modules/esbuild/lib/main.js`, line 1753

```js
for (const [key, value] of [["errors", errors], ["warnings", warnings]]) {
```

**Form:** 12 (patterns in loops).

**Without destructuring:**

```js
for (const cift of [["errors", errors], ["warnings", warnings]]) {
  const key = cift[0];
  const value = cift[1];
```

Burada `Object.entries` yok, çiftleri elle yazmışlar. Yani form 12 için nesne ya da Map şart değil, "iki elemanlı dizilerden oluşan dizi" olması yetiyor (`Object.entries` da zaten bunu üretiyor).

### Case 5 (React props): shadcn-ui `card.tsx`, line 4

```tsx
function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn("flex flex-col gap-6 ...", className)}
      {...props}
    />
  )
}
```

**Form:** 11 + 8 (patterns in parameters, rest inside). Tipi P7'deki `ComponentProps`.

**Without destructuring:**

```tsx
function Card(allProps: React.ComponentProps<"div">) {
  const className = allProps.className
  const props = { ...allProps }
  delete props.className
```

**Prop or children:** `className` ayrılan tek prop, çünkü bileşen onu kendi sınıflarıyla birleştiriyor. `children` desende **hiç yazmıyor** ama kaybolmuyor: `...props`'un içinde kalıyor ve `{...props}` ile `<div>`'e gidiyor. `<Card>içerik</Card>` yazınca içerik bu yoldan çiziliyor.
Bu P2'nin gerçek koddaki kanıtı: children sadece bir prop olduğu için diğer prop'larla beraber rest'in içinde taşınabiliyor. Benim P4'teki `Bolum` bileşenim children'ı ayırıyordu çünkü onu `<h2>`'den sonra belli bir yere koymam gerekiyordu. Burada yeri önemli değil, o yüzden ayırmamışlar.

`{...props}` en sonda, yani kullanan kişi `data-slot`'u ezebilir (P4: sonra yazılan kazanır). `className`'i ezemez, çünkü o `props`'un içinde artık yok.

### Case 6: shadcn-ui `button.tsx`, line 40

```tsx
function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
```

**Form:** 11 + 7 + 8 (patterns in parameters, three defaults, rest at the end).

**Without destructuring:**

```tsx
function Button(allProps) {
  const className = allProps.className
  const variant = allProps.variant === undefined ? "default" : allProps.variant
  const size = allProps.size === undefined ? "default" : allProps.size
  const asChild = allProps.asChild === undefined ? false : allProps.asChild
  // props: bu dördü dışındaki her şeyi yeni bir nesneye kopyala
```

Tek desende benim üç formum birden var ve uzun yolu yazınca desenin ne kadar iş yaptığı görülüyor. Tipte `asChild?: boolean` opsiyonel ama varsayılan sayesinde gövdede `boolean` (T4). P6'daki kural burada da geçerli: `variant={null}` verilirse varsayılan çalışmaz.

### Case 7 (where I think it makes the code worse): shadcn-ui `chart.tsx`, lines 83-86

```tsx
const ChartStyle = ({ id, config }: { id: string; config: ChartConfig }) => {
  const colorConfig = Object.entries(config).filter(
    ([, config]) => config.theme ?? config.color
  )
```

**Form:** 2 inside 11 (an array pattern in a parameter, skipping the first item).

**Without destructuring:**

```tsx
const colorConfig = Object.entries(config).filter(
  (cift) => cift[1].theme ?? cift[1].color
)
```

**Why it is worse:** üç satırda iki farklı `config` var. Satır 83'teki bileşenin prop'u (bütün ayar nesnesi), satır 85'teki ise onun tek bir kaydı. İçteki dıştakini gölgeliyor. Satır 84'teki `Object.entries(config)` dıştakini, satır 85'teki `config.theme` içtekini kullanıyor ve bunu anlamak için durup düşünmem gerekti.
Bir de `[, config]` içindeki boş virgül var, ilk bakışta gözden kaçıyor.

Sorun destructuring'in kendisi değil, verilen isim. Aynı dosyada satır 100'de aynı veri `([key, itemConfig])` diye alınmış ve orası rahat okunuyor. Benim düzeltmem:

```tsx
const colorConfig = Object.entries(config).filter(
  ([, itemConfig]) => itemConfig.theme ?? itemConfig.color
)
```

### What I noticed in my own code

- Assignment 3'te çok `...` var ama neredeyse hepsi **spread**, destructuring değil. `taskReducer.ts` satır 36: `{ ...state, tasks: tasks, past: [...state.past, state.tasks] }` eşittirin sağında, yani açıyor. Projede rest (toplayan `...`) hiç kullanmamışım.
- `taskReducer.ts` satır 78: `const last = state.past[state.past.length - 1]`. Bunu desenle yazamıyorum, çünkü rest en sonda olmak zorunda. `const [...oncekiler, last] = state.past` denedim: `SyntaxError: Rest element must be last element`. Dizinin başı için desen, sonu için index.

## My own log

Çalışırken çıkan gerçek hatalar ve beklediğimden farklı çıkan şeyler.

**1. `ReferenceError` on the swap line.** Starter dosyaları noktalı virgül kullanmıyor, ben de koymadım:

```js
let acikLamba = 'salon lambası'
let kapaliLamba = 'mutfak lambası'
[acikLamba, kapaliLamba] = [kapaliLamba, acikLamba]
```

```
ReferenceError: Cannot access 'kapaliLamba' before initialization
```

Sebep: satır `[` ile başlayınca JavaScript onu önceki satırın devamı sanıyor, yani `'mutfak lambası'[acikLamba, kapaliLamba] = ...` diye okuyor.
`let kapaliLamba` satırının sonuna `;` koyunca düzeldi. Öğrendiğim: noktalı virgülsüz yazıyorsam `[` veya `(` ile başlayan satırdan önce `;` şart.

**2. `SyntaxError` on `{ oda, kat } = konum`.**

```
SyntaxError: Unexpected token '='
```

Hata `=` işaretini gösteriyor, `{`'i değil. Çünkü `{ oda, kat }` kısmı geçerli bir kod bloğu olarak okunuyor, sorun ondan sonra başlıyor. Parantez içine alınca düzeldi (tuzak 3).

**3. Wrong guess: I thought `const [parlaklik = 50] = []` was a TypeScript error.** `ts/arrays.ts` içine önce "TS2493 verir" diye yorum yazıp dizi tipini elle vermiştim.
Sonra ayrı dosyada deneyince derlendiğini gördüm. Hata sadece varsayılan **yokken** geliyor:

```
error TS2493: Tuple type '[]' of length '0' has no element at index '0'.
```

Varsayılan olunca TypeScript "eleman yoksa bile değer var" diye kabul ediyor. Yorumu ve örneği düzelttim.

**4. Destructuring the same name twice.** Aynı dosyada iki farklı nesneden `{ ad }` aldım:

```js
const cihaz = { ad: 'Lamba' }
const { ad } = cihaz
const { ad } = { ad: 'Klima' }
```

```
SyntaxError: Identifier 'ad' has already been declared
```

Desen de sonuçta `const ad` demek, aynı isim iki kere olmuyor. İkincisini `{ ad: cihazAdi }` yapınca çözüldü. Form 6'nın (yeniden adlandırma) asıl kullanım yeri bu.

**5. children as a prop and between the tags at the same time.** `<KartB baslik="Mutfak" children="prop olan">arada yazan</KartB>` denedim.
Hata yok, uyarı yok. Etiket arasındaki kazandı, `children="prop olan"` sessizce kayboldu (P2). Sessiz olduğu için gerçek kodda fark etmesi zor olur.

**6. A function as children.** `<Kutu>{() => 'selam'}</Kutu>` ekrana `selam` yazmadı, `<div></div>` çıktı. Terminalde:

```
Functions are not valid as a React child. This may happen if you return children instead of <children /> from render. Or maybe you meant to call this function rather than return it.
```

Bu uyarı `output.txt` içinde yok. `npm run all > output.txt` sadece normal çıktıyı (stdout) dosyaya yazıyor, React uyarıları stderr'e gidiyor ve terminalde kalıyor.
Aynı kod TypeScript'te hiç derlenmedi (`TS2322: Type '() => string' is not assignable to type 'ReactNode'.`), yani TS bu hatayı çalıştırmadan yakalıyor.

**7. `props.key` is always `undefined`.** `<AnahtarDene key="k1" ad="Lamba" />` içinde `props.key` okudum, `undefined` geldi. Uyarı:

```
AnahtarDene: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)
```

`key` JSX'te özellik gibi yazılıyor ama props nesnesine girmiyor, React onu kendine ayırıyor.

**8. Trying to change props.** Bileşenin içinde `props.baslik = 'yeni başlık'` yazdım:

```
TypeError: Cannot assign to read only property 'baslik' of object '#<Object>'
```

Props sadece kural olarak değil gerçekten salt okunur (nesne dondurulmuş). Ekrana eski başlık çizildi.

**9. A misleading TypeScript message.** `children: string` isteyen bileşene `<i>klima</i>` verdim:

```
error TS2745: This JSX tag's 'children' prop expects type 'string' which requires multiple children, but only a single child was provided.
```

Hatanın yeri doğru ama "requires multiple children" kısmı durumla uyuşmuyor, bileşen tek bir string istiyor. Asıl sebep verdiğim şeyin string değil eleman olması. Mesajın her kelimesine güvenmemek, satıra ve tipe bakmak gerekiyor.

**10. The same name for a type and a component.** `ts/props.tsx` içinde hem `type PanelProps` hem `function PanelProps` vardı. `npm run check` hata vermedi, çünkü TypeScript'te tipler ve değerler ayrı isim alanlarında.
Derleniyor ama okurken hangisi tip hangisi bileşen anlaşılmıyordu, tipin adını `PanelTip` yaptım.
