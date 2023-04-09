async function copyMessageToClipboard() {
    const { reviewTemplate } = await chrome.storage.sync.get(['reviewTemplate']);
    const prLinkSymbol = /{PR_LINK}/;
    const jiraLinkSymbol = /{JIRA_CARD}/;
    const jiraLinks = [...document.querySelectorAll('h1 [data-link-key="dvcs-connector-issue-key-linker"]')];
    const jiraLinkPlainText = jiraLinks.map((link) => link.innerHTML).join('|');
    const jiraLinkHtmlText = jiraLinks.map((link) =>
      `<a href="${link.href}">${link.innerHTML}</a>`).join(' | ');
  
    const clipboardItem = new ClipboardItem({
      "text/plain": new Blob(
        [
          reviewTemplate
            .replace(prLinkSymbol, 'PR')
            .replace(jiraLinkSymbol, jiraLinkPlainText)
        ],
        { type: "text/plain" }
      ),
      "text/html": new Blob(
        [
          reviewTemplate
            .replace(/\n/g, '<br>')
            .replace(prLinkSymbol, `<a href="${location.href}">PR</a>`)
            .replace(jiraLinkSymbol, jiraLinkHtmlText)
        ],
        { type: "text/html" }
      ),
    });
  
    return navigator.clipboard.write([clipboardItem]);
  }
  
  async function addCopyBtn () {
    if (!location.href.includes('pull-requests')) {
      return;
    }
  
    const btnClassName = 'pr-review-message__btn';
    const btnText = '📋 Copy review message';
    const header1 = document.querySelector('[data-qa="pr-header-page-header-wrapper"] h1');
    const currentCopyBtn = document.querySelector(`.${btnClassName}`);
  
    if (header1 && !currentCopyBtn) {
      const copyBtn = document.createElement('button');
      copyBtn.classList.add(btnClassName);
      copyBtn.textContent = btnText;
  
      copyBtn.addEventListener('click', async () => {
        await copyMessageToClipboard();
  
        copyBtn.textContent = '✅ Message copied!';
        copyBtn.setAttribute('disabled', '');
  
        setTimeout(() => {
          copyBtn.textContent = btnText;
          copyBtn.removeAttribute('disabled');
        }, 3000);
      });
  
      header1.insertAdjacentElement('afterend', copyBtn);
    }
  }
  
  const observer = new MutationObserver((mutations) => {
    const isChildListChanged = mutations.some((mutation) =>
      mutation.type === 'childList' && mutation.addedNodes.length > 0
    );
  
    if (isChildListChanged) {
      observer.disconnect();
  
      addCopyBtn();
  
      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    }
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });