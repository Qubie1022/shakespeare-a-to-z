# Shakespeare A–Z｜莎士比亞的文學詞典

一個可直接部署到 GitHub Pages 的靜態網站。包含 A–Z 26 個詞彙、中文解釋、劇本台詞、獨立 JPG 插畫，以及每個詞彙兩個 MP3（單字與台詞朗讀）。

## 本機預覽

建議使用 VS Code 的 Live Server，或在專案資料夾執行：

```bash
python -m http.server 8000
```

接著開啟 `http://localhost:8000`。不要直接用檔案總管雙擊 `index.html`，因為瀏覽器可能會阻擋 `fetch()` 讀取 JSON。

## 上傳 GitHub Pages

1. 在 GitHub 建立一個新的 repository。
2. 將本資料夾內所有檔案與資料夾上傳到 repository 根目錄（不是只上傳 ZIP）。
3. 進入 repository 的 **Settings → Pages**。
4. 在 **Build and deployment** 選擇 **Deploy from a branch**。
5. Branch 選 `main`、資料夾選 `/ (root)`，按 Save。
6. 等待 GitHub Pages 部署完成，網址會顯示在 Pages 頁面。

## 替換成自己的 MP3

在 `audio/` 資料夾中替換同名檔案即可，不需要修改 HTML 或 JavaScript。每個詞有兩個檔案：

- `a-ambition-word.mp3`：單字朗讀
- `a-ambition-quote.mp3`：劇本台詞朗讀

請保留檔名與路徑。若要改成自己的錄音，建議使用 MP3 格式、清楚的英文發音，並保留適當停頓。

## 替換圖片

在 `images/` 資料夾替換對應的 JPG，保留檔名，例如 `a-ambition.jpg`。建議使用橫式 3:2 圖片。

## 修改詞彙與台詞

編輯根目錄的 `vocabulary.json`。每筆資料包含：`letter`、`word`、`zh`、`meaning`、`quote`、`play`、`scene`、`context`、`slug`、`image`、`wordAudio`、`quoteAudio`。

## 專案檔案

```text
shakespeare-a-to-z/
├── index.html
├── style.css
├── script.js
├── vocabulary.json
├── README.md
├── images/       # 26 張獨立 JPG
└── audio/        # 52 個 MP3
```

## 編輯與來源提醒

- 莎士比亞原著文本屬公有領域；不同版本的拼字、標點及分場可能略有差異。
- 本專案的朗讀音檔由 eSpeak 英文語音合成產生，方便立即測試播放；它們不是專業演員錄音。你可以直接錄製自己的聲音並以同名 MP3 覆蓋。
- X 字首在莎士比亞作品中極少見。此處選用《馴悍記》出現的 Xanthippe（典故人名），並直接引用含有該詞的台詞。
- 圖片為本專案生成的印象派風格插畫素材，不是歷史名畫或莎士比亞時代的原始畫作。
