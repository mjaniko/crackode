export const TOKEN_COLORS = {
  keyword: "#FF7B72",
  builtin: "#79C0FF",
  string: "#A5D6FF",
  comment: "#8B949E",
  number: "#79C0FF",
  function: "#D2A8FF",
  decorator: "#D2A8FF",
  type: "#FFA657",
  operator: "#FF7B72",
  punctuation: "#C9D1D9",
  variable: "#FFA657",
  default: "#C9D1D9",
};

const PYTHON_KEYWORDS = new Set(["def","class","if","elif","else","while","for","in","return","import","from","as","try","except","finally","raise","with","yield","lambda","pass","break","continue","and","or","not","is","None","True","False","global","nonlocal","assert","del","print"]);
const PYTHON_BUILTINS = new Set(["range","len","max","min","sum","abs","int","float","str","list","dict","set","tuple","sorted","enumerate","zip","map","filter","any","all","isinstance","type","super","property","staticmethod","classmethod","print","input","open","hash","id","reversed","next","iter","pow","round","chr","ord","hex","bin","oct","format","hasattr","getattr","setattr","delattr","callable","vars","dir","globals","locals","compile","eval","exec"]);

const JAVA_KEYWORDS = new Set(["public","private","protected","static","final","abstract","class","interface","extends","implements","new","return","if","else","while","for","do","switch","case","break","continue","try","catch","finally","throw","throws","import","package","void","int","long","double","float","boolean","char","byte","short","String","null","true","false","this","super","instanceof","enum","default","synchronized","volatile","transient","native","strictfp","assert","var","record","sealed","permits","yield"]);
const JAVA_TYPES = new Set(["int","long","double","float","boolean","char","byte","short","void","String","Integer","Long","Double","Float","Boolean","Character","Byte","Short","List","ArrayList","LinkedList","Map","HashMap","TreeMap","Set","HashSet","TreeSet","Queue","Deque","ArrayDeque","PriorityQueue","Stack","StringBuilder","Arrays","Collections","Math","Object","Comparable","Comparator","Optional","Stream","Pair"]);

const GO_KEYWORDS = new Set(["func","package","import","var","const","type","struct","interface","map","chan","go","select","switch","case","default","if","else","for","range","return","break","continue","defer","fallthrough","goto","nil","true","false","make","append","len","cap","new","delete","copy","close","panic","recover","print","println","iota"]);
const GO_TYPES = new Set(["int","int8","int16","int32","int64","uint","uint8","uint16","uint32","uint64","float32","float64","complex64","complex128","byte","rune","string","bool","error","any","comparable"]);

export function highlightLine(line, lang) {
  const tokens = [];
  let i = 0;
  const src = line;

  const keywords = lang === "java" ? JAVA_KEYWORDS : lang === "go" ? GO_KEYWORDS : PYTHON_KEYWORDS;
  const builtins = lang === "python" ? PYTHON_BUILTINS : new Set();
  const types = lang === "java" ? JAVA_TYPES : lang === "go" ? GO_TYPES : new Set();

  while (i < src.length) {
    // comments
    if ((lang === "python" && src[i] === "#") || ((lang === "java" || lang === "go") && src[i] === "/" && src[i + 1] === "/")) {
      tokens.push({ type: "comment", text: src.slice(i) });
      break;
    }
    // strings
    if (src[i] === '"' || src[i] === "'" || src[i] === "`") {
      const q = src[i];
      // triple quotes
      if (lang === "python" && src.slice(i, i + 3) === q.repeat(3)) {
        const end = src.indexOf(q.repeat(3), i + 3);
        const endIdx = end === -1 ? src.length : end + 3;
        tokens.push({ type: "string", text: src.slice(i, endIdx) });
        i = endIdx;
        continue;
      }
      let j = i + 1;
      while (j < src.length && src[j] !== q) {
        if (src[j] === "\\") j++;
        j++;
      }
      tokens.push({ type: "string", text: src.slice(i, j + 1) });
      i = j + 1;
      continue;
    }
    // decorator
    if (lang === "python" && src[i] === "@") {
      let j = i + 1;
      while (j < src.length && /\w/.test(src[j])) j++;
      tokens.push({ type: "decorator", text: src.slice(i, j) });
      i = j;
      continue;
    }
    // numbers
    if (/\d/.test(src[i]) && (i === 0 || !/\w/.test(src[i - 1]))) {
      let j = i;
      while (j < src.length && /[\d.xXa-fA-FeEbBoO_]/.test(src[j])) j++;
      tokens.push({ type: "number", text: src.slice(i, j) });
      i = j;
      continue;
    }
    // words
    if (/[a-zA-Z_]/.test(src[i])) {
      let j = i;
      while (j < src.length && /\w/.test(src[j])) j++;
      const word = src.slice(i, j);
      let type = "default";
      if (keywords.has(word)) type = "keyword";
      else if (builtins.has(word)) type = "builtin";
      else if (types.has(word)) type = "type";
      else if (j < src.length && src[j] === "(") type = "function";
      tokens.push({ type, text: word });
      i = j;
      continue;
    }
    // operators
    if ("+-*/%=<>!&|^~?:".includes(src[i])) {
      let j = i;
      while (j < src.length && "+-*/%=<>!&|^~?:".includes(src[j])) j++;
      tokens.push({ type: "operator", text: src.slice(i, j) });
      i = j;
      continue;
    }
    // punctuation
    if ("(){}[].,;@".includes(src[i])) {
      tokens.push({ type: "punctuation", text: src[i] });
      i++;
      continue;
    }
    tokens.push({ type: "default", text: src[i] });
    i++;
  }
  return tokens;
}
