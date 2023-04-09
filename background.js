const defaultReviewTemplate = `大家好，請幫我的 review PR，謝謝！
{PR_LINK} | {JIRA_CARD}`;

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ reviewTemplate: defaultReviewTemplate });
});