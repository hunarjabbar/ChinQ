const stylelint = require('stylelint');

const ruleName = 'custom/no-root-overflow-hidden';
const messages = stylelint.utils.ruleMessages(ruleName, {
  rejected: (selector, prop) =>
    `Disallowed "${prop}: hidden" on root element "${selector}". Suppresses viewport scrolling or masks layout overflow bugs.`
});

const plugin = stylelint.createPlugin(ruleName, (primaryOption) => {
  return (root, result) => {
    if (!primaryOption) return;

    root.walkRules((rule) => {
      const rootSelectorRegex = /(^|[\s,>+~])(#root|:root|html|body)\b/i;
      if (rootSelectorRegex.test(rule.selector)) {
        rule.walkDecls(/^overflow(-[xy])?$/i, (decl) => {
          if (decl.value.trim().toLowerCase() === 'hidden') {
            stylelint.utils.report({
              message: messages.rejected(rule.selector, decl.prop),
              node: decl,
              result,
              ruleName
            });
          }
        });
      }
    });
  };
});

module.exports = plugin;
module.exports.ruleName = ruleName;
module.exports.messages = messages;
