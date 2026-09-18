{
  let matchUrl;
  let downloads = chrome.downloads;
  chrome.declarativeNetRequest.onRuleMatchedDebug.addListener(e =>
    matchUrl = e.rule.ruleId === 2 && e.request.url
  );
  downloads.onCreated.addListener(({ url, id }) =>
    url == matchUrl && (
      downloads.cancel(id),
      downloads.erase({ id }),
      chrome.tabs.create({ url: url + "#.pdf" })
    )
  );
}
