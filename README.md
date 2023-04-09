## Chrome extension

*pr review extension with jira*

[文章](https://medium.com/@alexian853/%E5%BE%9E%E9%A0%AD%E9%96%8B%E5%A7%8B%E5%AD%B8%E7%BF%92%E9%96%8B%E7%99%BC-chrome-extension-v3-%E7%89%88%E6%9C%AC-96d7fdfc00d1)

### 筆記

**manifest.json**
是整個 Chrome extension 的核心，記錄著所有的配置檔案

- 擴充功能名稱 name
- 權限 permissions
- 圖示 icons
- background
- content script
- action

**background**
擴充功能的本體，可透過 Chrome API 可以監聽使用者對 Chrome 操作事件。

**content script**
在擴充功能中唯一能與網頁內容進行互動的部分，也就是可以對 DOM 進行操作

**action**
在 Chrome 工具列中點選擴充功能圖示時，可選擇觸發的行為，除了直接執行某項功能，也可以使用 popup 可以自訂 UI ，提供擴充功能與使用者互動，並且可使用大部分 Chrome API。



