import fs from 'node:fs';
const rows=[];
const events={
mma17:'https://www.soompi.com/article/1088295wpp/performances-2017-melon-music-awards',
mma18:'https://www.soompi.com/article/1271997wpp/performances-2018-melon-music-awards',
mma19:'https://www.soompi.com/article/1368880wpp/watch-performances-from-the-melon-music-awards-2019',
mma20:'https://www.soompi.com/article/1441842wpp/watch-performances-from-melon-music-awards-2020',
mma21:'https://www.soompi.com/article/1502196wpp/watch-performances-from-melon-music-awards-2021',
mma22:'https://www.soompi.com/article/1556027wpp/watch-performances-from-melon-music-awards-2022',
aaa17:'https://www.soompi.com/article/1078479wpp/performances-2017-asia-artist-awards',
aaa18:'https://www.soompi.com/article/1270677wpp/performances-2018-asia-artist-awards',
aaa19:'https://www.soompi.com/article/1368116wpp/watch-performances-from-2019-asia-artist-awards',
aaa20:'https://www.soompi.com/article/1440672wpp/watch-2020-asia-artist-awards-shares-sneak-peek-of-singers-and-actors-hitting-the-red-carpet',
aaa22:'https://www.newsen.com/news_view.php?uid=202212101601216310',
aaa23:'https://mb.com.ph/2023/12/15/winners-at-the-2023-asia-artist-awards-in-the-philippines',
aaa24:'https://enter.etoday.co.kr/news/view/270296',
gda17:'https://www.soompi.com/article/936941wpp/watch-performances-31st-golden-disc-awards',
gda19:'https://www.soompi.com/article/1288197wpp/performances-33rd-golden-disc-awards-day-1',
gda21:'https://www.soompi.com/article/1447847wpp/watch-performances-from-the-35th-golden-disc-awards-day-1',
gda21b:'https://www.soompi.com/article/1447993wpp/watch-performances-from-the-35th-golden-disc-awards-day-2',
mama18:'https://www.soompi.com/article/1278359wpp/performances-2018-mama-hong-kong',
mama20:'https://www.soompi.com/article/1441983wpp/watch-performances-from-2020-mnet-asian-music-awards',
mama23:'https://event.tving.com/en/news/2023-mama-awards-day-1-winners-list/',
mama24:'https://www.soompi.com/article/1695036wpp/2024-mama-awards-announces-1st-lineup-of-performers',
mama25:'https://front.mnetplus.world/en/news/2025-mama-awards-demonstrates-musics-power-to-heal-and-unite-in-moving-two-nights-performances/',
tma22:'https://news.tf.co.kr/read/entertain/1967403.htm',
tma24:'https://fannstar.tf.co.kr/fnnews/read/117824',
tma26:'https://news.tf.co.kr/read/entertain/2367103.htm',
sma24:'https://www.youtube.com/watch?v=aH9oy9ohXgo',
sma25:'https://enter.etoday.co.kr/news/view/279335',
sma26:'https://www.starnewskorea.com/music/2026/06/04/2026060407035741459'
};
function add(name,english,members,event,wiki=english,aliases=[]){rows.push({name,english,aliases,members:members?members.split(',').map(v=>{const [name,english,...aliases]=v.split('/');return{name,english,aliases}}):[],membershipBasis:members?'2017–2026 활동 이력 기준 · 현·전 멤버 포함 (개별 멤버의 시상식 참석을 뜻하지 않음)':'솔로 아티스트',sources:[events[event],...(members?[`https://en.wikipedia.org/wiki/${encodeURIComponent(wiki.replaceAll(' ','_'))}`]:[])].filter(Boolean)});}
add('방탄소년단','BTS','알엠/RM/김남준,진/Jin/김석진,슈가/SUGA/민윤기/Agust D,제이홉/j-hope/정호석,지민/Jimin/박지민,뷔/V/김태형,정국/Jung Kook/Jungkook/전정국','mma17');
add('세븐틴','SEVENTEEN','에스쿱스/S.COUPS/최승철,정한/Jeonghan/윤정한,조슈아/Joshua/홍지수,준/Jun/문준휘,호시/Hoshi/권순영,원우/Wonwoo/전원우,우지/Woozi/이지훈,디에잇/THE 8/서명호,민규/Mingyu/김민규,도겸/DK/이석민,승관/Seungkwan/부승관,버논/Vernon/최한솔,디노/Dino/이찬','aaa17','Seventeen (South Korean band)');
add('트와이스','TWICE','나연/Nayeon,정연/Jeongyeon,모모/Momo,사나/Sana,지효/Jihyo,미나/Mina,다현/Dahyun,채영/Chaeyoung,쯔위/Tzuyu','mma17','Twice');
add('엑소','EXO','시우민/Xiumin,수호/Suho,레이/Lay,백현/Baekhyun,첸/Chen,찬열/Chanyeol,디오/D.O./도경수,카이/Kai,세훈/Sehun','mma17','Exo');
add('블랙핑크','BLACKPINK','지수/Jisoo,제니/Jennie,로제/Rosé/Rose,리사/Lisa','mma18','Blackpink');
add('레드벨벳','Red Velvet','아이린/Irene,슬기/Seulgi,웬디/Wendy,조이/Joy,예리/Yeri','mma17','Red Velvet (group)');
add('마마무','MAMAMOO','솔라/Solar,문별/Moonbyul,휘인/Wheein,화사/Hwasa','mma18','Mamamoo');
add('여자친구','GFRIEND','소원/Sowon,예린/Yerin,은하/Eunha,유주/Yuju,신비/SinB,엄지/Umji','mma17','GFriend');
add('스트레이 키즈','Stray Kids','방찬/Bang Chan,리노/Lee Know,창빈/Changbin,현진/Hyunjin,한/Han,필릭스/Felix,승민/Seungmin,아이엔/I.N,우진/Woojin/김우진','aaa18','Stray Kids',['스키즈','SKZ']);
add('투모로우바이투게더','TOMORROW X TOGETHER','수빈/Soobin,연준/Yeonjun,범규/Beomgyu,태현/Taehyun,휴닝카이/Huening Kai/Hueningkai','mma19','Tomorrow X Together',['TXT','투바투']);
add('엔하이픈','ENHYPEN','정원/Jungwon,제이/Jay,제이크/Jake,성훈/Sunghoon,선우/Sunoo,니키/Ni-ki/Niki','mma21','Enhypen');
add('에이티즈','ATEEZ','홍중/Hongjoong,성화/Seonghwa,윤호/Yunho,여상/Yeosang,산/San,민기/Mingi,우영/Wooyoung,종호/Jongho','tma22','Ateez');
add('에스파','aespa','카리나/Karina,지젤/Giselle,윈터/Winter,닝닝/Ningning','tma24','Aespa');
add('아이브','IVE','안유진/An Yujin/Yujin,가을/Gaeul,레이/Rei,장원영/Jang Wonyoung/Wonyoung,리즈/Liz,이서/Leeseo','mma22','Ive (group)');
add('르세라핌','LE SSERAFIM','사쿠라/Sakura,김채원/Kim Chaewon/Chaewon,허윤진/Huh Yunjin/Yunjin,카즈하/Kazuha,홍은채/Hong Eunchae/Eunchae,김가람/Kim Garam/Garam','mma22','Le Sserafim');
add('뉴진스','NewJeans','민지/Minji,하니/Hanni,다니엘/Danielle,해린/Haerin,혜인/Hyein','mma22','NewJeans');
add('아이들','i-dle','미연/Miyeon,민니/Minnie,소연/Soyeon,우기/Yuqi,슈화/Shuhua,수진/Soojin','mma18','I-dle',['(G)I-DLE','여자아이들','(여자)아이들','GIDLE']);
add('있지','ITZY','예지/Yeji,리아/Lia,류진/Ryujin,채령/Chaeryeong,유나/Yuna','mma19','Itzy');
add('엔믹스','NMIXX','릴리/Lily,해원/Haewon,설윤/Sullyoon,배이/Bae,지우/Jiwoo,규진/Kyujin,지니/Jinni/Jini','aaa22','Nmixx');
add('스테이씨','STAYC','수민/Sumin,시은/Sieun,아이사/Isa,세은/Seeun,윤/Yoon,재이/J','mma21','STAYC');
add('몬스타엑스','MONSTA X','셔누/Shownu,민혁/Minhyuk,기현/Kihyun,형원/Hyungwon,주헌/Joohoney/Jooheon,아이엠/I.M,원호/Wonho','aaa17','Monsta X');
add('더보이즈','THE BOYZ','상연/Sangyeon,제이콥/Jacob,영훈/Younghoon,현재/Hyunjae,주연/Juyeon,케빈/Kevin,뉴/New,큐/Q,주학년/Ju Haknyeon,선우/Sunwoo,에릭/Eric,활/Hwall','mma18','The Boyz (South Korean band)');
add('트레저','TREASURE','최현석/Choi Hyunsuk,지훈/Jihoon,요시/Yoshi,준규/Junkyu,윤재혁/Yoon Jaehyuk,아사히/Asahi,도영/Doyoung,하루토/Haruto,박정우/Park Jeongwoo,소정환/So Junghwan,마시호/Mashiho,방예담/Bang Yedam','aaa20','Treasure (band)');
add('크래비티','CRAVITY','세림/Serim,앨런/Allen,정모/Jungmo,우빈/Woobin,원진/Wonjin,민희/Minhee,형준/Hyeongjun,태영/Taeyoung,성민/Seongmin','aaa20','Cravity');
add('보이넥스트도어','BOYNEXTDOOR','성호/Sungho,리우/Riwoo,명재현/Myung Jaehyun/Jaehyun,태산/Taesan,이한/Leehan,운학/Woonhak','aaa23','BoyNextDoor',['보넥도']);
add('라이즈','RIIZE','쇼타로/Shotaro,은석/Eunseok,성찬/Sungchan,원빈/Wonbin,소희/Sohee,앤톤/Anton,승한/Seunghan','sma24','Riize');
add('제로베이스원','ZEROBASEONE','김지웅/Kim Jiwoong,장하오/Zhang Hao,성한빈/Sung Hanbin,석매튜/Seok Matthew,김태래/Kim Taerae,리키/Ricky,김규빈/Kim Gyuvin,박건욱/Park Gunwook,한유진/Han Yujin','aaa23','Zerobaseone',['ZB1','제베원']);
add('투어스','TWS','신유/Shinyu,도훈/Dohoon,영재/Youngjae,한진/Hanjin,지훈/Jihoon,경민/Kyungmin','tma24','TWS (group)');
add('엔시티 127','NCT 127','태용/Taeyong,쟈니/Johnny,유타/Yuta,도영/Doyoung,재현/Jaehyun,정우/Jungwoo,마크/Mark,해찬/Haechan,태일/Taeil,윈윈/Winwin','gda21b','NCT 127');
add('엔시티 드림','NCT DREAM','마크/Mark,런쥔/Renjun,제노/Jeno,해찬/Haechan,재민/Jaemin,천러/Chenle,지성/Jisung','tma22','NCT Dream');
add('엔시티 위시','NCT WISH','시온/Sion,리쿠/Riku,유우시/Yushi,재희/Jaehee,료/Ryo,사쿠야/Sakuya','tma24','NCT Wish');
add('웨이션브이','WayV','쿤/Kun,텐/Ten,윈윈/Winwin,샤오쥔/Xiaojun,헨드리/Hendery,양양/Yangyang,루카스/Lucas','aaa24','WayV',['웨이브이']);
add('샤이니','SHINee','온유/Onew,종현/Jonghyun,키/Key,민호/Minho,태민/Taemin','mama20','Shinee');
add('슈퍼주니어','Super Junior','이특/Leeteuk,희철/Heechul,예성/Yesung,신동/Shindong,은혁/Eunhyuk,동해/Donghae,시원/Siwon,려욱/Ryeowook,규현/Kyuhyun,강인/Kangin,성민/Sungmin','aaa17','Super Junior');
add('동방신기','TVXQ!','유노윤호/U-Know/Yunho,최강창민/Max Changmin/Changmin','mama23','TVXQ',['TVXQ','동방신기!']);
add('갓세븐','GOT7','제이비/JAY B/JB,마크/Mark Tuan,잭슨/Jackson Wang,진영/Jinyoung,영재/Youngjae,뱀뱀/BamBam,유겸/Yugyeom','aaa18','Got7');
add('비투비','BTOB','서은광/Seo Eunkwang,이민혁/Lee Minhyuk/HUTA,이창섭/Lee Changsub,임현식/Lim Hyunsik,프니엘/Peniel,육성재/Yook Sungjae,정일훈/Jung Ilhoon','mma18','BtoB (band)');
add('위너','WINNER','강승윤/Kang Seungyoon,김진우/Kim Jinwoo,이승훈/Lee Seunghoon,송민호/Song Mino/Mino','mma17','Winner (band)');
add('아이콘','iKON','김진환/Jay/Kim Jinhwan,송윤형/Song/Song Yunhyeong,바비/Bobby,김동혁/DK/Kim Donghyuk,구준회/Ju-ne/Koo Junhoe,정찬우/Chan/Jung Chanwoo,비아이/B.I/Kim Hanbin','mma18','IKon');
add('워너원','Wanna One','강다니엘/Kang Daniel,박지훈/Park Jihoon,이대휘/Lee Daehwi,김재환/Kim Jaehwan,옹성우/Ong Seongwu,박우진/Park Woojin,라이관린/Lai Kuanlin,윤지성/Yoon Jisung,황민현/Hwang Minhyun,배진영/Bae Jinyoung,하성운/Ha Sungwoon','mma17','Wanna One');
add('뉴이스트','NU’EST','제이알/JR/김종현,아론/Aron,백호/Baekho,민현/Minhyun/황민현,렌/Ren','aaa19',"NU'EST",['NUEST']);
add('뉴이스트 W','NU’EST W','제이알/JR/김종현,아론/Aron,백호/Baekho,렌/Ren','aaa17',"NU'EST W",['NUEST W']);
add('아스트로','ASTRO','엠제이/MJ,진진/Jinjin,차은우/Cha Eunwoo,문빈/Moonbin,라키/Rocky,윤산하/Yoon Sanha','aaa17','Astro (South Korean band)');
add('빅스','VIXX','엔/N/차학연,레오/Leo,켄/Ken,라비/Ravi,홍빈/Hongbin,혁/Hyuk','aaa17','VIXX');
add('펜타곤','PENTAGON','진호/Jinho,후이/Hui,홍석/Hongseok,신원/Shinwon,여원/Yeo One,옌안/Yanan,유토/Yuto,키노/Kino,우석/Wooseok,이던/E’Dawn/DAWN','aaa20','Pentagon (South Korean band)');
add('에이비식스','AB6IX','전웅/Jeon Woong,김동현/Kim Donghyun,박우진/Park Woojin,이대휘/Lee Daehwi,임영민/Lim Youngmin','mma19','AB6IX');
add('원어스','ONEUS','서호/Seoho,이도/Leedo,건희/Keonhee,환웅/Hwanwoong,시온/Xion,레이븐/Ravn','aaa20','Oneus');
add('에스에프나인','SF9','영빈/Youngbin,인성/Inseong,재윤/Jaeyoon,다원/Dawon,주호/Zuho,유태양/Yoo Taeyang,휘영/Hwiyoung,찬희/Chani,로운/Rowoon','aaa18','SF9');
add('카드','KARD','비엠/BM,제이셉/J.Seph,전소민/Jeon Somin,전지우/Jeon Jiwoo','aaa17','Kard (group)');
add('에이핑크','Apink','박초롱/Park Chorong,윤보미/Yoon Bomi,정은지/Jeong Eunji,김남주/Kim Namjoo,오하영/Oh Hayoung,손나은/Son Naeun','mma18','Apink');
add('오마이걸','OH MY GIRL','효정/Hyojung,미미/Mimi,유아/YooA,승희/Seunghee,유빈/Yubin/Binnie/비니,아린/Arin,지호/Jiho,진이/JinE','mma20','Oh My Girl');
add('우주소녀','WJSN','엑시/Exy,설아/Seola,보나/Bona,수빈/Soobin,루다/Luda,다원/Dawon,은서/Eunseo,여름/Yeoreum,다영/Dayoung,연정/Yeonjung,선의/Xuanyi,성소/Cheng Xiao,미기/Meiqi','aaa18','WJSN',['Cosmic Girls']);
add('우주소녀 쪼꼬미','WJSN CHOCOME','수빈/Soobin,루다/Luda,여름/Yeoreum,다영/Dayoung','aaa22','WJSN Chocome');
add('아이즈원','IZ*ONE','권은비/Kwon Eunbi,미야와키 사쿠라/Miyawaki Sakura,강혜원/Kang Hyewon,최예나/Choi Yena,이채연/Lee Chaeyeon,김채원/Kim Chaewon,김민주/Kim Minju,야부키 나코/Yabuki Nako,혼다 히토미/Honda Hitomi,조유리/Jo Yuri,안유진/An Yujin,장원영/Jang Wonyoung','aaa18','Iz*One',['IZONE']);
add('이달의 소녀','LOONA','희진/Heejin,현진/Hyunjin,하슬/Haseul,여진/Yeojin,비비/Vivi,김립/Kim Lip,진솔/Jinsoul,최리/Choerry,이브/Yves,츄/Chuu,고원/Gowon,올리비아 혜/Olivia Hye/Hyeju/혜주','aaa19','Loona');
add('프로미스나인','fromis_9','이새롬/Lee Saerom,송하영/Song Hayoung,박지원/Park Jiwon,노지선/Roh Jisun,이서연/Lee Seoyeon,이채영/Lee Chaeyoung,이나경/Lee Nagyung,백지헌/Baek Jiheon,장규리/Jang Gyuri','aaa18','Fromis 9',['프로미스 나인']);
add('모모랜드','MOMOLAND','혜빈/Hyebin,제인/Jane,나윤/Nayun,주이/JooE,아인/Ahin,낸시/Nancy,연우/Yeonwoo,태하/Taeha,데이지/Daisy','mma18','Momoland');
add('다이아','DIA','유니스/Eunice,기희현/Ki Huihyeon,제니/Jenny,정채연/Jung Chaeyeon,은진/Eunjin,예빈/Yebin,은채/Eunchae,주은/Jueun,솜이/Somyi','aaa17','DIA (group)');
add('구구단','gugudan','미미/Mimi,하나/Hana,해빈/Haebin,나영/Nayoung,세정/Sejeong,소이/Soyee,샐리/Sally,미나/Mina,혜연/Hyeyeon','aaa17','Gugudan');
add('프리스틴','PRISTIN','나영/Nayoung,로아/Roa,유하/Yuha,은우/Eunwoo,레나/Rena,결경/Kyulkyung,예하나/Yehana,성연/Sungyeon,시연/Xiyeon,카일라/Kyla','aaa17','Pristin');
add('에이오에이','AOA','지민/Jimin,초아/Choa,유나/Yuna,혜정/Hyejeong,민아/Mina,설현/Seolhyun,찬미/Chanmi/Dohwa/도화','aaa18','AOA (group)');
add('브브걸','BBGIRLS','민영/Minyoung,유정/Yujeong,은지/Eunji,유나/Yuna,유진/Yoojin,혜란/Hyeran','mma21','Brave Girls',['브레이브걸스','Brave Girls']);
add('드림캐쳐','Dreamcatcher','지유/JiU,수아/SuA,시연/Siyeon,한동/Handong,유현/Yoohyeon,다미/Dami,가현/Gahyun/Gahyeon','aaa23','Dreamcatcher (group)');
add('라필루스','Lapillus','샨티/Chanty,샤나/Shana,유에/Yue,베시/Bessie,서원/Seowon,하은/Haeun','aaa22','Lapillus');
add('라잇썸','LIGHTSUM','상아/Sangah,초원/Chowon,나영/Nayoung,히나/Hina,주현/Juhyeon,유정/Yujeong,휘연/Huiyeon,지안/Jian','aaa22','Lightsum');
add('시크릿넘버','SECRET NUMBER','레아/Léa/Lea,디타/Dita,진희/Jinny,민지/Minji,수담/Soodam,주/Zuu,데니스/Denise','aaa20','Secret Number');
add('템페스트','TEMPEST','한빈/Hanbin,형섭/Hyeongseop,혁/Hyuk,은찬/Eunchan,루/LEW,화랑/Hwarang,태래/Taerae','aaa22','Tempest (South Korean band)');
add('더킹덤','The KingDom','훤/Hwon,자한/Jahan,단/Dann,아서/Arthur,무진/Mujin,루이/Louis,아이반/Ivan,치우/Chiwoo','aaa22','The KingDom',['KINGDOM','킹덤']);
add('티에프엔','TFN','노아/Noa,시안/Sian,케빈/Kevin,건우/Gunwoo,레오/Leo,온/On,제로/Zero,카이리/Kairi,키오/Kio','aaa22','TFN (group)',['T1419']);
add('트렌드지','TRENDZ','하빛/Havit,리온/Leon,윤우/Yoonwoo,한국/Hankook,라엘/ra.L,은일/Eunil,예찬/Yechan','aaa22','Trendz');
add('에이티비오','ATBO','오준석/Oh Junseok,류준민/Ryu Junmin,배현준/Bae Hyunjun,석락원/Seok Rakwon,정승환/Jeong Seunghwan,김연규/Kim Yeonkyu,원빈/Won Bin','mma22','ATBO');
add('싸이커스','xikers','민재/Minjae,준민/Junmin,수민/Sumin,진식/Jinsik,현우/Hyunwoo,정훈/Junghoon,세은/Seeun,유준/Yujun,헌터/Hunter,예찬/Yechan','mama23','Xikers');
add('엔싸인','n.SSign','카즈타/Kazuta,현/Hyeon,에디/Eddie,도하/Doha,준혁/Junhyeok,성윤/Sungyun,로렌스/Laurence,희원/Huiwon,로빈/Robin,한준/Hanjun','tma24','N.SSign');
add('우아','WOOAH','나나/Nana,우연/Wooyeon,소라/Sora,루시/Lucy,민서/Minseo,송이/Songyee','tma24','Wooah',['woo!ah!']);
add('유니스','UNIS','현주/Hyeonju,나나/Nana,젤리당카/Gehlee Dangca,코토코/Kotoko,방윤하/Bang Yunha,엘리시아/Elisia,오윤아/Oh Yoona,임서원/Lim Seowon','tma24','Unis (group)');
add('넥스지','NEXZ','토모야/Tomoya,유우/Yu,하루/Haru,소건/So Geon,세이타/Seita,휴이/Hyui,유키/Yuki','tma24','Nexz');
add('니쥬','NiziU','마코/Mako,리오/Rio,마야/Maya,리쿠/Riku,아야카/Ayaka,마유카/Mayuka,리마/Rima,미이히/Miihi,니나/Nina','aaa22','NiziU');
add('앤팀','&TEAM','케이/K,후마/Fuma,니콜라스/Nicholas,의주/EJ,유마/Yuma,조/Jo,하루아/Harua,타키/Taki,마키/Maki','aaa22','&Team');
add('아일릿','ILLIT','윤아/Yunah,민주/Minju,모카/Moka,원희/Wonhee,이로하/Iroha','mama24','Illit');
add('베이비몬스터','BABYMONSTER','루카/Ruka,파리타/Pharita,아사/Asa,아현/Ahyeon,라미/Rami,로라/Rora,치키타/Chiquita','mama25','Babymonster');
add('미야오','MEOVV','수인/Sooin,가원/Gawon,안나/Anna,나린/Narin,엘라/Ella','mama24','Meovv');
add('키스오브라이프','KISS OF LIFE','쥴리/Julie,나띠/Natty,벨/Belle,하늘/Haneul','tma24','Kiss of Life (group)',['키오프']);
add('키키','KiiiKiii','지유/Jiyu,이솔/Leesol,수이/Sui,하음/Haum,키야/Kya','sma25','KiiiKiii');
add('하츠투하츠','Hearts2Hearts','카르멘/Carmen,지우/Jiwoo,유하/Yuha,스텔라/Stella,주은/Juun,에이나/A-na/Ana,이안/Ian,예온/Ye-on/Yeon','sma25','Hearts2Hearts');
add('올데이 프로젝트','ALLDAY PROJECT','애니/Annie,타잔/Tarzzan,베일리/Bailey,우찬/Woochan,영서/Youngseo','mama25','Allday Project');
add('코르티스','CORTIS','마틴/Martin,제임스/James,주훈/Juhoon,성현/Seonghyeon,건호/Keonho','mama25','Cortis');
add('이즈나','izna','마이/Mai,방지민/Bang Jeemin,윤지윤/Yoon Jiyoon,코코/Koko,유사랑/Ryu Sarang,최정은/Choi Jungeun,정세비/Jeong Saebi','mama24','Izna');
add('플레이브','PLAVE','예준/Yejun,노아/Noah,밤비/Bamby,은호/Eunho,하민/Hamin','mama24','Plave');
add('큐더블유이알','QWER','쵸단/Chodan,마젠타/Magenta,히나/Hina,시연/Siyeon','aaa24','QWER',['큐WER','큐떱']);
add('데이식스','DAY6','성진/Sungjin,영케이/Young K,원필/Wonpil,도운/Dowoon,제이/Jae','aaa24','Day6');
add('엑스디너리 히어로즈','Xdinary Heroes','건일/Gunil,정수/Jungsu,가온/Gaon,오드/O.de,준한/Jun Han,주연/Jooyeon','sma24','Xdinary Heroes',['엑디즈']);
add('엔플라잉','N.Flying','이승협/Lee Seunghyub,차훈/Cha Hun,김재현/Kim Jaehyun,유회승/Yoo Hweseung,서동성/Seo Dongsung,권광진/Kwon Kwangjin','mma19','N.Flying');
add('잔나비','JANNABI','최정훈/Choi Junghoon,김도형/Kim Dohyung,장경준/Jang Kyungjoon,윤결/Yoon Kyul,유영현/Yoo Younghyun','mma19','Jannabi (band)');
add('멜로망스','MeloMance','김민석/Kim Minseok,정동환/Jeong Donghwan','mma17','MeloMance');
add('볼빨간사춘기','BOL4','안지영/Ahn Jiyoung,우지윤/Woo Jiyoon','mma17','Bolbbalgan4',['Bolbbalgan4']);
add('악뮤','AKMU','이찬혁/Lee Chanhyuk,이수현/Lee Suhyun','aaa23','AKMU',['악동뮤지션','Akdong Musician']);
add('다이나믹듀오','Dynamic Duo','개코/Gaeko,최자/Choiza','mama23','Dynamic Duo (South Korean duo)');
add('포레스텔라','Forestella','배두훈/Bae Doohoon,강형호/Kang Hyungho,조민규/Cho Mingyu,고우림/Ko Woorim','mama23','Forestella');
add('라포엠','LA POEM','유채훈/You Chaehoon,최성훈/Choi Sunghoon,정민성/Jeong Minseong,박기훈/Park Kihoon','gda21b','La Poem');
add('노을','Noel','강균성/Kang Kyunsung,전우성/Jeon Woosung,이상곤/Lee Sanggon,나성호/Na Sungho','gda21','Noel (band)');
add('고막소년단','GOMAK BOYS','폴킴/Paul Kim,김민석/Kim Minseok,정승환/Jung Seunghwan,하현상/Ha Hyunsang,빅나티/BIG Naughty','mma22','Gomak Boys');
add('엠에스지 워너비 M.O.M','MSG Wannabe M.O.M','지석진/Jee Seokjin/별루지,케이씨엠/KCM/강창모,박재정/Parc Jaejung,원슈타인/Wonstein','mma21','MSG Wannabe');
add('어반자카파','Urban Zakapa','권순일/Kwon Sunil,조현아/Jo Hyunah,박용인/Park Yongin','gda17','Urban Zakapa');
add('씨엔블루','CNBLUE','정용화/Jung Yonghwa,강민혁/Kang Minhyuk,이정신/Lee Jungshin,이종현/Lee Jonghyun','gda17','CNBLUE');
add('씨스타','SISTAR','효린/Hyolyn,보라/Bora,소유/Soyou,다솜/Dasom','gda17','Sistar');
add('젝스키스','SECHSKIES','은지원/Eun Jiwon,이재진/Lee Jaijin,김재덕/Kim Jaeduck,강성훈/Kang Sunghoon,장수원/Jang Suwon','gda17','Sechs Kies');
add('제이비제이','JBJ','노태현/Roh Taehyun,켄타/Kenta,김상균/Kim Sanggyun,김용국/Jin Longguo,권현빈/Kwon Hyunbin,김동한/Kim Donghan','mma17','JBJ (band)');
add('스누퍼','SNUPER','태웅/Taewoong,수현/Suhyun,상일/Sangil,우성/Woosung,상호/Sangho,세빈/Sebin','aaa17','Snuper');
add('디크런치','D-CRUNCH','현욱/Hyunwook,현호/Hyunho,오브이/O.V,현오/Hyunoh,현수/Hyunsoo,민혁/Minhyuk,찬영/Chanyoung,정승/Jungseung,딜란/Dylan','aaa18','D-Crunch');
add('디케이지','DKZ','경윤/Kyoungyoon,문익/Munik,재찬/Jaechan,종형/Jonghyeong,원대/Wondae,세현/Sehyeon,민규/Mingyu,기석/Giseok','aaa19','DKZ',['동키즈','DONGKIZ']);
add('휘브','WHIB','김준민/Kim Junmin,하승/Haseung,진범/Jinbeom,제이더/Jayder,이정/Ijeong,유건/Yoogeon,이인/Lee In,원준/Wonjun','aaa23','Whib');
add('세이마이네임','SAY MY NAME','히토미/Hitomi,메이/Mei,카니/Kanny,소하/Soha,도희/Dohee,준휘/Junhwi,승주/Seungjoo,슈이/Shui','sma25','Say My Name (group)');
add('피프티 피프티','FIFTY FIFTY','키나/Keena,문샤넬/Chanelle Moon,예원/Yewon,하나/Hana,아테나/Athena,새나/Saena,시오/Sio,아란/Aran','sma25','Fifty Fifty (group)');
add('리센느','RESCENE','원이/Woni,리브/Liv,미나미/Minami,메이/May,제나/Zena','tma26','Rescene');
add('킥플립','KickFlip','계훈/Kyehoon,아마루/Amaru,동화/Donghwa,주왕/Juwang,민제/Minje,케이주/Keiju,동현/Donghyeon','sma25','KickFlip');
add('웨이브 투 어스','wave to earth','김다니엘/Kim Daniel,신동규/Shin Donggyu,차순종/Cha Soonjong/John Cha','sma25','Wave to Earth');
add('알파드라이브원','ALPHA DRIVE ONE','상원/Sangwon/이상원,안신/Anxin/저우안신,신롱/Xinlong/허신롱,건우/Geonwoo/김건우,아르노/Arno/장지아하오,Zhang Jiahao/Zhang Jiahao,레오/Leo/이리오,상현/Sanghyeon/정상현,준서/Junseo/김준서','mama25','Alpha Drive One',['ALD1']);
add('트리플에스','tripleS','윤서연/Yoon Seoyeon,정혜린/Jeong Hyerin,이지우/Lee Jiwoo,김채연/Kim Chaeyeon,김유연/Kim Yooyeon,김수민/Kim Soomin,김나경/Kim Nakyoung,공유빈/Gong Yubin,카에데/Kaede,서다현/Seo Dahyun,코토네/Kotone,곽연지/Kwak Yeonji,니엔/Nien,박소현/Park Sohyun,신위/Xinyu,마유/Mayu,린/Lynn,주빈/Joobin,정하연/Jeong Hayeon,박시온/Park Shion,김채원/Kim Chaewon,설린/Sullin,서아/Seoah,지연/Jiyeon','tma26','TripleS');
add('제이오원','JO1','요나시로 쇼/Sho Yonashiro,카와시리 렌/Ren Kawashiri,시로이와 루키/Ruki Shiroiwa,코노 준키/Junki Kono,사토 케이고/Keigo Sato,카와니시 타쿠미/Takumi Kawanishi,키마타 쇼야/Syoya Kimata,오히라 쇼세이/Shosei Ohira,킨조 스카이/Sukai Kinjo,츠루보 시온/Shion Tsurubo,마메하라 잇세이/Issei Mamehara','mama23','JO1');
add('아이엔아이','INI','니시 히로토/Hiroto Nishi,키무라 마사야/Masaya Kimura,쉬 펑판/Xu Fengfan,타지마 쇼고/Shogo Tajima,타카츠카 히로무/Hiromu Takatsuka,고토 타케루/Takeru Goto,오자키 타쿠미/Takumi Ozaki,후지마키 쿄스케/Kyosuke Fujimaki,사노 유다이/Yudai Sano,이케자키 리히토/Rihito Ikezaki,마츠다 진/Jin Matsuda','mama23','INI (Japanese boy band)');
add('부석순','BSS','승관/Seungkwan,도겸/DK,호시/Hoshi','aaa23','BSS (band)');
add('저스트비','JUST B','임지민/Lim Jimin,이건우/Lee Geonu,배인/Bain,제이엠/JM,전도염/Jeon Doyum/DY,김상우/Kim Sangwoo','mama23','Just B');
add('엘즈업','EL7Z UP','케이/Kei,예은/Yeeun,여름/Yeoreum,휘서/Hwiseo,나나/Nana,유키/Yuki,연희/Yeonhee','mama23','El7z Up');
add('더뉴식스','THE NEW SIX','최태훈/Choi Taehun,장현수/Jang Hyunsoo,천준혁/Cheon Junhyeok,은휘/Eun Hwi,오성준/Oh Sungjun,우경준/Woo Kyungjun','tma22','The New Six',['TNX']);
add('카라','KARA','박규리/Park Gyuri,한승연/Han Seungyeon,정니콜/Nicole Jung,구하라/Goo Hara,강지영/Kang Jiyoung,허영지/Heo Youngji','mama23','Kara (South Korean group)');
add('자우림','JAURIM','김윤아/Kim Yuna,이선규/Lee Sunkyu,김진만/Kim Jinman,구태훈/Goo Taehun','mama23','Jaurim');
add('실리카겔','Silica Gel','김한주/Kim Hanju,김춘추/Kim Chunchu,김건재/Kim Geonjay,최웅희/Choi Woonghee','mama23','Silica Gel (band)');
add('캣츠아이','KATSEYE','소피아/Sophia,마농/Manon,다니엘라/Daniela,라라/Lara,메간/Megan,윤채/Yoonchae','mama24','Katseye');
const solo=`아이유/IU|현아/HyunA|홍진영/Hong Jinyoung|김영철/Kim Youngchul|청하/CHUNG HA|헤이즈/Heize|강다니엘/Kang Daniel|기리보이/Giriboy|임영웅/Lim Youngwoong|영탁/Youngtak|이무진/Lee Mujin|비오/BE'O|십센치/10CM|빅나티/BIG Naughty|알렉사/AleXa|김재중/Kim Jaejoong|딘딘/DinDin|이영지/Lee Youngji|애쉬아일랜드/ASH ISLAND|권은비/Kwon Eunbi|폴블랑코/Paul Blanco|비비/BIBI|박진영/J.Y. Park|싸이/PSY|황치열/Hwang Chiyeul|김호중/Kim Hojoong|이찬원/Lee Chanwon|최예나/YENA|태연/Taeyeon|크러쉬/Crush|거미/Gummy|지코/ZICO|이하이/Lee Hi|엄정화/Uhm Junghwa|가인/Gain|수지/Suzy|임창정/Lim Changjung|정인/Jung In|화사/Hwasa|송민호/MINO|제니/JENNIE|제시/Jessi|이승기/Lee Seunggi|비/RAIN|로이킴/Roy Kim|선미/Sunmi|세븐/SE7EN|비와이/BewhY|창모/CHANGMO|마미손/Mommy Son|나플라/nafla|팔로알토/Paloalto|스윙스/Swings|더콰이엇/The Quiett|타이거제이케이/Tiger JK|윤미래/Yoon Mirae|코드쿤스트/CODE KUNST|사이먼도미닉/Simon Dominic|송가인/Song Gain|박재범/Jay Park|보아/BoA|이승윤/Lee Seungyoon|산다라박/Sandara Park|황가람/Hwang Garam|한로로/HANRORO|우즈/WOODZ|지드래곤/G-DRAGON|유주/YUJU|영케이/Young K|뱀뱀/BamBam|영재/Youngjae|마크투안/Mark Tuan|로제/ROSÉ|태민/TAEMIN|제이홉/j-hope|효린/HYOLYN|유아/YooA`;
const soloEvents={mma17:'아이유,현아,홍진영,김영철',mma19:'청하,헤이즈,강다니엘,기리보이',mma20:'임영웅,영탁,코드쿤스트,사이먼도미닉,유아',mma21:'이무진',mma22:'비오,십센치,빅나티',aaa22:'알렉사',aaa23:'김재중,딘딘,이영지,애쉬아일랜드,권은비,폴블랑코',aaa24:'비비',gda17:'태연,크러쉬,거미,지코,이하이,엄정화,가인,수지',gda19:'임창정,정인,화사,송민호,제니',gda21:'제시,이승기',gda21b:'비,박진영',mama18:'로이킴,선미,비와이,창모,마미손,나플라,팔로알토,스윙스,더콰이엇,타이거제이케이,윤미래',aaa18:'세븐',aaa20:'송가인',tma22:'싸이,황치열,김호중',tma26:'최예나',sma24:'산다라박,유주,영케이,뱀뱀,영재,마크투안',sma25:'황가람',sma26:'한로로,이찬원',mama24:'지드래곤,로제',mama20:'보아,태민'};
for(const r of solo.split('|')){const[name,english]=r.split('/');const e=Object.entries(soloEvents).find(([,n])=>n.split(',').includes(name));add(name,english,'',e?.[0]||'mama25');}
// Individually evidenced additions where the ceremony differs from the broad groups above.
const customSources={우즈:'https://v.daum.net/v/13fztLQ91W',박재범:'https://v.daum.net/v/13fztLQ91W',이승윤:'https://v.daum.net/v/20230120065323041',제이홉:'https://cjenm.com/en/news/2022-mama-awards-the-worlds-no1-kpop-awards-announces-second-round-of-performing-artists/',효린:'https://cjenm.com/en/news/2022-mama-awards-the-worlds-no1-kpop-awards-announces-second-round-of-performing-artists/'};
for(const r of rows)if(customSources[r.name])r.sources=[customSources[r.name]];
// Correct ALD1 romanisation alias without making it a second member.
const ald=rows.find(r=>r.english==='ALPHA DRIVE ONE');ald.members=ald.members.filter(m=>m.name!=='Zhang Jiahao');ald.members.find(m=>m.name==='아르노').aliases.push('Zhang Jiahao');
ald.members.find(m=>m.english==='Leo').name='리오';
const whib=rows.find(r=>r.english==='WHIB');whib.members='김준민/Kim Junmin/제이더/Jayder,하승/Haseung,진범/Jinbeom,유건/Yoogeon,이정/Ijeong,재하/Jaeha,인홍/Inhong,원준/Wonjun'.split(',').map(s=>{const[name,english,...aliases]=s.split('/');return{name,english,aliases}});whib.sources.push('https://www.melon.com/artist/detail.htm?artistId=3613486');
rows.find(r=>r.english==='SAY MY NAME').members.find(m=>m.name==='슈이').english='Shuie';
rows.find(r=>r.english==='SAY MY NAME').sources.push('https://weverse.io/saymyname/notice/28467');
rows.find(r=>r.english==='SHINee').sources[0]='https://www.soompi.com/article/1629654wpp/watch-performances-from-melon-music-awards-2023';
rows.find(r=>r.english==='Silica Gel').sources[0]='https://www.soompi.com/article/1629654wpp/watch-performances-from-melon-music-awards-2023';
rows.find(r=>r.english==='Forestella').sources[0]='https://www.youtube.com/watch?v=r6l-3SwPu6Q';
for(const name of ['KARA','JAURIM'])rows.find(r=>r.english===name).sources[0]='https://www.soompi.com/article/1556562wpp/watch-performances-from-2022-mama-awards-day-1';
rows.find(r=>r.english==='EL7Z UP').sources[0]='https://event.tving.com/ST000001/en/news/2023-mama-awards-announces-the-second-set-of-performers/';
fs.writeFileSync(new URL('./research-awards.json',import.meta.url),JSON.stringify(rows,null,2)+'\n');
console.log(rows.length+' acts; '+rows.reduce((n,r)=>n+r.members.length,0)+' member links');
