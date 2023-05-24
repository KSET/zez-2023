import ImageBileEater from "~/assets/page/tmp/festival/artists/Bile Eater.png.jpg";
import ImageCZN from "~/assets/page/tmp/festival/artists/CZN.png.jpg";
import ImageDJExtinction from "~/assets/page/tmp/festival/artists/DJ Extinction.png.jpg";
import ImageFeliciaAtkinson from "~/assets/page/tmp/festival/artists/Félicia Atkinson.png.jpg";
import ImageKenjiAraki from "~/assets/page/tmp/festival/artists/Kenji Araki.png.jpg";
import ImageLilacube from "~/assets/page/tmp/festival/artists/lilacube.png.jpg";
import ImageManjaRistic from "~/assets/page/tmp/festival/artists/Manja Ristić.png.jpg";
import ImageOSOL from "~/assets/page/tmp/festival/artists/OSOL.png.jpg";
import ImagePETBRICK from "~/assets/page/tmp/festival/artists/PETBRICK.png.jpg";
import ImagePruceMary from "~/assets/page/tmp/festival/artists/Pruce Mary.png.jpg";
import ImageTheAntiTeleologicalRockCombo from "~/assets/page/tmp/festival/artists/The Anti-Teleological Rock Combo.png.jpg";
import { LinkType } from "~/components/base/collapsible-links";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { type Artist } from "~/store/artists";

let i = 0;

const artists = [
  {
    id: ++i,
    name: "Puce Mary",
    countries: ["dk"],
    tags: ["cinematic", "experimental electronic", "industrial noise"],
    description: `
    <p>
      Sa zaleđenih ravnica danskog poluotoka puše hladni vjetar nerijetko nemilosrdne elektronike
      <strong>Frederikke Hoffmeier</strong>. Poznatija pod imenom <strong>Puce Mary</strong>, dugo već
      pliva (power) elektroničkim vodama (u koje je neko bacio toster, ili neki synth).
    </p>
    <p>
      <strong>Od razuzdanog harsh noisea do filmske kompozicije</strong>, od koje mnogi ovakvi glazbenici i žive;
      njen live set je sve samo ne dosadan i jednoličan, potpomognut njezinim često konfrontacijskim stilom nastupa,
      ali i besramnim eskapadama u relativno konvencionalnu ljepotu. Nakon građenja pedigrea sa "čišćim" žanrovskim
      "kompozicijama", <strong>"The Drought" (PAN)</strong> iz 2018. označava prekretnicu gdje noise postaje djelom
      još koherentnijih narativa i šireg vokabulara. Manje stvar protiv koje se očekuje reakcija, već nešto zrelo
      prihvaćeno kao integralni dio, jedan koji može biti itekako prisutan bez da je direktno očit, dio dinamike između,
      ispod i iznad gore spomenutih, neugodno-lijepih, "filmskih" trenutaka, field recordinga, glasa i pokoje neporecivo
      dražesne melodije. Neki od najznačajnijih kolaboratora ove danske skladateljice uključuju
      <strong>Drew McDowall, Varg2TM, Kali Malone i Stephena O’Malleya</strong>.
    </p>
    <p>
      “If the The Drought concerns itself with metamorphosis, we can see it in how Hoffmeier has transformed herself
      as Puce Mary, from her earliest tape releases of formless expressions of noise in the darkness, to transmitting
      ideas and feeling through an increasingly complex musical vocabulary. This is her strongest album to date and
      one where “noise” is but a tool towards a much more expansive expression of music.”
    </p>
    <p>
      <strong>— The Quietus</strong>
    </p>
    `.trim(),
    image: ImagePruceMary,
    links: [
      {
        type: LinkType.Bandcamp,
        url: "https://puce-mary.bandcamp.com/",
      },
      {
        type: LinkType.Youtube,
        url: "https://www.youtube.com/watch?v=K248GTJrpA0",
      },
      {
        type: LinkType.Instagram,
        url: "https://www.instagram.com/_muldvarp_/",
      },
    ],
  },
  {
    id: ++i,
    name: "Kenji Araki",
    countries: ["at"],
    tags: ["experimental electronic", "deconstructed club", "avant pop"],
    description: `
    <p>
      <strong>Kenji Araki</strong> je digitalni umjetnik i producent iz Austrije, porijeklom je iz Japana. U svojem radu dekonstruira
      žanrovske granice - pa se tako na njegovom očaravajućem debitantskom albumu Leidenzwang mogu čuti elementi i <strong>utjecaji
      avangardne elektronike, popa, post-cluba, glitcha, industriala, eurodancea, grungea i metala</strong>. Istraživanje granica žanra
      i medija stavljene se u srž njegovog artističkog etosa i vode k žustrom, nepoznatom i mračnom produktu koji slušatelja puni
      i iscrpljuje naizmjeničnom izmjenom noisea, glitcha i hyperpopa. Kenji je sve od navedenog i ništa od toga, a u KSET-u
      će to <strong>uz podršku vokalista Ybsole</strong> i demonstrirati <strong>audiovizualnim koncertom za pamćenje</strong>.
    </p>
    `.trim(),
    image: ImageKenjiAraki,
    links: [
      {
        type: LinkType.Youtube,
        url: "https://www.youtube.com/watch?v=f2yw3Q2KJwc",
      },
      {
        type: LinkType.Bandcamp,
        url: "https://kenjiaraki.bandcamp.com/album/leidenzwang",
      },
      {
        type: LinkType.Facebook,
        url: "https://www.facebook.com/j.kenjiaraki",
      },
      {
        type: LinkType.Website,
        url: "https://sites.google.com/view/kenjiaraki",
      },
      {
        type: LinkType.Instagram,
        url: "https://www.instagram.com/j.kenjiaraki/",
      },
    ],
  },
  {
    id: ++i,
    name: "Félicia Atkinson",
    countries: ["fr"],
    tags: ["spoken word", "ambient", "electroacoustic"],
    description: `
    <p>
      Za Féliciu Atkinson, ljudski glasovi nastanjuju i krajobraze koji ne govore sami po sebi: knjige, slike, sjećanja, pejzaže
      i ideje - nešto što je jednako izazov koliko i prilika pri kompoziciji. Sve te potencijalne i skrivene glasove ona kroji u
      razgovoru s vlastitim; gradeći kolaže uz pomoć <strong>akustičko-elektroničkog hardvera i softvera, pronađenih objekata te field
      recordinga</strong>, sve u dijalogu s vlastitim glasom, rastežući putem vrijeme, prostor, same glazbene elemente i konvencije.
      Naravno, posebna pažnja je uvijek pridata prostoru i dinamici, elementi si nikad se gaze na prste, glasovi dolaze šaptani
      iz kuteva i praznina, tuđih perspektiva, iz priča gdje je Atkinson pripovjedač, ali ne i protagonist.
    </p>
    <p>
      TL;DR Prestižni intimni drone ambient s improviziranim elementima, ako znate ime ne treba vam dalje objašnjenja,
      ako tek ulazite u žanr, nema boljeg uvoda i privilegirani ste da počinjete upravo s Félicijom. Porijeklom iz Normandije,
      ova kompozitorica, vizualna umjetnica i spisateljica aktivna je od ranih 2000-ih, surađujući s mnogim drugim prominentnim
      kreatorima i kreaturama s rubova umjetnosti kao što su <strong>Stephen O’Malley, Jefre Cantu-Ledesma, Chris Watson,
      Christina Vantzou</strong> i raznim ansamblima. Uz angažmane na raznim rezidencijama, izložbama i biennalima,
      također je skladala za film (Ben Rivers, Chivas de Vinck) te čak modne kuće (Prada, Burberry).
      Uz sve to vodi label i izdavačku kuću Shelter Press s Bartoloméom Sansonom.
    </p>
    `.trim(),
    image: ImageFeliciaAtkinson,
    links: [
      {
        type: LinkType.Youtube,
        url: "https://www.youtube.com/watch?v=2NABQaiVPhA&t=510s",
      },
      {
        type: LinkType.Instagram,
        url: "https://www.instagram.com/felicia_atkinson/",
      },
      {
        type: LinkType.Bandcamp,
        url: "https://feliciaatkinson.bandcamp.com/",
      },
      {
        type: LinkType.Website,
        url: "https://shelter-press.com/felicia-atkinson-image-language/",
      },
    ],
  },
  {
    id: ++i,
    name: "Manja Ristić",
    countries: ["rs", "hr"],
    tags: ["electroacoustic", "field recording", "impro"],
    description: `
    <p>
      Manja Ristić rođena je u Beogradu 1979. Diplomirala je na Fakultetu muzičkih umetnosti u Beogradu (2001), magistrirala je na
      londonskom Royal College of Music (2004) gdje je bila stipendist. Manjin zvuk istražuje prostor onkraj suvremene glazbe,
      a inspiraciju često pronalazi u prirodi koja je okružuje. Posvećena je <strong>interdisciplinarnom pristupu umjetnosti zvuka,
      field recordingu, instrumentalnoj elektroakustici te eksperimentalnim radijskim formama</strong>. Nastupala je diljem Europe
      i Sjedinjenih američkih država kao izvođač komorne i klasične glazbe te kao improvizator. Ostvarila je suradnju s brojnim
      renomiranim dirigentima, multimedijskim umjetnicima, pjesnicima, kazališnim i filmskim redateljima. Živi i radi na otoku Korčula.
    </p>
    `.trim(),
    image: ImageManjaRistic,
    links: [
      {
        type: LinkType.Website,
        url: "https://manjaristic.blogspot.com/",
      },
      {
        type: LinkType.Soundcloud,
        url: "https://soundcloud.com/manja-ristic",
      },
      {
        type: LinkType.Facebook,
        url: "https://www.facebook.com/maaanjaaaa",
      },
    ],
  },
  {
    id: ++i,
    name: "CZN",
    countries: ["it", "pt"],
    tags: ["percussion", "impro", "psychedelic"],
    description: `
    <p>
      Valentina Magaletti <strong>(Tomaga, Vanishing Twin, Holy Tongue)</strong> je priznata perkusionistica, kompozitorica i
      multiinstrumentalistica čije slojevite suradnje pokrivaju sve od <strong>Thurstona Moorea</strong> i <strong>Kim Gordon</strong>
      do <strong>Nicolasa Jaara</strong> i <strong>Kamasija Washingtona</strong>. Jõao (HHY & The Macumbas) je portugalski perkusionist i
      “zvukovni kipar” koji djeluje na području eksperimentale, jazza i folka.
    </p>
    <p>
      Čin lupanja objekata štapovima vjerojatno je najstariji model glazbene ekspresije. Od tad su objekti i štapovi napravili dugi put,
      ali perkusije nikada nije iščezla. CZN odnosi se na bakar, cink i nikal (copper, zinc, nickel), sirove materijale korištene u izradi
      perkusionističkih elemenata. Ovaj multinacionalni duo sastoji se od Jõaoa Pais Filipea i Valentine Magaletti, koji se uz udaraljke
      također bave zvučnim kiparstvom, izradom instrumenata, kompozicijom i naravno produkcijom. <strong>Ciklički-ali-ne-skroz ritmovi traju
      i evoluiraju, ubzavaju i usporavaju, suptilno koliko kompleksno, opušteno ali precizno predu ritualnu tapiseriju, lagano podebljanom s
      pokojim elektroničkim zvukom, field recordingom i drugim ukusnim intervencijama</strong>. CZN uvlači u trans, no za promjenu ne tjera
      slušatelja na ples, već izaziva na njega.
    </p>
    `.trim(),
    image: ImageCZN,
    links: [
      {
        type: LinkType.Youtube,
        url: "https://www.youtube.com/watch?v=h47VZozfDcw",
      },
      {
        type: LinkType.Bandcamp,
        url: "https://czndrums.bandcamp.com/",
      },
      {
        type: LinkType.Facebook,
        url: "https://www.facebook.com/czndrums/",
      },
      {
        type: LinkType.Website,
        url: "https://valentinamagaletti.com/",
      },
    ],
  },
  {
    id: ++i,
    name: "The Anti-Teleological Rock Combo",
    countries: ["hr"],
    tags: ["noise rock", "impro", "chamber music"],
    description: `
    <p>
      Rastrgani između slobodne igre soničkih označitelja i nastojanja da od unaprijed zadanih pitch-class
      i beat-class setova razviju vlastiti improvizacijski vokabular, <strong>The Anti-Teleological Rock Combo
      su Luka Čapeta (el. gitara), Pavle Jovanović (el. gitara), Šimun Matišić (bubnjevi, objekti) i Leo Beslać
      (el. bas, flauta)</strong>. Dosljedno etosu što im krasi ime, repertoar koji trenutno izvode autorski je
      bez implicitne vindikacije autora, gitarski bez implicitnog gitarizma, solistički bez implicitnih bravura,
      fahovski nasilno lišen ideje o referentnom fahu. Moto susreti treće vrste.
    </p>
    `.trim(),
    image: ImageTheAntiTeleologicalRockCombo,
  },
  {
    id: ++i,
    name: "PETBRICK",
    countries: ["us"],
    tags: ["electronic", "metal", "industrial"],
    description: `
    <p>
      Petbrick... Pet, Brick... Što reći nekom tko vuče ciglu iza sebe poput kakvog ljubimca? Ništa jer su vjerojatno dosta nabildani
      od spomenute aktivnosti, a potencijalno i naoružani. Da je nasilje u centru priče kod ovog (originalno studijskog) projekta ne
      dolazi kao iznenađenje. Što možda niste znali je kako se tu radi o jednom <strong>Iggoru Cavaleri</strong> (Sepultura, Mixhell,
      Cavalera Conspiracy, Soulwax) na <strong>bubnju i synthovima</strong> te <strong>Wayneu Adamsu</strong> (Big Lad, Death Pedals,
      Johnny Broke) na vokalima <strong>(i synthovima naravno)</strong>. S obzirom na Iggorovu bubnjarsku pozadinu također ne iznenađuje
      kako će se ovdje raditi o ritmičnoj varijanti buke i nasilja, od preciznog do primalnog, jungle beatovi iz Amazonske prašume.
    </p>
    <p>
      Ljudi u heavy bendovima često imaju nekakve noise projekte, pa tako nešto vrijedi i za ovaj; dva prijatelja koje nije briga
      i samo idu radit što hoće, počevši s remixevima bendova od frendova kao što su <strong>Deafkids, Warmduscher, Full of Hell,
      Nails i Harms Way</strong>, a prvi koncert im je bio otvarajući za New Yorkov već legendarni <strong>Uniform</strong>.
      Od tad su (također na iznenađenje apsolutno nikog) nastupili i na Roadburnu festivalu i okolo sa spomenutom ekipom.
    </p>
    `.trim(),
    image: ImagePETBRICK,
    links: [
      {
        type: LinkType.Youtube,
        title: "Petbrick - Primer",
        url: "https://www.youtube.com/watch?v=eCG7UyDR3yE",
      },
      {
        type: LinkType.Youtube,
        title: "Petbrick LIVE",
        url: "https://www.youtube.com/watch?v=zmGvT_lgP7o",
      },
      {
        type: LinkType.Bandcamp,
        url: "https://petbrick.bandcamp.com/album/liminal",
      },
      {
        type: LinkType.Facebook,
        url: "https://www.facebook.com/petbrickband/",
      },
      {
        type: LinkType.Instagram,
        url: "https://www.instagram.com/petbricknoise/",
      },
    ],
  },
  {
    id: ++i,
    name: "Bile Eater",
    countries: ["slo"],
    tags: ["power electronics", "noise", "industrial"],
    description: `
    <p>
      Bile Eater je minijaturni nastup zvučnog terora izvedenog od jedne polovice slovenskog noise dua Hexenbrutal. Ponekad je maskiran, ponekad je s gostima,
      ali uvijek je naoružan ritam mašinama, pločom prljavih lo-fi efekata i debelim distorzijama. Bile Eater proizvodi ekstremno energičan i ekspresivan performans
      van pozornice u maniri dooma i masnog techna.
    </p>
    `.trim(),
    image: ImageBileEater,
    links: [
      {
        type: LinkType.Youtube,
        url: "https://www.youtube.com/watch?v=bXQT0mU2DWw",
      },
    ],
  },
  {
    id: ++i,
    name: "OSOL",
    countries: ["hr"],
    tags: ["noise", "kraut"],
    description: `
    <p>
      Noise duo OSOL čine Brle na bubnjevima i David na gitari. Od OSOLa očekujemo primitivnu noise glazbu na rock instrumentima.
    </p>
    `.trim(),
    image: ImageOSOL,
    links: [
      {
        type: LinkType.Youtube,
        url: "https://www.youtube.com/watch?v=49dwzAWh2Iw",
      },
    ],
  },
  {
    id: ++i,
    name: "lilacube",
    countries: ["hr"],
    tags: ["grime", "techno", "breakbeat"],
    description: `
    <p>
      lilacube rijetko nastupa, više se voli baviti organizacijom te promocijom zanimljivih producenata i DJ-eva. Upravo iz tog razloga, početkom 2015.
      godine pokreće <strong>NO BALANCE</strong> program s ciljem eksperimentiranja i spajanja raznih žanrova unutar jedne večeri. Pod okriljem ovog
      programa kroz godine je u Zagreb dovela slojevite izvođače Madam X, Le Dom, Privacy, Spoiled Drama, Fabrice Lig, M.O.O.N, Dual Shaman, X-Coast
      i Jimmy Pe kao i najprogresivnije regionalne izvođače/ice. Opčinjena je rapom i hip hopom zbog kojeg je istovremeno vodila i program Seven Up
      okrenut “beatastijoj” strani plesa. Svoj klupski stil <strong>najčešće opisuje kao kombinaciju mračnog techna s izopačenim breakbeat,
      rap i grime momentima</strong>.
    </p>
    `.trim(),
    image: ImageLilacube,
    links: [
      {
        type: LinkType.Youtube,
        url: "https://www.youtube.com/watch?v=49dwzAWh2Iw",
      },
      {
        type: LinkType.Soundcloud,
        url: "https://soundcloud.com/lila_cube",
      },
    ],
  },
  {
    id: ++i,
    name: "DJ Extinction",
    countries: ["hr"],
    tags: ["techno", "electro", "breakbeat"],
    description: `
    <p>
      DJ Extinction za sebe kaže da mu je glazba život, a DJ-anje strast. Vrti trake i stvara uspomene. Uvijek ganja savršenu traku.
      Stvara soundtrack života. Pušta glazbu da priča sama za sebe. Dovodi zabavu direktno u dušu i poziva sve da se zajedno izgube u glazbi.
      DJ koji ima ono nešto. Njegovi setovi slijede BPM njegovog srca. Ultimativna party mašina.
    </p>
    <p>
      A sad ozbiljno: jedini preostali član klupskog programa <strong>Ćelija, pušta nabrijane varijante electra, techna, breakbeata</strong> itd.,
      uz pokoji <strong>izlet u “čudno”</strong>.Za ovu prigodu priprema <strong>tvrđu i eksperimentalniju varijantu</strong> svog uobičajenog izričaja.
    </p>
    `.trim(),
    image: ImageDJExtinction,
    links: [
      {
        type: LinkType.Soundcloud,
        url: "https://soundcloud.com/djextinction",
      },
    ],
  },
] satisfies Artist[];

export const artistsRouter = createTRPCRouter({
  getAll: publicProcedure.query(() => {
    return artists;
  }),
});
