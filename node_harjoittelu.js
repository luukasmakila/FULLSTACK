const x = 1 //konstantti
let y = 5 //muuttuja

//console.log(x,y) printtaa
y += 10
//console.log(x,y)
y = "text"
//console.log(x,y)
//x = 4 error, koska x on konstantti

const lst = [1,2,3]
lst.push(4) //lisää listaan uuden alkion

//console.log(lst.length)
//console.log(lst[2])

lst.forEach(i => {
    //console.log(i)
}) //looppaa listan läpi ja kutsuu listan jokaiselle alkiolle funktiota antaen alkion funktiolle parametrina

const lst2 = lst.concat(5) //palauttaa uuden taulukon, joka sisältää vanhan taulukon alkioiden lisäksi uuden alkion.

const t = lst.map(value => value * 2) //map luo uuden listan annetun listan alkioista tekemällä jokaiselle listan alkiolle jonkin operaation
const t2 = lst.map(value => "<li>"+value+"<li>")

//console.log(t)
//console.log(t2)

const [eka, toka, ...loput] = lst
//console.log(eka, toka, loput) //first ja second sijoitetaan taulukon kaksi ensimmäistä lukua. Muuttujaan rest "kerätään" sijoituksesta jäljelle jääneet luvut omaksi taulukoksi.

const object1 = {
    name: {
        first: "Luukas",
        last: "Mäkilä"
    },
    age: "21",
    education: "TKT Opiskelija"
} //määritellään olio luettelemalla sen kentät aaltosulkeiden sisällä

//console.log(object1.name.first)
const ika = "age"
//console.log(object1[ika]): Olioiden kenttiin viitataan pistenotaatiolla tai hakasulkeilla

object1["secret number"] = 12345
object1.address = "Herttoniemi" //Olioille voidaan lisätä kenttiä myös lennossa joko pistenotaation tai hakasulkeiden avulla:
//console.log(object1["secret number"])
//console.log(object1.address)

const sum = (p1, p2) => {
    return p1+p2
} //nuolifunktio, joka laskee parametreikseen saadut arvot yhteen ja palauttaa vastauksen
const summa = sum(5,8) //kutsuu funktiota ja tekee saadusta arvosta konstantin summa arvon
//console.log(summa)