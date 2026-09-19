{
  let matchUrl;
  let { downloads, declarativeNetRequest, tabs } = chrome;
  declarativeNetRequest.onRuleMatchedDebug.addListener(e =>
    matchUrl = e.rule.ruleId === 2 && e.request.url
  );
  downloads.onCreated.addListener(({ url, id }) =>
    url === matchUrl && (
      downloads.cancel(id),
      downloads.erase({ id }),
      tabs.create({ url: url + "#.pdf" })
    )
  );
}
