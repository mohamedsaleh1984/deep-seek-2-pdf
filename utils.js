export const messges = {
    NO_SELECTION: "Go ahead and pick your queries, then hit Download!",
    SUCCESSFUL: "Your PDF is all set and ready to go! 🎉",
    DOWNLOADING: "Your PDF will be on its way to you in just a moment!",
    CLEAR: "",
    FAILED_FETCH: "Oops! We couldn’t access the DeepSeek chat. Mind refreshing the page and giving it another shot?",
    NOTHING_TO_RENDER: "Looks like there’s nothing here to read at the moment! 🧐"
};

export const constValues = {
    codeblock: ".md-code-block-banner",
    FETCH_BUTTON: "fetchButton",
    DOWNLOAD_BUTTON: "downloadButton",
    SELECTION_AREA: "genselection",
    NOTIFY_MESSAGE: "notifyuser",
    deepSeekLink: "https://chat.deepseek.com/",
    dotdotdot: "...",
    empty: "",
    style: "style",
    SELECTED_CHOICES: `input[type="checkbox"]:checked`,
    classesToRemove: 'input[type="checkbox"], button, svg, .md-code-block-banner, div[class="a6d716f5 db5991dd"]',
    textCss: "text/css",
    chatAnswer: "chat-answer",
    cssAnswer: `margin-top: 10px;
                padding: 8px;
                border-radius: 10px;
                white-space: pre-wrap;
                word-break: break-word`,
    chatQuery: "chat-query",
    cssQuery: `color: #262626;
                padding: 8px;
                white-space: pre-wrap;
                word-break: break-word;
                background-color: #eff6ff;
                border-radius: 10px;
                max-width: calc(100% - 48px);
                margin-bottom: 8px;
                font-weight: bolder`
}

//  fetch first 50 characters of string if it's LONGER
export function first50Letters(str) {
    return str.length > 50 ? str.substring(0, 47) + constValues.dotdotdot : str.substring(0, 50);
}

// Create DIV
export function generateDiv(cssClass, question) {
    return `<div class=${cssClass}>${question}</div>`
}

// Create Checkbox
export function generateCheckBox(index, question) {
    let strItem = ` <label class="checkbox-item" itemprop="itemListElement">` +
        ` <input type="checkbox" id="chk${index}" name="chk${index} itemprop="checked"> ` +
        ` <label itemprop="name"  for="chk${index}">${first50Letters(question)}</label>` +
        ` </label>`
    return strItem;
}

// Create CSS Class
export function generateRule(className, rules) {
    return `.${className} { ${rules} }`;
}