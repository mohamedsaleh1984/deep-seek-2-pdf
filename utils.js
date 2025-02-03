export const messges = {
    "NO_SELECTION": "Please select questions and press Download.",
    "SUCCESSFUL": "PDF has been compiled successfully.",
    "DOWNLOADING": "PDF file is downloaded shortly.",
    "CLEAR": "",
    "FAILED_FETCH": "Failed to read DeepSeek chat, please refresh the page and try again."
};

export const constValues = {
    "question": `div[class="fbb737a4"]`,
    "answer": `div[class="ds-markdown ds-markdown--block"]`,
    "codeblock": ".md-code-block-banner",
    "FETCH_BUTTON": "fetchButton",
    "DOWNLOAD_BUTTON": "downloadButton",
    "SELECTION_AREA": "genSelection",
    "NOTIFY_MESSAGE": "notifyuser",
    "deepSeekLink": "https://chat.deepseek.com/",
    "dotdotdot": "...",
    "empty": "",
    "style": "style",
    "SELECTED_CHOICES": `input[type="checkbox"]:checked`,
    "classesToRemove": 'input[type="checkbox"], button, svg, .md-code-block-banner',
    "textCss": "text/css",
    "chatAnswer": "chat-answer",
    "cssAnswer": `margin-top: 10px;
                                padding: 8px;
                                border-radius: 10px;
                                white-space: pre-wrap;
                                word-break: break-word`,
    "chatQuery": "chat-query",
    "cssQuery": ` color: #262626;
                                        padding: 8px;
                                        white-space: pre-wrap;
                                        word-break: break-word;
                                        background-color: #eff6ff;
                                        border-radius: 10px;
                                        max-width: calc(100% - 48px);
                                        margin-bottom: 8px;
                                        font-weight: bolder`,

}

export function first50Letters(str) {
    return str.length > 50 ? str.substring(0, 47) + constValues.dotdotdot : str.substring(0, 50);
}

export function generateDiv(cssClass, question) {
    return `<div class=${cssClass}>${question}</div>`
}

export function generateCheckBox(index, question) {
    return `<input type="checkbox" id="chk${index}" name="chk${index}"  /><label style="cursor: pointer;" for="chk${index}">${first50Letters(question)}</label> `;
}

export function generateRule(className, rules) {
    return `.${className} { ${rules} }`;
}

export const version = "96.0.0";