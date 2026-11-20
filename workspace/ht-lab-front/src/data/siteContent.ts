export type Locale = "zh" | "en";

type LocalizedText = Record<Locale, string>;

export type Stat = {
  value: string;
  label: LocalizedText;
};

export type ShowcaseProject = {
  title: LocalizedText;
  description: LocalizedText;
  category: LocalizedText;
  year: string;
  accent: string;
  metrics: Stat[];
  tags: string[];
};

export type PresentationWork = {
  title: LocalizedText;
  description: LocalizedText;
  category: LocalizedText;
  pages: number;
  palette: string;
  date: string;
  pdfUrl: string;
};

export type AiCapability = {
  title: LocalizedText;
  description: LocalizedText;
  signal: string;
};

export type GrowthEntry = {
  title: LocalizedText;
  description: LocalizedText;
  date: string;
  type: LocalizedText;
  skill: string;
};

export type BabyMilestone = {
  age: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  date: LocalizedText;
  accent: string;
};

export type BabyMoment = {
  title: LocalizedText;
  description: LocalizedText;
  note: LocalizedText;
  color: string;
};

export type BabyFavorite = {
  label: LocalizedText;
  value: LocalizedText;
};

export type TravelCity = {
  name: LocalizedText;
  coordinates: [longitude: number, latitude: number];
};

export type TravelDestination = {
  code: "CN" | "ES" | "PT" | "MY" | "RU";
  numericCode: string;
  country: LocalizedText;
  region: LocalizedText;
  coordinates: [longitude: number, latitude: number];
  cities: TravelCity[];
  summary: LocalizedText;
  memories: LocalizedText[];
  accent: string;
  visual: string;
};

export type AlpineItineraryStep = {
  time: string;
  title: LocalizedText;
  detail: LocalizedText;
};

export type AlpineItineraryDay = {
  day: number;
  date: string;
  weekday: LocalizedText;
  base: LocalizedText;
  route: LocalizedText;
  transport: LocalizedText;
  transportMode: "flight" | "rail" | "bus" | "cable" | "walk";
  focus: LocalizedText;
  placeIntro: LocalizedText;
  steps: AlpineItineraryStep[];
  reserve: LocalizedText;
  fallback: LocalizedText;
  alert?: LocalizedText;
  routeProgress: number;
};

export const homeHighlights = [
  {
    value: "06",
    label: { zh: "独立展区", en: "Focused zones" },
  },
  {
    value: "28+",
    label: { zh: "作品与记录", en: "Works and logs" },
  },
  {
    value: "2",
    label: { zh: "创作身份", en: "Creative roles" },
  },
] satisfies Stat[];

export const visitedCountryCodes = ["156", "724", "620", "458", "643"] as const;

export const travelStats = [
  { value: "05", label: { zh: "抵达国家", en: "Countries reached" } },
  { value: "15", label: { zh: "城市与岛屿", en: "Cities and islands" } },
  { value: "02", label: { zh: "跨越大洲", en: "Continents crossed" } },
  { value: "∞", label: { zh: "下一段旅程", en: "Journeys ahead" } },
] satisfies Stat[];

export const travelDestinations: TravelDestination[] = [
  {
    code: "CN",
    numericCode: "156",
    country: { zh: "中国", en: "China" },
    region: { zh: "故土漫游", en: "Journeys at home" },
    coordinates: [104, 35],
    cities: [
      { name: { zh: "西安", en: "Xi'an" }, coordinates: [108.94, 34.34] },
      { name: { zh: "武汉", en: "Wuhan" }, coordinates: [114.3, 30.59] },
      { name: { zh: "北京", en: "Beijing" }, coordinates: [116.4, 39.9] },
      { name: { zh: "天津", en: "Tianjin" }, coordinates: [117.2, 39.12] },
      { name: { zh: "安徽马鞍山", en: "Ma'anshan" }, coordinates: [118.5, 31.7] },
      { name: { zh: "安徽安庆", en: "Anqing" }, coordinates: [117.06, 30.52] },
      { name: { zh: "安徽枞阳", en: "Zongyang" }, coordinates: [117.21, 30.7] },
    ],
    summary: {
      zh: "从古都城墙到江城长江，从北方皇城到皖江故土，国内旅行是一条不断回望来处的长线。",
      en: "From ancient city walls and the Yangtze to northern capitals and Anhui roots, these journeys keep tracing the long way home.",
    },
    memories: [
      { zh: "西安城墙与盛唐余韵", en: "Xi'an walls and echoes of the Tang dynasty" },
      { zh: "武汉江风、北京胡同与天津街巷", en: "River wind in Wuhan, Beijing hutongs, and Tianjin streets" },
      { zh: "马鞍山、安庆与枞阳的皖江记忆", en: "Anhui memories across Ma'anshan, Anqing, and Zongyang" },
    ],
    accent: "#f6c453",
    visual: "travel-visual-china",
  },
  {
    code: "ES",
    numericCode: "724",
    country: { zh: "西班牙", en: "Spain" },
    region: { zh: "伊比利亚热浪", en: "Iberian heat" },
    coordinates: [-3.7, 40.2],
    cities: [
      { name: { zh: "巴塞罗那", en: "Barcelona" }, coordinates: [2.17, 41.38] },
      { name: { zh: "龙达", en: "Ronda" }, coordinates: [-5.17, 36.74] },
      { name: { zh: "马德里", en: "Madrid" }, coordinates: [-3.7, 40.42] },
      { name: { zh: "塞维利亚", en: "Seville" }, coordinates: [-5.98, 37.39] },
    ],
    summary: {
      zh: "高迪曲线、龙达悬崖、马德里夜色与塞维利亚的鼓点，让这段旅程始终带着炽热节拍。",
      en: "Gaudi's curves, Ronda's cliffs, Madrid nights, and Seville rhythms gave this route an unmistakable pulse.",
    },
    memories: [
      { zh: "在巴塞罗那追着建筑的曲线走", en: "Following architectural curves through Barcelona" },
      { zh: "看过弗拉明戈与斗牛文化现场", en: "Experiencing flamenco and Spain's bullfighting tradition" },
      { zh: "从龙达悬崖一路向塞维利亚", en: "From Ronda's gorge toward Seville" },
    ],
    accent: "#ff6b3d",
    visual: "travel-visual-spain",
  },
  {
    code: "PT",
    numericCode: "620",
    country: { zh: "葡萄牙", en: "Portugal" },
    region: { zh: "大西洋之光", en: "Atlantic light" },
    coordinates: [-8, 39.6],
    cities: [{ name: { zh: "里斯本", en: "Lisbon" }, coordinates: [-9.14, 38.72] }],
    summary: {
      zh: "里斯本的坡道、电车、蓝白瓷砖与大西洋光线，组成一段明亮又带旧时光的停留。",
      en: "Lisbon's hills, trams, azulejos, and Atlantic light made a bright pause touched by another era.",
    },
    memories: [
      { zh: "沿七丘之城缓慢上行", en: "Climbing slowly through the city of seven hills" },
      { zh: "在电车声里遇见大西洋落日", en: "Meeting an Atlantic sunset between tram bells" },
    ],
    accent: "#3cc9a7",
    visual: "travel-visual-portugal",
  },
  {
    code: "MY",
    numericCode: "458",
    country: { zh: "马来西亚", en: "Malaysia" },
    region: { zh: "赤道蓝境", en: "Equatorial blue" },
    coordinates: [102, 4.2],
    cities: [{ name: { zh: "热浪岛", en: "Redang Island" }, coordinates: [103, 5.78] }],
    summary: {
      zh: "热浪岛把旅程切换成纯粹的蓝：海风、白沙、珊瑚与不赶时间的岛屿日落。",
      en: "Redang turned the journey into pure blue: sea wind, white sand, coral, and island sunsets with nowhere to rush.",
    },
    memories: [
      { zh: "从清澈海水望向珊瑚浅滩", en: "Looking across clear water toward coral shallows" },
      { zh: "把时间交给白沙与晚霞", en: "Giving the clock to white sand and dusk" },
    ],
    accent: "#31b8d7",
    visual: "travel-visual-malaysia",
  },
  {
    code: "RU",
    numericCode: "643",
    country: { zh: "俄罗斯", en: "Russia" },
    region: { zh: "北境纪行", en: "Northern passage" },
    coordinates: [60, 60],
    cities: [
      { name: { zh: "莫斯科", en: "Moscow" }, coordinates: [37.62, 55.76] },
      { name: { zh: "周边城市", en: "A nearby city" }, coordinates: [40.4, 56.1] },
    ],
    summary: {
      zh: "从莫斯科的宏大轴线走到周边城市，在辽阔北境里留下建筑、寒风与饮食的强烈记忆。",
      en: "From Moscow's monumental avenues to a nearby city, the northern route left vivid memories of architecture, cold air, and food.",
    },
    memories: [
      { zh: "穿行莫斯科广场、宫殿与地铁", en: "Crossing Moscow's squares, palaces, and metro halls" },
      { zh: "在周边城市尝过一次少见的熊掌菜肴", en: "Tasting a rare bear-paw dish in a nearby city" },
    ],
    accent: "#9fb8d8",
    visual: "travel-visual-russia",
  },
];

export const alps2027Itinerary: AlpineItineraryDay[] = [
  {
    day: 1,
    date: "06.05",
    weekday: { zh: "周六", en: "Sat" },
    base: { zh: "维也纳", en: "Vienna" },
    route: { zh: "北京 -> 维也纳", en: "Beijing -> Vienna" },
    transport: { zh: "国际航班 + S7 / Railjet 入城", en: "International flight + S7 / Railjet into town" },
    transportMode: "flight",
    focus: { zh: "只做抵达，不透支第一晚。", en: "Arrive well; do not spend the first night." },
    placeIntro: { zh: "维也纳是一座适合慢慢进入的城市：环城大道、咖啡馆与帝国建筑都在步行尺度里展开。", en: "Vienna rewards a slow entry: its Ringstrasse, coffeehouses, and imperial architecture unfold at walking pace." },
    steps: [
      { time: "AM", title: { zh: "北京起飞", en: "Depart Beijing" }, detail: { zh: "优先直飞或一次中转、行李直挂的组合。", en: "Prioritize a direct or one-stop itinerary with checked bags through-tagged." } },
      { time: "PM", title: { zh: "机场入城与入住", en: "Airport transfer and check-in" }, detail: { zh: "落地后先看实时接驳，再选 S7、Railjet 或三人出租车。", en: "Check live connections before choosing S7, Railjet, or a taxi for three." } },
      { time: "NIGHT", title: { zh: "老城短步行", en: "Short old-town walk" }, detail: { zh: "史蒂芬大教堂外观、Graben 和一顿已订晚餐即可。", en: "St. Stephen's exterior, Graben, and one booked dinner are enough." } },
    ],
    reserve: { zh: "首晚餐厅预订；酒店必须允许晚到。", en: "Book dinner; make sure the hotel accepts late arrival." },
    fallback: { zh: "航班晚点就取消散步，只留酒店附近晚餐。", en: "If delayed, drop the walk and eat near the hotel." },
    routeProgress: 6,
  },
  {
    day: 2,
    date: "06.06",
    weekday: { zh: "周日", en: "Sun" },
    base: { zh: "维也纳", en: "Vienna" },
    route: { zh: "美泉宫 -> 内城", en: "Schonbrunn -> Innere Stadt" },
    transport: { zh: "U4 + 内城步行", en: "U4 + inner-city walking" },
    transportMode: "walk",
    focus: { zh: "一座宫殿，半天内城，留出晚间余量。", en: "One palace, half a day in the center, room for the evening." },
    placeIntro: { zh: "美泉宫看的是哈布斯堡的生活尺度；内城则把教堂、咖啡文化和十九世纪城市肌理收在一起。", en: "Schonbrunn reveals the Habsburg scale of life, while the inner city layers churches, coffee culture, and nineteenth-century urban fabric." },
    steps: [
      { time: "08:30", title: { zh: "美泉宫预约入场", en: "Timed Schonbrunn entry" }, detail: { zh: "宫殿 90 分钟，花园与凯旋门外景 90 分钟。", en: "Allow 90 minutes for the palace and 90 for gardens and Gloriette exterior." } },
      { time: "13:30", title: { zh: "内城主线", en: "Inner-city spine" }, detail: { zh: "霍夫堡外观、圣史蒂芬、圣彼得、Graben 和咖啡馆。", en: "Hofburg exterior, St. Stephen's, St. Peter's, Graben, and a coffeehouse." } },
      { time: "EVENING", title: { zh: "只加一个夜间项目", en: "One evening add-on only" }, detail: { zh: "音乐会、摩天轮或新酒酒馆三选一。", en: "Choose one: concert, Ferris wheel, or heuriger." } },
    ],
    reserve: { zh: "美泉宫时间票；若想看 Ankeruhr，必须改到正午。", en: "Schonbrunn timed ticket; Ankeruhr must be moved to noon." },
    fallback: { zh: "下雨时将花园时间换为一家博物馆，不叠加两个宫殿内部。", en: "In rain, swap gardens for one museum; do not stack two palace interiors." },
    alert: { zh: "原计划 16:30 看 Ankeruhr 不成立，整点人偶演出在 12:00。", en: "The original 16:30 Ankeruhr stop does not work; the full figure display is at noon." },
    routeProgress: 8,
  },
  {
    day: 3,
    date: "06.07",
    weekday: { zh: "周一", en: "Mon" },
    base: { zh: "萨尔茨堡", en: "Salzburg" },
    route: { zh: "维也纳 -> 萨尔茨堡", en: "Vienna -> Salzburg" },
    transport: { zh: "Railjet / ÖBB 城际列车", en: "Railjet / OBB intercity rail" },
    transportMode: "rail",
    focus: { zh: "把抵达日当成老城预告片。", en: "Treat the transfer day as an old-town preview." },
    placeIntro: { zh: "萨尔茨堡不是只有莫扎特：一边是巴洛克老城与城堡，另一边是萨尔察赫河外的花园与山景。", en: "Salzburg is more than Mozart: baroque lanes and fortress on one side, gardens and mountain views across the Salzach on the other." },
    steps: [
      { time: "MORNING", title: { zh: "退房上车", en: "Check out and board" }, detail: { zh: "提前锁定座位，酒店选择火车站或老城之间的可步行位置。", en: "Reserve seats early and stay walkable to the station or old town." } },
      { time: "AFTERNOON", title: { zh: "米拉贝尔 -> 老城", en: "Mirabell -> Old Town" }, detail: { zh: "寄存行李后走米拉贝尔花园、Getreidegasse 与河岸。", en: "Drop bags, then Mirabell Gardens, Getreidegasse, and the riverbank." } },
      { time: "LATE", title: { zh: "要塞或一间莫扎特馆", en: "Fortress or one Mozart museum" }, detail: { zh: "两间莫扎特馆与要塞不能都按深度游节奏完成。", en: "Do not attempt both Mozart museums and the fortress in depth." } },
    ],
    reserve: { zh: "城际车座；要塞若要入内则留足 2 小时。", en: "Rail seats; allow two hours if entering the fortress." },
    fallback: { zh: "车晚点时保留河岸与晚餐，把要塞挪到次日傍晚。", en: "With a delay, keep river and dinner, moving the fortress to the next evening." },
    routeProgress: 20,
  },
  {
    day: 4,
    date: "06.08",
    weekday: { zh: "周二", en: "Tue" },
    base: { zh: "萨尔茨堡", en: "Salzburg" },
    route: { zh: "萨尔茨堡 -> 国王湖 -> Salet / Obersee", en: "Salzburg -> Konigssee -> Salet / Obersee" },
    transport: { zh: "840 巴士 + 国王湖游船", en: "Bus 840 + Konigssee boat" },
    transportMode: "bus",
    focus: { zh: "早船去 Salet，把湖与 Obersee 当作全天主角。", en: "Take an early boat to Salet; make the lake and Obersee the day's headline." },
    placeIntro: { zh: "国王湖的核心不是打卡教堂，而是被群山压缩到极窄的翡翠湖面，以及 Salet 后方的 Obersee。", en: "Konigssee is not just a church stop: it is a narrow emerald lake compressed by mountains, with Obersee beyond Salet." },
    steps: [
      { time: "EARLY", title: { zh: "最早一档跨境巴士", en: "Earliest cross-border bus" }, detail: { zh: "在前一晚确认 840 时刻、票种和末班回程。", en: "Confirm line 840, fare, and final return the night before." } },
      { time: "MIDDAY", title: { zh: "St. Bartholoma -> Salet", en: "St. Bartholoma -> Salet" }, detail: { zh: "船票买到 Salet，步行至 Obersee 后原路回船。", en: "Buy through to Salet; walk to Obersee, then return on the same route." } },
      { time: "EVENING", title: { zh: "回萨尔茨堡", en: "Return to Salzburg" }, detail: { zh: "不再追加鹰巢、盐矿或魔法森林。", en: "Do not add Eagle's Nest, a salt mine, or the magic forest." } },
    ],
    reserve: { zh: "游船首班、末班与 Salet 登船规则；护照随身。", en: "First/last boat, Salet boarding rules, and keep passports with you." },
    fallback: { zh: "低云或雨天改为萨尔茨堡要塞和博物馆日。", en: "In low cloud or rain, make this a Salzburg fortress and museum day." },
    alert: { zh: "湖区徒步已经是满日，附加项目只会把返程风险推高。", en: "The lake hike fills the day; add-ons create an avoidable return risk." },
    routeProgress: 23,
  },
  {
    day: 5,
    date: "06.09",
    weekday: { zh: "周三", en: "Wed" },
    base: { zh: "Bad Ischl", en: "Bad Ischl" },
    route: { zh: "萨尔茨堡 -> Bad Ischl -> Hallstatt", en: "Salzburg -> Bad Ischl -> Hallstatt" },
    transport: { zh: "湖区巴士 / 火车，Bad Ischl 双夜中转", en: "Lake-district bus / rail, two nights based in Bad Ischl" },
    transportMode: "rail",
    focus: { zh: "修正湖区逻辑：先寄行李，再专门给 Hallstatt 一个半日。", en: "Fix the lake-district logic: drop bags first, then give Hallstatt its own half-day." },
    placeIntro: { zh: "Hallstatt 最动人的是湖与山贴得极近的地形，不需要把每个收费观景项目都塞进去。", en: "Hallstatt's power comes from its lake-and-mountain geography; it does not need every paid viewpoint crammed in." },
    steps: [
      { time: "MORNING", title: { zh: "迁移到 Bad Ischl", en: "Move to Bad Ischl" }, detail: { zh: "改住 Bad Ischl 两晚，避免在 St. Wolfgang 与 Hallstatt 之间拖行李折返。", en: "Stay two nights in Bad Ischl to avoid hauling bags between St. Wolfgang and Hallstatt." } },
      { time: "AFTERNOON", title: { zh: "Hallstatt 慢走", en: "Hallstatt at a humane pace" }, detail: { zh: "老城、湖边与观景点，保留回程缓冲。", en: "Old town, lake edge, and viewpoints with a protected return buffer." } },
      { time: "EVENING", title: { zh: "回 Bad Ischl", en: "Return to Bad Ischl" }, detail: { zh: "把温泉小镇作为翌日登山的安静落脚点。", en: "Use the spa town as a calm base before the mountain day." } },
    ],
    reserve: { zh: "Bad Ischl 两晚住宿；出发前用 OOVV / Scotty 重查湖区时刻。", en: "Two Bad Ischl nights; recheck lake-district connections in OOVV / Scotty before departure." },
    fallback: { zh: "雨天照常去 Hallstatt，但缩短步行并把观景台取消。", en: "Hallstatt still works in rain: shorten the walk and skip the viewpoint." },
    alert: { zh: "原计划 St. Wolfgang 午后再往返 Hallstatt，公共交通时间明显不足。", en: "The original afternoon St. Wolfgang-Hallstatt return is not viable by public transport." },
    routeProgress: 34,
  },
  {
    day: 6,
    date: "06.10",
    weekday: { zh: "周四", en: "Thu" },
    base: { zh: "Bad Ischl", en: "Bad Ischl" },
    route: { zh: "Bad Ischl -> St. Wolfgang -> 沙夫山", en: "Bad Ischl -> St. Wolfgang -> Schafberg" },
    transport: { zh: "546 巴士 + Schafbergbahn 登山铁路", en: "Bus 546 + Schafbergbahn cog railway" },
    transportMode: "cable",
    focus: { zh: "把沙夫山放到天气窗口，用早班车上山。", en: "Use the weather window for Schafberg and take an early train uphill." },
    placeIntro: { zh: "沙夫山是沃尔夫冈湖区的制高点，登山铁路本身就是体验的一半，山顶视野才是另一半。", en: "Schafberg is the Wolfgangsee high point: the cog railway is half the experience and the summit panorama is the other half." },
    steps: [
      { time: "EARLY", title: { zh: "Bad Ischl -> St. Wolfgang", en: "Bad Ischl -> St. Wolfgang" }, detail: { zh: "早发车到登山铁路站，留出排队和取票时间。", en: "Take an early service and leave time for queues and ticket collection." } },
      { time: "MORNING", title: { zh: "沙夫山往返", en: "Schafberg return trip" }, detail: { zh: "山顶拍摄、短步行与午餐，避免塞入长距离徒步。", en: "Photos, a short walk, and lunch at the top; do not add a long hike." } },
      { time: "AFTERNOON", title: { zh: "St. Wolfgang 湖畔", en: "St. Wolfgang lakeside" }, detail: { zh: "下山后留给湖边、咖啡和小镇，而非再赶一座城市。", en: "Leave the descent for the lake, coffee, and village rather than another destination." } },
    ],
    reserve: { zh: "登山铁路往返及指定班次；天气决定日需保留改签空间。", en: "Cog-rail return and train time; keep rebooking room for weather." },
    fallback: { zh: "能见度差时改 St. Wolfgang 湖游或 Bad Ischl 室内日。", en: "With poor visibility, switch to a Wolfgangsee boat ride or an indoor Bad Ischl day." },
    routeProgress: 40,
  },
  {
    day: 7,
    date: "06.11",
    weekday: { zh: "周五", en: "Fri" },
    base: { zh: "因斯布鲁克", en: "Innsbruck" },
    route: { zh: "Bad Ischl -> 萨尔茨堡 -> 因斯布鲁克", en: "Bad Ischl -> Salzburg -> Innsbruck" },
    transport: { zh: "区域交通 + ÖBB 城际列车", en: "Regional transfer + OBB intercity rail" },
    transportMode: "rail",
    focus: { zh: "早走早到，把傍晚留给因斯布鲁克老城。", en: "Leave early, arrive early, and keep the evening for Innsbruck's old town." },
    placeIntro: { zh: "因斯布鲁克的妙处在于城市很紧凑，但雪山几乎从每条街的尽头出现。", en: "Innsbruck is compact, yet mountains seem to appear at the end of every street." },
    steps: [
      { time: "08:00", title: { zh: "离开湖区", en: "Leave the lake district" }, detail: { zh: "将换乘预留至少 25 分钟，不压最后一班区域交通。", en: "Keep at least 25 minutes for the connection; do not rely on the final regional service." } },
      { time: "MIDDAY", title: { zh: "抵达因斯布鲁克", en: "Arrive in Innsbruck" }, detail: { zh: "入住后先补给和休息，避免把换城日写成景点冲刺。", en: "Check in, resupply, and rest instead of turning a transfer day into a sprint." } },
      { time: "EVENING", title: { zh: "黄金屋顶与河岸", en: "Golden Roof and riverbank" }, detail: { zh: "老城、玛利亚特蕾西亚大街和晚餐即可。", en: "Old town, Maria-Theresien-Strasse, and dinner are enough." } },
    ],
    reserve: { zh: "Bad Ischl -> Salzburg 接驳与 Salzburg -> Innsbruck 座位。", en: "Bad Ischl-Salzburg connection and Salzburg-Innsbruck seats." },
    fallback: { zh: "如到达偏晚，老城移到 D8 缆车下山后。", en: "If arriving late, move old town to after the D8 descent." },
    routeProgress: 52,
  },
  {
    day: 8,
    date: "06.12",
    weekday: { zh: "周六", en: "Sat" },
    base: { zh: "因斯布鲁克", en: "Innsbruck" },
    route: { zh: "Nordkette -> 老城 / 一处附加景点", en: "Nordkette -> Old Town / one add-on" },
    transport: { zh: "Hungerburgbahn + Nordkette 缆车", en: "Hungerburgbahn + Nordkette cable cars" },
    transportMode: "cable",
    focus: { zh: "北山半日之后，只选择一处附加景点。", en: "After Nordkette, select just one supplementary sight." },
    placeIntro: { zh: "Nordkette 把阿尔卑斯山脊直接接到城市电车上，是少见的城市与高山同框体验。", en: "Nordkette puts an Alpine ridgeline directly on the city tram network, a rare city-to-mountain experience." },
    steps: [
      { time: "MORNING", title: { zh: "Nordkette 上山", en: "Ride Nordkette" }, detail: { zh: "首班优先，把清晰山景留给上午。", en: "Prioritize an early lift for the clearest mountain views." } },
      { time: "AFTERNOON", title: { zh: "老城与一选一", en: "Old Town and one choice" }, detail: { zh: "Ambras 城堡、Bergisel 跳台或高山动物园三选一。", en: "Choose one: Ambras Castle, Bergisel, or Alpine Zoo." } },
      { time: "EVENING", title: { zh: "预备日余量", en: "Keep a weather buffer" }, detail: { zh: "北山若因云层取消，可与下午项目对调。", en: "If cloud cancels Nordkette, swap it with the afternoon choice." } },
    ],
    reserve: { zh: "Nordkette 时刻、天气和 Welcome Card 折扣资格。", en: "Nordkette timetable, weather, and Welcome Card discount eligibility." },
    fallback: { zh: "全天阴雨时做 Ambras + 老城，北山移至 D7 傍晚或放弃。", en: "In all-day rain, do Ambras plus old town; move Nordkette to D7 evening or skip it." },
    alert: { zh: "Nordkette 再叠两处景点会让体验变成赶场。", en: "Nordkette plus two extra sights turns the day into a race." },
    routeProgress: 55,
  },
  {
    day: 9,
    date: "06.13",
    weekday: { zh: "周日", en: "Sun" },
    base: { zh: "博尔扎诺", en: "Bolzano" },
    route: { zh: "因斯布鲁克 -> 博尔扎诺", en: "Innsbruck -> Bolzano" },
    transport: { zh: "跨境 EC / Railjet", en: "Cross-border EC / Railjet" },
    transportMode: "rail",
    focus: { zh: "进意大利的换挡日：厄兹与老城。", en: "A change-of-country day: Otzi and the old town." },
    placeIntro: { zh: "博尔扎诺是德奥意边界感最鲜明的城市之一：意式广场、德语招牌与多洛米蒂的入口共存。", en: "Bolzano is one of Europe's clearest borderland cities, where Italian piazzas, German signs, and the Dolomites gateway coexist." },
    steps: [
      { time: "MORNING", title: { zh: "跨越布伦纳", en: "Cross the Brenner" }, detail: { zh: "选直达或最少换乘班次，保留边境段的延误余量。", en: "Choose direct or minimum-change trains and leave delay buffer for the border leg." } },
      { time: "AFTERNOON", title: { zh: "南蒂罗尔考古博物馆", en: "South Tyrol Museum of Archaeology" }, detail: { zh: "厄兹作为唯一硬预约景点，先锁时段。", en: "Otzi is the day's one hard reservation; lock its timed entry first." } },
      { time: "EVENING", title: { zh: "Walther 广场与拱廊", en: "Walther Square and arcades" }, detail: { zh: "早点吃晚餐，Ritten 缆车只在到得足够早时才追加。", en: "Dine early; add the Ritten cable car only with an early arrival." } },
    ],
    reserve: { zh: "跨境列车座位、厄兹博物馆时段。", en: "Cross-border rail seats and Otzi museum slot." },
    fallback: { zh: "火车晚点则直接放弃 Ritten，只做博物馆与老城。", en: "With a late train, skip Ritten and keep museum plus old town." },
    routeProgress: 66,
  },
  {
    day: 10,
    date: "06.14",
    weekday: { zh: "周一", en: "Mon" },
    base: { zh: "博尔扎诺", en: "Bolzano" },
    route: { zh: "博尔扎诺 -> 卡雷扎湖", en: "Bolzano -> Lago di Carezza" },
    transport: { zh: "180 巴士 / 现场实时查询", en: "Bus 180 / live timetable check" },
    transportMode: "bus",
    focus: { zh: "给旅程一个低强度恢复日。", en: "Give the itinerary a low-intensity recovery day." },
    placeIntro: { zh: "卡雷扎湖很小，却因为拉特马尔山与针叶林的倒影而格外上镜；它值得的是慢走，不是赶场。", en: "Lago di Carezza is small but exceptionally photogenic for its Latemar reflection and pines; it rewards a slow walk, not a rush." },
    steps: [
      { time: "MORNING", title: { zh: "卡雷扎湖往返", en: "Lago di Carezza return" }, detail: { zh: "湖边环线与短步行，带一件防风层。", en: "Walk the lake circuit and a short trail; carry a wind layer." } },
      { time: "AFTERNOON", title: { zh: "回博尔扎诺", en: "Return to Bolzano" }, detail: { zh: "只在 Runkelstein 或 Renon 中选一处。", en: "Choose either Runkelstein or Renon, never both." } },
      { time: "EVENING", title: { zh: "整理多洛米蒂装备", en: "Prepare Dolomites kit" }, detail: { zh: "补水、零食、雨具和次日行李拆分。", en: "Restock water, snacks, rainwear, and split the next day's luggage." } },
    ],
    reserve: { zh: "当季 180 线路及施工改线公告。", en: "Seasonal line 180 and any works/diversion notices." },
    fallback: { zh: "雨雾时改 Runkelstein、厄兹补看或博尔扎诺咖啡馆。", en: "In rain or fog, do Runkelstein, more Otzi time, or Bolzano cafes." },
    routeProgress: 69,
  },
  {
    day: 11,
    date: "06.15",
    weekday: { zh: "周二", en: "Tue" },
    base: { zh: "奥蒂塞伊", en: "Ortisei" },
    route: { zh: "博尔扎诺 -> 奥蒂塞伊", en: "Bolzano -> Ortisei" },
    transport: { zh: "350 巴士，按当季时刻执行", en: "Bus 350, subject to seasonal timetable" },
    transportMode: "bus",
    focus: { zh: "进山日只做安顿与村镇熟悉。", en: "The mountain-arrival day is for settling in and learning the village." },
    placeIntro: { zh: "奥蒂塞伊是 Val Gardena 的舒适基站：木雕传统、步行街与三条上山线路都在小镇尺度里。", en: "Ortisei is Val Gardena's comfortable base, where woodcarving, the pedestrian street, and three mountain routes fit within a village scale." },
    steps: [
      { time: "MORNING", title: { zh: "350 线进 Val Gardena", en: "Take line 350 into Val Gardena" }, detail: { zh: "车程与停靠受季节和交通影响，预留 90 分钟级别。", en: "Traffic and seasonal stops vary, so plan at the 90-minute scale." } },
      { time: "AFTERNOON", title: { zh: "入住与取 Guest Pass", en: "Check in and collect Guest Pass" }, detail: { zh: "先让酒店书面确认 Guest Pass 的发放与公交覆盖范围。", en: "Get written confirmation from the hotel about Guest Pass issue and bus coverage." } },
      { time: "EVENING", title: { zh: "奥蒂塞伊村镇勘察", en: "Scout Ortisei" }, detail: { zh: "确认两座缆车入口、超市、早餐与次日集合点。", en: "Locate both lift bases, supermarket, breakfast, and next-day meeting point." } },
    ],
    reserve: { zh: "酒店、350 当季时刻、Guest Pass 资格。", en: "Hotel, current line 350 timetable, and Guest Pass eligibility." },
    fallback: { zh: "大雨不影响迁移，抵达后只做村镇室内与装备整理。", en: "Rain does not affect the transfer; keep the arrival afternoon indoors." },
    routeProgress: 78,
  },
  {
    day: 12,
    date: "06.16",
    weekday: { zh: "周三", en: "Wed" },
    base: { zh: "奥蒂塞伊", en: "Ortisei" },
    route: { zh: "奥蒂塞伊 -> Seceda", en: "Ortisei -> Seceda" },
    transport: { zh: "Ortisei - Furnes - Seceda 缆车", en: "Ortisei - Furnes - Seceda lifts" },
    transportMode: "cable",
    focus: { zh: "刀锋山是唯一主任务，早上山、早取景。", en: "Seceda is the single mission: ascend early, photograph early." },
    placeIntro: { zh: "Seceda 的标志是向北坠落的草坡与锯齿状山脊，真正的价值在于光线、云层和停留时间。", en: "Seceda is defined by plunging north-facing grass slopes and serrated ridges; its real value is light, cloud, and time on the ridge." },
    steps: [
      { time: "OPEN", title: { zh: "预约时段上山", en: "Ride at the reserved time" }, detail: { zh: "以 2027 官网的预约规则为准，早班优先。", en: "Follow the 2027 reservation rules; choose an early departure." } },
      { time: "MORNING", title: { zh: "Seceda 山脊", en: "Seceda ridgeline" }, detail: { zh: "先去主视角，再依体力走短线，不为多点位牺牲返程。", en: "Get the main viewpoint first, then take short walks as energy permits." } },
      { time: "AFTERNOON", title: { zh: "回村补给", en: "Return and recharge" }, detail: { zh: "留出处理天气、洗衣与照片备份的余量。", en: "Keep buffer for weather changes, laundry, and photo backup." } },
    ],
    reserve: { zh: "Seceda 指定时段；票与天气规则以 2027 公告为准。", en: "Seceda timed access; 2027 ticket and weather rules control." },
    fallback: { zh: "低云时不硬上，换 D13，今天改村镇与咖啡馆。", en: "Do not force it in low cloud; swap with D13 and keep today in town." },
    routeProgress: 82,
  },
  {
    day: 13,
    date: "06.17",
    weekday: { zh: "周四", en: "Thu" },
    base: { zh: "奥蒂塞伊", en: "Ortisei" },
    route: { zh: "奥蒂塞伊 -> Alpe di Siusi", en: "Ortisei -> Alpe di Siusi" },
    transport: { zh: "Alpe di Siusi 缆车 + 草甸步行", en: "Alpe di Siusi lift + meadow walking" },
    transportMode: "cable",
    focus: { zh: "草甸与休斯只做一日完整体验，Rasciesa 是可选而非必做。", en: "Give Alpe di Siusi a complete day; Rasciesa is optional, not mandatory." },
    placeIntro: { zh: "休斯草甸不是一个观景台，而是一整片可以慢走、看山屋与牧场层层展开的高原。", en: "Alpe di Siusi is not a single viewpoint but a high plateau for unhurried walking among huts, meadows, and layered peaks." },
    steps: [
      { time: "MORNING", title: { zh: "缆车上草甸", en: "Lift to the meadow" }, detail: { zh: "先确认高山道路限行和缆车当日运行。", en: "Confirm alpine road restrictions and lift operation for the day." } },
      { time: "MIDDAY", title: { zh: "草甸慢走与午餐", en: "Meadow walk and lunch" }, detail: { zh: "用短环线和山屋午餐代替赶路。", en: "Use a short loop and a mountain-hut lunch rather than distance chasing." } },
      { time: "LATE", title: { zh: "返回奥蒂塞伊", en: "Return to Ortisei" }, detail: { zh: "只有在早回、体力良好时才把 Rasciesa 当日落加项。", en: "Only add Rasciesa at sunset with an early return and strong energy." } },
    ],
    reserve: { zh: "Gardena Card 与单买票必须按 2027 价格重新比价。", en: "Recompare Gardena Card and single rides using 2027 prices." },
    fallback: { zh: "若 D12 天气更好，和 Seceda 对调；连续坏天气则只保留一座山。", en: "Swap with Seceda if D12 weather is better; with persistent weather, keep only one mountain." },
    alert: { zh: "Seceda + Alpe di Siusi + Rasciesa 的通票计算原稿口径不一致，不能按原数直接下单。", en: "The original Seceda, Alpe di Siusi, and Rasciesa pass math is inconsistent and should not be booked as written." },
    routeProgress: 85,
  },
  {
    day: 14,
    date: "06.18",
    weekday: { zh: "周五", en: "Fri" },
    base: { zh: "米兰", en: "Milan" },
    route: { zh: "奥蒂塞伊 -> 博尔扎诺 -> 米兰", en: "Ortisei -> Bolzano -> Milan" },
    transport: { zh: "350 巴士 + Trenitalia / Italo", en: "Bus 350 + Trenitalia / Italo" },
    transportMode: "rail",
    focus: { zh: "转场日不赌 14:00 教堂，抵达后先寄行李。", en: "Do not gamble on a 14:00 Duomo; drop bags first." },
    placeIntro: { zh: "米兰是这趟山岳旅程的收束：大教堂的垂直密度、Brera 的街区感与 Navigli 的夜生活完全不同。", en: "Milan closes the mountain journey with a new rhythm: Duomo's vertical intensity, Brera's streets, and Navigli nights are distinctly different." },
    steps: [
      { time: "EARLY", title: { zh: "离开山谷", en: "Leave the valley" }, detail: { zh: "用早班 350 接博尔扎诺火车，保留巴士堵车余量。", en: "Take an early 350 into Bolzano and keep bus-traffic buffer." } },
      { time: "AFTERNOON", title: { zh: "米兰入住与大教堂", en: "Milan arrival and Duomo" }, detail: { zh: "优先订 15:30 后的大教堂时段，别让换乘决定门票。", en: "Book the Duomo after 15:30 so connections do not control the ticket." } },
      { time: "EVENING", title: { zh: "Brera 或 Navigli", en: "Brera or Navigli" }, detail: { zh: "选一个街区深走，用地铁连接，避免大范围徒步。", en: "Choose one neighborhood and use the metro; avoid a long cross-city walk." } },
    ],
    reserve: { zh: "350 接驳、博尔扎诺 -> 米兰座位、Duomo 15:30 后时段。", en: "Line 350, Bolzano-Milan rail seats, and a post-15:30 Duomo slot." },
    fallback: { zh: "若延误，把大教堂换到外观夜景，屋顶留给下次。", en: "If delayed, keep the Duomo exterior at night and save the rooftop for another trip." },
    alert: { zh: "原稿 14:00 大教堂与山谷转场几乎没有任何容错。", en: "The original 14:00 Duomo booking leaves almost no tolerance after the mountain transfer." },
    routeProgress: 96,
  },
  {
    day: 15,
    date: "06.19",
    weekday: { zh: "周六", en: "Sat" },
    base: { zh: "返程", en: "Return" },
    route: { zh: "米兰 -> 北京", en: "Milan -> Beijing" },
    transport: { zh: "机场快线 / 火车 + 国际航班", en: "Airport express / rail + international flight" },
    transportMode: "flight",
    focus: { zh: "航班时间决定上午，不反过来。", en: "Let the flight time decide the morning, never the reverse." },
    placeIntro: { zh: "最后一天的任务只有一个：把一趟跨越两国的旅程平稳收束，而不是再塞一次打卡。", en: "The final day has one job: close a two-country journey smoothly, not squeeze in one more sight." },
    steps: [
      { time: "MORNING", title: { zh: "退房与最后补给", en: "Check out and final supplies" }, detail: { zh: "仅在傍晚航班时安排购物；早航班直接出发。", en: "Shop only with an evening flight; leave directly for earlier departures." } },
      { time: "T-3H", title: { zh: "前往正确机场", en: "Go to the correct airport" }, detail: { zh: "先确认 MXP、LIN 或 BGY，再按各自接驳和托运截止倒推。", en: "Confirm MXP, LIN, or BGY first, then back-plan from its transfer and bag cutoff." } },
      { time: "FLIGHT", title: { zh: "返程", en: "Fly home" }, detail: { zh: "保存离线票据、退税单和旅行照片的两份备份。", en: "Keep offline tickets, tax-refund forms, and two photo backups." } },
    ],
    reserve: { zh: "航班、机场接驳与退税预留时间。", en: "Flight, airport transfer, and time for tax refund." },
    fallback: { zh: "中午前起飞时，不安排任何市区购物。", en: "With a flight before noon, schedule no city shopping." },
    routeProgress: 100,
  },
];

export const babyStats = [
  { value: "12", label: { zh: "成长里程碑", en: "Tiny milestones" } },
  { value: "4", label: { zh: "家庭相册", en: "Memory cards" } },
  { value: "8", label: { zh: "喜欢清单", en: "Favorite notes" } },
  { value: "∞", label: { zh: "每天惊喜", en: "Daily surprises" } },
] satisfies Stat[];

export const babyMilestones: BabyMilestone[] = [
  {
    age: { zh: "第 1 月", en: "Month 1" },
    title: { zh: "第一次认真看世界", en: "First curious gaze" },
    description: {
      zh: "眼神开始追着爸爸妈妈移动，家里的每盏灯都像新的星星。",
      en: "Eyes start following mom and dad, and every light at home feels like a new star.",
    },
    date: { zh: "2026.01", en: "2026.01" },
    accent: "#f9738a",
  },
  {
    age: { zh: "第 3 月", en: "Month 3" },
    title: { zh: "会笑出声音", en: "Laughing out loud" },
    description: {
      zh: "被逗笑时会把小手举起来，整个房间都会变得很亮。",
      en: "A tiny laugh, little hands in the air, and the whole room gets brighter.",
    },
    date: { zh: "2026.03", en: "2026.03" },
    accent: "#f59e0b",
  },
  {
    age: { zh: "第 6 月", en: "Month 6" },
    title: { zh: "翻身和探索", en: "Rolling into discovery" },
    description: {
      zh: "从小毯子的一角滚到另一角，正式开启自己的探索地图。",
      en: "Rolling from one corner of the mat to the other, opening a tiny map of discovery.",
    },
    date: { zh: "2026.06", en: "2026.06" },
    accent: "#10b981",
  },
  {
    age: { zh: "未来", en: "Next" },
    title: { zh: "第一句小小的话", en: "First tiny words" },
    description: {
      zh: "留给未来的空白格，等某一天被一句奶声奶气的话填满。",
      en: "A blank space for the future, waiting to be filled by the first soft little word.",
    },
    date: { zh: "待更新", en: "soon" },
    accent: "#38bdf8",
  },
];

export const babyMoments: BabyMoment[] = [
  {
    title: { zh: "晨光小床", en: "Morning crib light" },
    description: {
      zh: "醒来以后先观察窗帘，再慢慢把笑容递给这个家。",
      en: "Wakes up by studying the curtains first, then slowly gives the room a smile.",
    },
    note: { zh: "适合放宝宝晨起照片", en: "Place a morning photo here" },
    color: "from-rose-200 via-orange-100 to-amber-100",
  },
  {
    title: { zh: "小脚印档案", en: "Little footprint file" },
    description: {
      zh: "把身高、体重、脚印和每一次新技能都收进柔软的成长抽屉。",
      en: "Keeps height, weight, footprints, and every new skill in one soft growth drawer.",
    },
    note: { zh: "记录成长数据", en: "Growth data slot" },
    color: "from-emerald-100 via-teal-100 to-sky-100",
  },
  {
    title: { zh: "睡前宇宙", en: "Bedtime universe" },
    description: {
      zh: "小夜灯、故事声和慢慢安静下来的呼吸，组成每天最温柔的结尾。",
      en: "Night light, story voices, and softer breathing make the gentlest end to each day.",
    },
    note: { zh: "晚安故事角", en: "Bedtime story corner" },
    color: "from-indigo-100 via-violet-100 to-rose-100",
  },
  {
    title: { zh: "一家三口", en: "Family frame" },
    description: {
      zh: "HT Lab 不只记录作品，也记录让作品有意义的生活本身。",
      en: "HT Lab records not only the work, but the life that makes the work meaningful.",
    },
    note: { zh: "家庭合照占位", en: "Family portrait slot" },
    color: "from-yellow-100 via-lime-100 to-green-100",
  },
];

export const babyFavorites: BabyFavorite[] = [
  { label: { zh: "最爱声音", en: "Favorite sound" }, value: { zh: "妈妈的哼唱", en: "Mom humming" } },
  { label: { zh: "最爱颜色", en: "Favorite color" }, value: { zh: "奶油黄", en: "Butter yellow" } },
  { label: { zh: "最爱游戏", en: "Favorite game" }, value: { zh: "躲猫猫", en: "Peekaboo" } },
  { label: { zh: "最爱时间", en: "Favorite time" }, value: { zh: "睡前抱抱", en: "Bedtime hug" } },
];

export const devProjects: ShowcaseProject[] = [
  {
    title: { zh: "AstraOps 企业运营中台", en: "AstraOps Operations Hub" },
    description: {
      zh: "面向多门店业务的运营中台，覆盖权限、审批、数据看板、移动端巡检和低代码表单。",
      en: "An enterprise operations hub for multi-branch teams with permissions, approvals, dashboards, inspections, and low-code forms.",
    },
    category: { zh: "B 端系统", en: "B2B System" },
    year: "2026",
    accent: "#58a6ff",
    metrics: [
      { value: "42", label: { zh: "业务模块", en: "Modules" } },
      { value: "11", label: { zh: "角色权限", en: "Roles" } },
    ],
    tags: ["Next.js", "Spring Boot", "MySQL", "RBAC"],
  },
  {
    title: { zh: "Mica 小程序增长套件", en: "Mica Mini Program Suite" },
    description: {
      zh: "为本地生活业务设计的微信小程序套件，包含会员、活动、核销、订单和素材投放。",
      en: "A WeChat mini program suite for local commerce covering members, campaigns, redemption, orders, and content distribution.",
    },
    category: { zh: "小程序套件", en: "Mini Program" },
    year: "2025",
    accent: "#3fb950",
    metrics: [
      { value: "6", label: { zh: "核心流程", en: "Flows" } },
      { value: "18K", label: { zh: "模拟用户", en: "Mock users" } },
    ],
    tags: ["Vue", "UniApp", "WeChat", "API"],
  },
  {
    title: { zh: "PulseAI 内部效率助手", en: "PulseAI Workflow Assistant" },
    description: {
      zh: "基于 Dify 工作流的内部助手，串联知识库、日报摘要、需求拆分和客服问答。",
      en: "A Dify-based internal assistant connecting knowledge retrieval, daily summaries, requirement breakdowns, and support Q&A.",
    },
    category: { zh: "AI 工具", en: "AI Tool" },
    year: "2026",
    accent: "#bc8cff",
    metrics: [
      { value: "8", label: { zh: "工作流", en: "Workflows" } },
      { value: "3.2s", label: { zh: "响应模拟", en: "Mock latency" } },
    ],
    tags: ["Dify", "RAG", "Prompt", "Node.js"],
  },
];

export const designWorks: PresentationWork[] = [
  {
    title: { zh: "星云科技品牌视觉提案", en: "Nebula Tech Brand Proposal" },
    description: {
      zh: "从品牌定位、视觉符号、色彩系统到应用场景的一整套科技品牌提案。",
      en: "A full technology brand proposal from positioning and visual symbols to color systems and applications.",
    },
    category: { zh: "品牌设计", en: "Brand Design" },
    pages: 24,
    palette: "from-indigo-500 via-violet-500 to-fuchsia-400",
    date: "2026.03",
    pdfUrl: "/design-pdfs/nebula-tech-brand-proposal.pdf",
  },
  {
    title: { zh: "年度营销复盘报告", en: "Annual Marketing Review" },
    description: {
      zh: "用清晰信息层级和数据视觉化，帮助客户讲清年度增长、渠道和下一步策略。",
      en: "A data-led annual review that clarifies growth, channels, market signals, and next-step strategy.",
    },
    category: { zh: "商业提案", en: "Business Pitch" },
    pages: 18,
    palette: "from-rose-500 via-orange-400 to-amber-300",
    date: "2026.01",
    pdfUrl: "/design-pdfs/annual-marketing-review.pdf",
  },
  {
    title: { zh: "春日快闪活动策划", en: "Spring Pop-up Campaign" },
    description: {
      zh: "面向年轻用户的活动策划案，包含视觉概念、动线、社媒扩散和预算结构。",
      en: "A youth-focused campaign deck covering visual concepts, flow, social amplification, and budget structure.",
    },
    category: { zh: "活动策划", en: "Campaign" },
    pages: 32,
    palette: "from-cyan-500 via-sky-400 to-emerald-300",
    date: "2025.12",
    pdfUrl: "/design-pdfs/spring-pop-up-campaign.pdf",
  },
  {
    title: { zh: "教育产品发布课件", en: "Learning Product Launch Deck" },
    description: {
      zh: "为在线教育产品设计的发布课件，突出课程体系、用户路径和增长模型。",
      en: "A launch deck for an education product, focused on curriculum systems, user paths, and growth loops.",
    },
    category: { zh: "教育培训", en: "Education" },
    pages: 26,
    palette: "from-emerald-500 via-teal-400 to-lime-300",
    date: "2025.11",
    pdfUrl: "/design-pdfs/learning-product-launch-deck.pdf",
  },
  {
    title: { zh: "城市咖啡品牌招商书", en: "Urban Coffee Franchise Pitch" },
    description: {
      zh: "兼顾商业测算和品牌气质的招商型 PPT，用于线下门店扩张沟通。",
      en: "A franchise pitch that balances business projections with brand atmosphere for retail expansion.",
    },
    category: { zh: "商业提案", en: "Business Pitch" },
    pages: 20,
    palette: "from-stone-700 via-amber-700 to-orange-400",
    date: "2025.10",
    pdfUrl: "/design-pdfs/urban-coffee-franchise-pitch.pdf",
  },
  {
    title: { zh: "新品发布视觉故事线", en: "Product Launch Storyline" },
    description: {
      zh: "以电影分镜方式组织新品发布内容，让卖点、场景和传播节奏更清晰。",
      en: "A cinematic product-launch storyline that clarifies value points, scenarios, and campaign rhythm.",
    },
    category: { zh: "创意方案", en: "Creative" },
    pages: 30,
    palette: "from-slate-900 via-blue-600 to-cyan-300",
    date: "2025.09",
    pdfUrl: "/design-pdfs/product-launch-storyline.pdf",
  },
];

export const aiCapabilities: AiCapability[] = [
  {
    title: { zh: "知识库问答", en: "Knowledge Q&A" },
    description: {
      zh: "把项目资料、技术笔记和服务说明整理成可检索知识库。",
      en: "Turns project notes, technical docs, and service material into a searchable knowledge base.",
    },
    signal: "RAG",
  },
  {
    title: { zh: "工作流编排", en: "Workflow Orchestration" },
    description: {
      zh: "用 Dify 串联分类、检索、生成、审核等节点，适合重复性业务流程。",
      en: "Composes classification, retrieval, generation, and review nodes for repeatable workflows.",
    },
    signal: "Dify",
  },
  {
    title: { zh: "Prompt 设计", en: "Prompt Design" },
    description: {
      zh: "沉淀角色、约束、输出格式和示例，让 AI 输出更稳定。",
      en: "Defines roles, constraints, output formats, and examples for more stable AI outputs.",
    },
    signal: "Prompt",
  },
  {
    title: { zh: "API 接入", en: "API Integration" },
    description: {
      zh: "预留后端代理和鉴权路径，后续可接真实 Dify 应用。",
      en: "Prepares the proxy and auth path for future production Dify app integration.",
    },
    signal: "API",
  },
];

export const growthEntries: GrowthEntry[] = [
  {
    title: { zh: "Next.js App Router 深入理解", en: "Understanding Next.js App Router" },
    description: {
      zh: "梳理 Server Components、路由布局、loading/error 边界和 next-intl 接入方式。",
      en: "Notes on Server Components, route layouts, loading/error boundaries, and next-intl integration.",
    },
    date: "2026.03.27",
    type: { zh: "笔记", en: "Note" },
    skill: "React",
  },
  {
    title: { zh: "Dify 从知识库到工作流", en: "Dify from Knowledge Base to Workflow" },
    description: {
      zh: "记录从知识库配置、提示词调试到工作流节点拆分的完整实验路径。",
      en: "Tracks experiments from knowledge setup and prompt tuning to workflow node design.",
    },
    date: "2026.03.18",
    type: { zh: "详细", en: "Deep Dive" },
    skill: "AI",
  },
  {
    title: { zh: "B 端权限模型复盘", en: "B2B Permission Model Review" },
    description: {
      zh: "复盘菜单、按钮、数据范围、组织架构和审计日志之间的边界。",
      en: "Reviews boundaries between menus, actions, data scopes, organizations, and audit logs.",
    },
    date: "2026.02.21",
    type: { zh: "笔记", en: "Note" },
    skill: "Backend",
  },
  {
    title: { zh: "PPT 作品陈列灵感库", en: "Presentation Gallery Inspiration" },
    description: {
      zh: "收藏画廊、封面网格、在线翻页和作品详情页的信息架构灵感。",
      en: "A collection of gallery, cover grid, page viewer, and work detail layout references.",
    },
    date: "2026.01.30",
    type: { zh: "外链", en: "Link" },
    skill: "Design",
  },
  {
    title: { zh: "Tailwind v4 主题变量实践", en: "Tailwind v4 Theme Token Practice" },
    description: {
      zh: "整理 CSS variables、组件级样式和页面局部主题之间的边界。",
      en: "Organizes boundaries between CSS variables, component utilities, and page-level themes.",
    },
    date: "2026.02.08",
    type: { zh: "详细", en: "Deep Dive" },
    skill: "CSS",
  },
  {
    title: { zh: "设计作品集信息架构", en: "Portfolio Information Architecture" },
    description: {
      zh: "比较 Behance、Pitch 和独立站作品页，拆解封面、分类、详情和联系入口。",
      en: "Compares Behance, Pitch, and independent portfolio pages across covers, categories, details, and contact paths.",
    },
    date: "2026.01.16",
    type: { zh: "外链", en: "Link" },
    skill: "Design",
  },
];

export const devStats = [
  { value: "3", label: { zh: "精选项目", en: "Featured projects" } },
  { value: "4", label: { zh: "技术方向", en: "Tech tracks" } },
  { value: "68", label: { zh: "活动节点", en: "Activity nodes" } },
  { value: "12", label: { zh: "复用模块", en: "Reusable modules" } },
] satisfies Stat[];

export const designStats = [
  { value: "6", label: { zh: "精选作品", en: "Selected works" } },
  { value: "4", label: { zh: "作品分类", en: "Categories" } },
  { value: "150+", label: { zh: "页面设计", en: "Slides designed" } },
  { value: "2.4K", label: { zh: "模拟浏览", en: "Mock views" } },
] satisfies Stat[];

export const aiStats = [
  { value: "4", label: { zh: "AI 能力", en: "Capabilities" } },
  { value: "7", label: { zh: "实验节点", en: "Experiment nodes" } },
  { value: "3.2s", label: { zh: "模拟响应", en: "Mock response" } },
  { value: "Dify", label: { zh: "工作流平台", en: "Workflow base" } },
] satisfies Stat[];

export const growthStats = [
  { value: "6", label: { zh: "成长记录", en: "Growth records" } },
  { value: "2", label: { zh: "月份分组", en: "Month groups" } },
  { value: "3", label: { zh: "卡片类型", en: "Card types" } },
  { value: "12", label: { zh: "技能标签", en: "Skill tags" } },
] satisfies Stat[];

export const techTracks = [
  {
    title: { zh: "前端系统", en: "Frontend Systems" },
    items: ["Next.js", "React", "Vue", "TypeScript", "Tailwind"],
  },
  {
    title: { zh: "后端与数据", en: "Backend & Data" },
    items: ["Spring Boot", "MySQL", "REST API", "RBAC", "Audit"],
  },
  {
    title: { zh: "AI 工作流", en: "AI Workflow" },
    items: ["Dify", "RAG", "Prompt", "Agent", "Knowledge Base"],
  },
  {
    title: { zh: "交付运维", en: "Delivery" },
    items: ["Vercel", "Aliyun", "Docker", "CI", "Monitoring"],
  },
];

export const localized = (value: LocalizedText, locale: Locale) => value[locale] ?? value.zh;
