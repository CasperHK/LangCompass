export type LanguageCategory =
  | "系統與效能"
  | "Web 與全端"
  | "資料科學與 AI"
  | "雲端與分散式"
  | "晶片設計"
  | "應用程式與行動"
  | "遊戲與互動"
  | "資料庫與查詢";

export interface LanguageProfile {
  slug: string;
  name: string;
  officialSite: string;
  mark: string;
  category: LanguageCategory;
  description: string;
  color: string;
  tagline: string;
  overview: string;
  paradigm: string;
  typeSystem: string;
  runtime: string;
  useCases: string[];
  strengths: string[];
  considerations: string[];
  ecosystem: string[];
  example?: string;
  related: string[];
}

export const languages: LanguageProfile[] = [
  {
    slug: "rust",
    name: "Rust",
    officialSite: "https://www.rust-lang.org/",
    mark: "Rs",
    category: "系統與效能",
    description: "以記憶體安全與效能著稱，適合系統程式和可靠的後端服務。",
    color: "bg-orange-50 text-orange-700",
    tagline: "把記憶體安全與原生效能，帶進系統級開發。",
    overview:
      "Rust 在編譯期檢查所有權與借用，讓程式能在不依賴垃圾回收器的情況下管理記憶體。它常用於需要可靠性、低階控制或穩定效能的工具與服務。",
    paradigm: "多範式・系統程式",
    typeSystem: "靜態・強型別",
    runtime: "編譯為原生程式碼",
    useCases: ["系統程式與基礎設施", "命令列工具", "高效能後端服務"],
    strengths: [
      "所有權與借用檢查在編譯期協助避免資料競爭與記憶體錯誤。",
      "零成本抽象兼顧高階表達能力與執行效率。",
      "Cargo 與 crates.io 提供整合式的建置和套件管理體驗。",
    ],
    considerations: [
      "所有權、借用與生命週期需要時間熟悉。",
      "複雜的型別與泛型設計可能增加編譯和除錯成本。",
    ],
    ecosystem: ["Cargo", "Tokio", "Axum", "Serde"],
    example: `fn main() {
    println!("Hello, world!");
}`,
    related: ["go", "zig", "cpp"],
  },
  {
    slug: "go",
    name: "Go",
    officialSite: "https://go.dev/",
    mark: "Go",
    category: "雲端與分散式",
    description: "簡潔、易部署的編譯語言，常見於雲端服務與開發者工具。",
    color: "bg-cyan-50 text-cyan-700",
    tagline: "用簡潔的語法，打造易部署的網路服務與工具。",
    overview:
      "Go 將精簡的語言設計、內建並行功能和快速編譯放在核心位置。標準函式庫涵蓋常見網路需求，適合團隊建立可維護的服務與基礎設施工具。",
    paradigm: "程序式・並行程式",
    typeSystem: "靜態・強型別",
    runtime: "編譯為原生程式碼",
    useCases: ["雲端原生服務", "網路 API 與微服務", "命令列與維運工具"],
    strengths: [
      "語言特性少而一致，容易閱讀和協作。",
      "Goroutine 與 channel 讓並行程式更容易組織。",
      "編譯產物部署簡單，標準函式庫的網路支援完整。",
    ],
    considerations: [
      "簡潔的抽象模型不一定適合需要複雜型別運算的領域。",
      "錯誤通常需明確檢查與傳遞，需建立一致的團隊慣例。",
    ],
    ecosystem: ["Go modules", "Gin", "gRPC", "Kubernetes"],
    example: `package main

import "fmt"

func main() {
    fmt.Println("Hello, world!")
}`,
    related: ["rust", "typescript", "bash"],
  },
  {
    slug: "cpp",
    name: "C++",
    officialSite: "https://isocpp.org/",
    mark: "C++",
    category: "系統與效能",
    description: "兼具低階控制與抽象能力，廣泛應用於遊戲、系統和高效能運算。",
    color: "bg-indigo-50 text-indigo-700",
    tagline: "以細緻的硬體控制，支援成熟而多元的高效能軟體。",
    overview:
      "C++ 提供從低階資源管理到泛型和物件導向抽象的完整工具。它在遊戲引擎、桌面軟體、嵌入式裝置與效能敏感的系統中有長期累積的程式庫和人才經驗。",
    paradigm: "多範式・系統程式",
    typeSystem: "靜態・強型別",
    runtime: "編譯為原生程式碼",
    useCases: ["遊戲引擎與圖形程式", "桌面與嵌入式軟體", "效能敏感的系統"],
    strengths: [
      "能直接控制記憶體和執行資源，並提供豐富的抽象工具。",
      "標準函式庫和成熟的第三方生態支援多種平台。",
      "適合與既有 C/C++ 程式碼和系統函式庫整合。",
    ],
    considerations: [
      "語言和建置系統選項多，專案慣例需要明確管理。",
      "資源生命週期與相容性問題需要持續留意。",
    ],
    ecosystem: ["C++ Standard Library", "CMake", "Qt", "Unreal Engine"],
    example: `#include <iostream>

int main() {
    std::cout << "Hello, world!\\n";
}`,
    related: ["rust", "zig", "veryl"],
  },
  {
    slug: "zig",
    name: "Zig",
    officialSite: "https://ziglang.org/",
    mark: "Z",
    category: "系統與效能",
    description: "重視可預測性與明確控制的新興系統語言。",
    color: "bg-amber-50 text-amber-700",
    tagline: "以明確的控制與編譯期能力，探索新一代系統程式設計。",
    overview:
      "Zig 著重可預測的程式行為、明確的錯誤處理和與 C 的互通性。它把編譯期運算納入語言核心，讓同一套語法能處理泛型、條件編譯與建置邏輯。",
    paradigm: "命令式・系統程式",
    typeSystem: "靜態・強型別",
    runtime: "編譯為原生程式碼",
    useCases: ["系統工具與執行環境", "C 程式庫互通", "跨平台原生應用"],
    strengths: [
      "程式的配置與錯誤處理傾向明確呈現。",
      "編譯期執行能力可用於泛型和建置設定。",
      "與 C ABI 互通，能逐步導入既有 C 專案。",
    ],
    considerations: [
      "語言與標準程式庫仍在發展，需留意版本差異。",
      "套件和成熟範例相較於歷史悠久的系統語言較少。",
    ],
    ecosystem: ["Zig build", "C ABI", "標準程式庫", "跨平台工具鏈"],
    example: `const std = @import("std");

pub fn main() void {
    std.debug.print("Hello, world!\\n", .{});
}`,
    related: ["rust", "cpp", "go"],
  },
  {
    slug: "typescript",
    name: "TypeScript",
    officialSite: "https://www.typescriptlang.org/",
    mark: "TS",
    category: "Web 與全端",
    description: "為 JavaScript 加上型別，適合規模化的前端與全端應用。",
    color: "bg-blue-50 text-blue-700",
    tagline: "保留 JavaScript 的彈性，並讓大型專案更容易理解與維護。",
    overview:
      "TypeScript 在 JavaScript 語法上加入靜態型別檢查，最後仍會編譯成 JavaScript 執行。它能逐步導入既有程式碼，並透過型別、編輯器提示和重構工具協助團隊管理複雜度。",
    paradigm: "多範式・應用程式開發",
    typeSystem: "靜態檢查・結構型別",
    runtime: "轉譯為 JavaScript",
    useCases: ["大型前端應用", "Node.js 後端服務", "共用型別的全端產品"],
    strengths: [
      "可漸進式導入，並沿用 JavaScript 生態系。",
      "型別檢查和編輯器工具能提早發現常見錯誤。",
      "適合在前後端共用資料結構與驗證契約。",
    ],
    considerations: [
      "型別資訊不會在執行期自動驗證外部資料。",
      "複雜型別、編譯設定和相依套件需持續維護。",
    ],
    ecosystem: ["TypeScript compiler", "React", "Vite", "Node.js"],
    example: `type Greeting = {
    name: string;
};

const greet = ({ name }: Greeting) => \`Hello, \${name}!\`;`,
    related: ["javascript", "dart", "go"],
  },
  {
    slug: "javascript",
    name: "JavaScript",
    officialSite: "https://tc39.es/ecma262/",
    mark: "JS",
    category: "Web 與全端",
    description: "驅動網頁互動的核心語言，也能用於伺服器與跨平台開發。",
    color: "bg-yellow-50 text-yellow-700",
    tagline: "從瀏覽器互動到伺服器程式，JavaScript 無所不在。",
    overview:
      "JavaScript 是瀏覽器原生支援的程式語言，也能透過 Node.js 等執行環境撰寫伺服器和工具。事件迴圈、非同步 API 與龐大的套件生態，讓它涵蓋完整的 Web 開發流程。",
    paradigm: "多範式・事件驅動",
    typeSystem: "動態型別",
    runtime: "瀏覽器或 JavaScript 執行環境",
    useCases: ["互動式網站", "Node.js 服務與工具", "跨平台應用程式"],
    strengths: [
      "在主流瀏覽器中原生執行，Web 生態支援廣泛。",
      "同一語言可用於前端、後端和自動化工具。",
      "非同步和事件驅動模型適合互動式應用。",
    ],
    considerations: [
      "動態型別讓部分錯誤只能在執行時發現。",
      "套件數量和執行環境選擇多，需要穩定的專案規範。",
    ],
    ecosystem: ["ECMAScript", "DOM APIs", "Node.js", "npm"],
    example: `const greet = (name) => {
    console.log(\`Hello, \${name}!\`);
};

greet("world");`,
    related: ["typescript", "dart", "python"],
  },
  {
    slug: "dart",
    name: "Dart",
    officialSite: "https://dart.dev/",
    mark: "D",
    category: "Web 與全端",
    description: "搭配 Flutter 建構行動、網頁與桌面應用程式。",
    color: "bg-sky-50 text-sky-700",
    tagline: "以一套現代語言，搭配 Flutter 建構多平台介面。",
    overview:
      "Dart 是支援 JIT 與 AOT 編譯的應用程式語言，並以 Flutter 作為最常見的 UI 開發搭檔。空值安全和完整的工具鏈，適合以單一程式碼基礎打造多平台產品。",
    paradigm: "多範式・應用程式開發",
    typeSystem: "靜態・空值安全",
    runtime: "JIT 開發・AOT 部署",
    useCases: ["Flutter 行動應用", "桌面與 Web 介面", "跨平台產品原型"],
    strengths: [
      "Flutter 提供跨平台 UI 工具與一致的開發體驗。",
      "空值安全和靜態檢查有助於維護大型程式碼。",
      "JIT 支援快速開發迭代，AOT 可用於正式部署。",
    ],
    considerations: [
      "語言的主要應用方向與 Flutter 生態緊密相連。",
      "需要評估目標平台、原生整合和第三方套件支援。",
    ],
    ecosystem: ["Flutter", "Dart SDK", "pub.dev", "Isolates"],
    example: `void main() {
  final greeting = "Hello, world!";
  print(greeting);
}`,
    related: ["typescript", "javascript", "python"],
  },
  {
    slug: "python",
    name: "Python",
    officialSite: "https://www.python.org/",
    mark: "Py",
    category: "資料科學與 AI",
    description: "語法易讀、套件豐富，常用於自動化、資料科學與 AI。",
    color: "bg-emerald-50 text-emerald-700",
    tagline: "用易讀的語法快速探索資料、建立工具與驗證想法。",
    overview:
      "Python 以可讀性和廣泛的通用性聞名，從自動化腳本、Web 服務到機器學習都有成熟套件。它常作為探索和串接工具的首選，也能透過型別註記與測試逐步擴展到大型專案。",
    paradigm: "多範式・通用語言",
    typeSystem: "動態型別・支援型別註記",
    runtime: "直譯器執行",
    useCases: ["資料分析與機器學習", "自動化與腳本", "Web API 與原型開發"],
    strengths: [
      "語法精簡易讀，適合快速試驗與表達想法。",
      "資料科學、AI、自動化和 Web 領域都有豐富工具。",
      "可透過型別註記、測試和套件工具改善大型專案維護性。",
    ],
    considerations: [
      "純 Python 程式的執行效能未必適合所有計算密集工作。",
      "相依環境和套件版本需要清楚管理。",
    ],
    ecosystem: ["PyPI", "NumPy", "pandas", "Django"],
    example: `def greet(name: str) -> str:
    return f"Hello, {name}!"

print(greet("world"))`,
    related: ["julia", "r", "javascript"],
  },
  {
    slug: "julia",
    name: "Julia",
    officialSite: "https://julialang.org/",
    mark: "Jl",
    category: "資料科學與 AI",
    description: "為科學計算而生，兼顧高階語法與數值運算效能。",
    color: "bg-violet-50 text-violet-700",
    tagline: "用高階語法表達數學模型，並以 JIT 編譯執行數值運算。",
    overview:
      "Julia 專注於科學計算和數值程式設計，透過多重派發與 JIT 編譯支援可組合的高效運算。它適合將研究模型、模擬和分析流程直接寫成可重用的程式。",
    paradigm: "多重派發・多範式",
    typeSystem: "動態型別・型別特化",
    runtime: "LLVM JIT 編譯",
    useCases: ["科學計算與模擬", "數值最佳化", "研究資料分析"],
    strengths: [
      "多重派發和型別特化適合表達數值演算法。",
      "語法直接支援矩陣和數學運算。",
      "套件可用純 Julia 或整合既有原生函式庫。",
    ],
    considerations: [
      "首次呼叫的編譯延遲可能影響短任務體驗。",
      "在部分領域，社群規模和既有工具仍小於 Python 或 R。",
    ],
    ecosystem: ["Pkg.jl", "DataFrames.jl", "DifferentialEquations.jl", "Pluto.jl"],
    example: `function greet(name)
    println("Hello, ", name, "!")
end

greet("world")`,
    related: ["python", "r", "rust"],
  },
  {
    slug: "r",
    name: "R",
    officialSite: "https://www.r-project.org/",
    mark: "R",
    category: "資料科學與 AI",
    description: "專注統計分析與資料視覺化，深受研究與分析工作者使用。",
    color: "bg-blue-50 text-blue-700",
    tagline: "以統計方法和豐富的視覺化工具，理解資料背後的訊息。",
    overview:
      "R 是面向統計計算與資料分析的語言，提供向量化操作、統計方法和成熟的繪圖工具。它在研究、學術和商業分析中有深厚的套件與教學資源。",
    paradigm: "多範式・統計計算",
    typeSystem: "動態型別",
    runtime: "直譯器執行",
    useCases: ["統計分析與實驗", "資料視覺化", "研究報告與可重現分析"],
    strengths: [
      "統計分析和圖表工具完整，適合探索式工作。",
      "CRAN 與 Bioconductor 涵蓋大量分析套件。",
      "Quarto 等工具可將程式、文字和結果整合成報告。",
    ],
    considerations: [
      "套件間的資料格式和慣例可能不盡相同。",
      "做通用服務或系統程式時，通常需搭配其他技術。",
    ],
    ecosystem: ["CRAN", "tidyverse", "ggplot2", "Quarto"],
    example: `greet <- function(name) {
  paste("Hello,", name, "!")
}

cat(greet("world"), "\\n")`,
    related: ["python", "julia", "typescript"],
  },
  {
    slug: "bash",
    name: "Bash",
    officialSite: "https://www.gnu.org/software/bash/",
    mark: "$_",
    category: "雲端與分散式",
    description: "串接命令列工具、自動化工作流程與伺服器維運。",
    color: "bg-slate-100 text-slate-700",
    tagline: "把命令列工具串接起來，讓日常維運流程自動化。",
    overview:
      "Bash 是常見的 Unix shell 與腳本語言，特別適合組合命令列工具、處理檔案和自動化維運任務。它通常與作業系統工具協作，而非取代大型應用程式語言。",
    paradigm: "命令式・Shell 腳本",
    typeSystem: "動態型別・字串導向",
    runtime: "Shell 直譯執行",
    useCases: ["命令列工作流程", "部署與維運腳本", "檔案與文字處理"],
    strengths: [
      "能直接串接作業系統命令與標準輸入輸出。",
      "適合快速建立安裝、部署和自動化腳本。",
      "在 Linux 與 macOS 的開發及維運環境普遍可用。",
    ],
    considerations: [
      "引用、空白字元和錯誤碼處理需要格外仔細。",
      "大型、跨平台或資料結構複雜的程式通常不適合用 Shell 維護。",
    ],
    ecosystem: ["GNU Bash", "GNU coreutils", "ShellCheck", "Make"],
    example: `#!/usr/bin/env bash
set -euo pipefail

name="\${1:-world}"
printf 'Hello, %s!\\n' "$name"`,
    related: ["go", "python", "rust"],
  },
  {
    slug: "veryl",
    name: "Veryl",
    officialSite: "https://veryl-lang.org/",
    mark: "V",
    category: "晶片設計",
    description: "面向 FPGA 與硬體開發的現代硬體描述語言。",
    color: "bg-teal-50 text-teal-700",
    tagline: "以現代語言特性描述數位電路，再接入既有硬體工具鏈。",
    overview:
      "Veryl 是用於數位硬體設計的硬體描述語言，提供型別檢查和語法結構，並可轉換成 SystemVerilog 以銜接既有綜合與驗證流程。它適合想採用較現代語法，又需要延續現有 HDL 工具鏈的團隊。",
    paradigm: "硬體描述・同步電路",
    typeSystem: "靜態・硬體型別",
    runtime: "轉換為 SystemVerilog",
    useCases: ["FPGA 數位電路", "可綜合 RTL 設計", "SystemVerilog 工具鏈整合"],
    strengths: [
      "型別和語法檢查能在設計階段捕捉部分錯誤。",
      "可轉換為 SystemVerilog，沿用既有硬體工具鏈。",
      "現代化的語言設計有助於整理大型 RTL 專案。",
    ],
    considerations: [
      "需要熟悉時脈、硬體資源和 RTL 設計流程。",
      "工具與社群仍在成長，需確認目標綜合工具的相容性。",
    ],
    ecosystem: ["Veryl compiler", "SystemVerilog", "Verilator", "FPGA 工具鏈"],
    related: ["spade", "cpp", "zig"],
  },
  {
    slug: "spade",
    name: "Spade",
    officialSite: "https://github.com/spade-lang/spade",
    mark: "Sp",
    category: "晶片設計",
    description: "提供型別安全與現代語法的硬體描述語言。",
    color: "bg-rose-50 text-rose-700",
    tagline: "用型別安全的語法描述電路，將硬體設計意圖表達得更清楚。",
    overview:
      "Spade 是面向 FPGA 和數位電路設計的硬體描述語言，透過靜態型別與明確的硬體結構協助表達電路。它屬於持續發展中的新興工具，適合想探索不同 RTL 工作流程的硬體工程師。",
    paradigm: "硬體描述・型別導向",
    typeSystem: "靜態・強型別",
    runtime: "編譯為 Verilog",
    useCases: ["FPGA 原型開發", "數位電路設計", "硬體語言研究與實驗"],
    strengths: [
      "型別系統協助表達資料寬度與硬體介面。",
      "現代語法讓部分電路結構更容易閱讀。",
      "Verilog 輸出可銜接常見 FPGA 設計流程。",
    ],
    considerations: [
      "語言和工具仍較新，需先驗證專案所需的功能支援。",
      "必須理解硬體時序與電路行為，不能只以軟體執行模型思考。",
    ],
    ecosystem: ["Spade compiler", "Verilog", "FPGA 工具鏈", "硬體驗證"],
    related: ["veryl", "cpp", "rust"],
  },
];

export function getLanguageBySlug(slug: string): LanguageProfile | undefined {
  return languages.find((language) => language.slug === slug);
}
