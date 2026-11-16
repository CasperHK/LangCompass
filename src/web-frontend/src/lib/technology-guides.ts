export type DatabaseNeed =
  | "交易與應用資料"
  | "內嵌與本機"
  | "快取與即時資料"
  | "分析與報表"
  | "雲端託管";

export interface DatabaseProfile {
  slug: string;
  name: string;
  model: string;
  hosting: string;
  summary: string;
  bestFor: string;
  needs: DatabaseNeed[];
  strengths: string[];
  considerations: string[];
}

export const databaseNeeds: DatabaseNeed[] = [
  "交易與應用資料",
  "內嵌與本機",
  "快取與即時資料",
  "分析與報表",
  "雲端託管",
];

export const databases: DatabaseProfile[] = [
  {
    slug: "postgresql",
    name: "PostgreSQL",
    model: "關聯式・SQL",
    hosting: "自管或雲端託管",
    summary: "功能完整、可擴充的開源關聯式資料庫，適合做為多數應用的可靠起點。",
    bestFor: "需要交易一致性、複雜查詢，並希望保留 JSON 等彈性資料能力的應用。",
    needs: ["交易與應用資料", "雲端託管"],
    strengths: ["完整的 SQL 與交易功能", "擴充性高，支援 JSONB、全文搜尋等能力"],
    considerations: ["需要規劃索引、備份與升級", "大規模寫入仍需依工作負載調校"],
  },
  {
    slug: "mysql",
    name: "MySQL",
    model: "關聯式・SQL",
    hosting: "自管或雲端託管",
    summary: "成熟且普及的關聯式資料庫，常見於網站、內容管理與交易型服務。",
    bestFor: "重視廣泛工具支援、團隊熟悉度，以及常見網站工作負載的專案。",
    needs: ["交易與應用資料", "雲端託管"],
    strengths: ["生態成熟、託管選擇多", "常見網站框架與工具皆有良好支援"],
    considerations: [
      "不同資料庫版本與相容服務的功能可能有差異",
      "複雜查詢需依實際資料與索引驗證效能",
    ],
  },
  {
    slug: "sqlite",
    name: "SQLite",
    model: "關聯式・嵌入式 SQL",
    hosting: "嵌入應用程式・單一資料庫檔案",
    summary: "不需獨立資料庫伺服器的輕量選擇，資料可直接存放在本機檔案。",
    bestFor: "桌面或行動應用、原型、小型工具，以及本機分析或測試資料。",
    needs: ["內嵌與本機", "交易與應用資料"],
    strengths: ["部署簡單，不需維運資料庫服務", "單一檔案方便攜帶、備份與測試"],
    considerations: ["多個用戶同時大量寫入時較不適合", "應用擴大或需要遠端共用時要評估遷移"],
  },
  {
    slug: "mongodb",
    name: "MongoDB",
    model: "文件型・NoSQL",
    hosting: "自管或雲端託管",
    summary: "以 BSON 文件儲存資料，適合資料結構會隨產品需求演進的應用。",
    bestFor: "文件是主要讀寫單位、欄位變化頻繁，或需要水平擴展的服務。",
    needs: ["交易與應用資料", "雲端託管"],
    strengths: ["文件模型貼近多種應用資料結構", "彈性 schema 有利於逐步演進"],
    considerations: ["需依查詢方式設計文件與索引", "跨文件關聯和交易流程應先驗證資料模型"],
  },
  {
    slug: "redis",
    name: "Redis",
    model: "記憶體鍵值・資料結構",
    hosting: "自管或雲端託管",
    summary: "提供低延遲的記憶體資料存取，常作為主資料庫旁的即時資料層。",
    bestFor: "快取、工作階段、排行榜、速率限制等需要快速讀寫的資料。",
    needs: ["快取與即時資料", "雲端託管"],
    strengths: ["延遲低，並提供多種內建資料結構", "適合暫存與即時狀態管理"],
    considerations: [
      "記憶體容量與持久化策略會影響成本和可靠性",
      "應確認資料遺失時的影響，避免未經評估就取代主資料庫",
    ],
  },
  {
    slug: "clickhouse",
    name: "ClickHouse",
    model: "欄式・分析資料庫",
    hosting: "自管或雲端託管",
    summary: "針對大量事件與分析查詢設計的欄式資料庫，擅長彙總和掃描。",
    bestFor: "產品事件、觀測資料、分析報表等大量讀取與聚合工作負載。",
    needs: ["分析與報表", "雲端託管"],
    strengths: ["大量欄位掃描與聚合效率高", "適合近即時分析及高吞吐資料匯入"],
    considerations: [
      "不應直接當成一般交易型應用的預設主資料庫",
      "資料排序鍵和分區方式需配合查詢設計",
    ],
  },
  {
    slug: "duckdb",
    name: "DuckDB",
    model: "嵌入式・欄式分析",
    hosting: "嵌入應用程式・本機分析",
    summary: "可在本機直接分析資料檔案的嵌入式分析資料庫，特別適合分析工作流程。",
    bestFor: "資料探索、分析原型，以及直接查詢 Parquet 或 CSV 檔案。",
    needs: ["內嵌與本機", "分析與報表"],
    strengths: ["免維運伺服器即可執行分析查詢", "能直接讀取常見分析檔案格式"],
    considerations: [
      "定位偏向分析，不是多使用者線上交易服務",
      "大量共用寫入與服務部署需求需另行評估",
    ],
  },
  {
    slug: "dynamodb",
    name: "Amazon DynamoDB",
    model: "鍵值・文件型",
    hosting: "AWS 全託管",
    summary: "AWS 提供的無伺服器 NoSQL 服務，適合明確且可預測的存取模式。",
    bestFor: "需要 AWS 原生整合、彈性擴展，且能先定義主要查詢方式的服務。",
    needs: ["交易與應用資料", "雲端託管"],
    strengths: ["維運工作少，能與 AWS 服務整合", "可支援高請求量與彈性擴展"],
    considerations: ["資料模型需依存取模式設計", "需評估 AWS 綁定、索引限制與實際讀寫成本"],
  },
];

export type FrameworkCategory = "前端介面" | "全端應用" | "後端服務" | "跨平台應用";

export interface FrameworkLibraryProfile {
  slug: string;
  name: string;
  officialSite: string;
  language: string;
  category: FrameworkCategory;
  kind: "框架" | "函式庫";
  summary: string;
  bestFor: string;
  strengths: string[];
  considerations: string[];
  useCases: string[];
}

export const frameworkCategories: FrameworkCategory[] = [
  "前端介面",
  "全端應用",
  "後端服務",
  "跨平台應用",
];

export const frameworksLibraries: FrameworkLibraryProfile[] = [
  {
    slug: "react",
    name: "React",
    officialSite: "https://react.dev/",
    language: "JavaScript / TypeScript",
    category: "前端介面",
    kind: "函式庫",
    summary: "以元件組合建構互動介面的 UI 函式庫，周邊工具選擇豐富。",
    bestFor: "需要彈性選擇路由、資料載入與建置工具的互動式網站。",
    strengths: ["元件生態與社群資源豐富", "可依產品規模逐步採用不同工具"],
    considerations: ["許多應用層決策需要團隊自行整合", "需留意相依套件的品質與維護狀態"],
    useCases: ["互動式網站", "產品儀表板", "可重用的 UI 元件"],
  },
  {
    slug: "nextjs",
    name: "Next.js",
    officialSite: "https://nextjs.org/",
    language: "JavaScript / TypeScript",
    category: "全端應用",
    kind: "框架",
    summary: "以 React 為基礎的 Web 框架，整合路由、伺服器渲染與建置流程。",
    bestFor: "需要 SEO、伺服器渲染或希望使用單一框架建構完整 Web 應用的團隊。",
    strengths: ["提供多種渲染方式與檔案式路由", "React 生態支援完整"],
    considerations: ["框架慣例和執行環境需先理解", "不同渲染模式會影響資料流程與部署方式"],
    useCases: ["內容網站", "商業網站", "React 全端產品"],
  },
  {
    slug: "vue",
    name: "Vue",
    officialSite: "https://vuejs.org/",
    language: "JavaScript / TypeScript",
    category: "前端介面",
    kind: "框架",
    summary: "漸進式前端框架，提供單檔元件和清楚的反應式狀態模型。",
    bestFor: "希望循序導入前端框架，或偏好整合式元件撰寫方式的團隊。",
    strengths: ["可從局部互動逐步擴展至完整應用", "官方工具組合容易理解"],
    considerations: ["大型專案仍需建立一致的元件與狀態管理慣例", "需確認團隊既有技能和套件需求"],
    useCases: ["互動式網站", "管理介面", "漸進改造既有頁面"],
  },
  {
    slug: "sveltekit",
    name: "SvelteKit",
    officialSite: "https://svelte.dev/docs/kit/introduction",
    language: "JavaScript / TypeScript",
    category: "全端應用",
    kind: "框架",
    summary: "以 Svelte 為基礎的應用框架，整合路由、渲染與伺服器端功能。",
    bestFor: "想使用簡潔元件語法，並以一套框架處理頁面和伺服器路由的專案。",
    strengths: ["元件語法精簡，編譯後執行負擔低", "提供 SSR、靜態輸出及端點等功能"],
    considerations: ["生態規模較 React 等方案小", "部署 adapter 需配合目標平台選擇"],
    useCases: ["內容型網站", "互動式 Web 應用", "小型全端產品"],
  },
  {
    slug: "angular",
    name: "Angular",
    officialSite: "https://angular.dev/",
    language: "TypeScript",
    category: "前端介面",
    kind: "框架",
    summary: "整合路由、表單與依賴注入等功能的完整前端框架。",
    bestFor: "需要一致架構、完整工具鏈和長期團隊協作的大型前端產品。",
    strengths: ["官方提供完整應用開發工具", "架構慣例有助大型團隊維持一致性"],
    considerations: ["學習曲線和概念數量較高", "小型或高度客製需求可能覺得框架較重"],
    useCases: ["大型企業應用", "複雜表單", "長期維護的管理系統"],
  },
  {
    slug: "express",
    name: "Express",
    officialSite: "https://expressjs.com/",
    language: "JavaScript",
    category: "後端服務",
    kind: "框架",
    summary: "Node.js 上輕量且廣泛使用的 Web 框架，透過中介層組合請求流程。",
    bestFor: "希望以少量核心抽象自行選擇後端架構的 Node.js 專案。",
    strengths: ["概念簡單、套件與範例眾多", "容易與既有 Node.js 模組整合"],
    considerations: ["驗證、錯誤處理和專案結構需自行制定", "需檢查套件相容性與維護狀況"],
    useCases: ["HTTP API", "小型服務", "Node.js 原型"],
  },
  {
    slug: "nestjs",
    name: "NestJS",
    officialSite: "https://nestjs.com/",
    language: "TypeScript",
    category: "後端服務",
    kind: "框架",
    summary: "採用模組化與依賴注入的 Node.js 框架，適合建立結構化服務。",
    bestFor: "需要明確架構、TypeScript 支援和可測試模組的大型後端團隊。",
    strengths: ["模組、控制器和服務分工清楚", "支援 HTTP、微服務與 GraphQL 等模式"],
    considerations: ["抽象和裝飾器概念需要學習", "簡單 API 可能不需要完整框架的結構"],
    useCases: ["大型 API", "團隊協作服務", "Node.js 微服務"],
  },
  {
    slug: "fastapi",
    name: "FastAPI",
    officialSite: "https://fastapi.tiangolo.com/",
    language: "Python",
    category: "後端服務",
    kind: "框架",
    summary: "以型別註記與非同步支援為特色的 Python API 框架。",
    bestFor: "需要快速建立有型別驗證與互動式 API 文件的 Python 服務。",
    strengths: ["可由型別註記產生驗證和 OpenAPI 文件", "適合與 Python 資料科學工具整合"],
    considerations: ["需理解 ASGI 與同步、非同步程式的差異", "資料庫、背景工作等周邊選擇仍需整合"],
    useCases: ["JSON API", "機器學習服務", "非同步 Web 端點"],
  },
  {
    slug: "django",
    name: "Django",
    officialSite: "https://www.djangoproject.com/",
    language: "Python",
    category: "全端應用",
    kind: "框架",
    summary: "包含 ORM、管理介面和安全功能的 Python Web 框架。",
    bestFor: "需要快速推出資料驅動網站，並希望採用完整內建工具的團隊。",
    strengths: ["內建 ORM、管理後台和常用安全功能", "完整慣例可減少基礎設施選型"],
    considerations: [
      "框架慣例較多，需依其資料與請求生命週期設計",
      "單純 API 服務可能需搭配額外工具",
    ],
    useCases: ["內容管理網站", "資料管理後台", "快速驗證產品"],
  },
  {
    slug: "flutter",
    name: "Flutter",
    officialSite: "https://flutter.dev/",
    language: "Dart",
    category: "跨平台應用",
    kind: "框架",
    summary: "以 Dart 和自有 UI 元件建構多平台應用的工具組。",
    bestFor: "希望共用主要 UI 程式碼，並同時支援多種行動或桌面平台的團隊。",
    strengths: ["跨平台共用 UI 與大部分應用邏輯", "元件和開發工具整合度高"],
    considerations: ["需學習 Dart 與 Flutter 的 UI 模型", "平台原生功能仍可能需要原生程式碼或外掛"],
    useCases: ["iOS 與 Android 應用", "桌面應用", "跨平台原型"],
  },
  {
    slug: "spring-boot",
    name: "Spring Boot",
    officialSite: "https://spring.io/projects/spring-boot",
    language: "Java",
    category: "後端服務",
    kind: "框架",
    summary: "以 Spring 生態為基礎，簡化 Java 服務建置與設定的框架。",
    bestFor: "需要成熟企業級整合、廣泛 Java 工具支援和長期維護的後端服務。",
    strengths: ["生態成熟，涵蓋資料存取、安全和觀測性", "適合大型服務和既有 Java 團隊"],
    considerations: [
      "設定與生態範圍較大，需控制相依複雜度",
      "服務啟動與資源需求需配合部署環境評估",
    ],
    useCases: ["企業 API", "交易型後端", "Java 微服務"],
  },
];
