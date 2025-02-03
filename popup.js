import {
    constValues,
    messges,
    first50Letters,
    generateDiv,
    generateCheckBox,
    generateRule,
    version
} from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
    const fetchBtn = document.getElementById(constValues.FETCH_BUTTON);
    const downloadButton = document.getElementById(constValues.DOWNLOAD_BUTTON);
    const checkBoxContainer = document.getElementById(constValues.SELECTION_AREA);
    const message = document.getElementById(constValues.NOTIFY_MESSAGE);

    let g_TabID = -1;
    let g_FileName = constValues.empty;

    showMe(`Extension Version: ${version}`);

    function isNull(obj, objName, functionName) {
        if (obj === null || obj === undefined) {
            showMe(`${objName} is null or undefiend at ${functionName} function`);
        }
    }

    function showMe(data) {
        console.log(data)
    }

    function reset() {
        g_TabID = -1;
        g_FileName = constValues.empty;
        // remove children
        isNull(checkBoxContainer, 'checkBoxContainer', 'reset');
        checkBoxContainer.innerHTML = constValues.empty;
    }

    function setStatus(msg) {
        isNull(message, 'message', 'setStatus')
        message.innerText = msg;
    }

    function extractElements() {
        showMe("extractElements")
        const stquestion = constValues.question;
        const stanswer = constValues.answer;

        showMe(stquestion);
        showMe(stanswer);

        const userMessages = document.querySelectorAll(stquestion);
        showMe(userMessages)
        const assistantMessages = document.querySelectorAll(stanswer);
        showMe(assistantMessages)
        let conversation = [];

        isNull(userMessages, 'userMessages', 'extractElements')
        isNull(assistantMessages, 'assistantMessages', 'extractElements')

        userMessages.forEach((message, index) => {
            const question = message.innerHTML;
            const answer = assistantMessages[index] ? assistantMessages[index].innerHTML : constValues.empty;

            isNull(question, 'question', 'foEach')
            isNull(answer, 'answer', 'forEach')

            conversation.push({
                question: question.trim(),
                answer: answer.trim()
            });
        });

        return conversation;
    }

    function createCSSRule(className, rules) {
        let style = document.createElement(constValues.style);
        style.type = constValues.textCss;
        document.head.appendChild(style);

        let rule = generateRule(className, rules)
        style.sheet.insertRule(rule, 0);
    }

    function injectCssClass() {
        createCSSRule(constValues.chatQuery, constValues.cssQuery);
        createCSSRule(constValues.chatAnswer, constValues.cssAnswer);
    }

    injectCssClass();

    fetchBtn.addEventListener('click', () => {
        // Clear messages
        setStatus(messges.CLEAR);

        // remove children
        isNull(checkBoxContainer, 'checkBoxContainer', 'fetchBtn->click')
        checkBoxContainer.innerHTML = constValues.empty;


        // start traverse the page content and get the elments
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const deepSeek = constValues.deepSeekLink;
            showMe(deepSeek);
            if (tabs && tabs.length > 0) {

                const tabObj = tabs[0];
                showMe(tabObj);
                const tabId = tabObj.id;
                const tabUrl = tabObj.url;

                g_TabID = tabId;

                if (tabUrl.substring(0, deepSeek.length) == deepSeek) {
                    g_FileName = first50Letters(tabObj.title);
                    showMe("Bfore Fetch chat");
                    fetchChat()
                } else {
                    console.error("Not deepseek chat url.")
                }
            } else {
                console.error("Tabs issue.")
            }
        });

        function fetchChat() {
            let conversation = [];
            showMe(`g_TabID is ${g_TabID}`)
            chrome.scripting.executeScript(
                {
                    target: { tabId: g_TabID },
                    function: extractElements
                },
                (results) => {
                    showMe(results);

                    if (chrome.runtime.lastError) {
                        setStatus(messges.FAILED_FETCH);
                        return;
                    } else {
                        showMe('No error')
                    }

                    if (results && results[0].result) {
                        conversation = results[0].result;

                        conversation.forEach((item, index) => {
                            const div = document.createElement('div');
                            div.innerHTML = generateCheckBox(index, item.question);
                            checkBoxContainer.appendChild(div);
                        });

                    } else {
                        console.error('Nothing to render')
                    }
                }
            );
        }
    });


    downloadButton.addEventListener('click', () => {
        // Clear messages
        setStatus(messges.CLEAR);

        // Check Selection
        const checked = document.querySelectorAll(constValues.SELECTED_CHOICES);
        isNull(checked, 'checked', 'downloadButton->click');

        if (checked.length == 0) {
            setStatus(messges.NO_SELECTION)
            return;
        }

        generatePdf(checked);
    });

    function generatePdf(checked) {
        let conversation = [];
        let ids = [];
        for (let x = 0; x < checked.length; x++)
            ids.push(parseInt(checked[x].name.substring(3)));


        chrome.scripting.executeScript(
            {
                target: { tabId: g_TabID },
                function: extractElements
            },
            (results) => {
                if (chrome.runtime.lastError) {
                    message.innerText = messges.FAILED_FETCH;
                    return;
                } else {
                    showMe('no issue')
                }

                let content = document.createElement('div')
                let cssClassQuery = constValues.chatQuery;
                let cssClassAnswer = constValues.chatAnswer;

                if (results && results[0].result) {
                    conversation = results[0].result;
                    conversation.forEach((item, index) => {
                        if (ids.includes(index)) {


                            let rawData = '';
                            if (item.question) {
                                rawData += generateDiv(cssClassQuery, item.question);
                            }

                            if (item.answer) {
                                rawData += generateDiv(cssClassAnswer, item.answer);
                            }

                            const tempDiv = document.createElement('div');
                            tempDiv.innerHTML = rawData;

                            content.appendChild(tempDiv);
                        }
                    });
                    setStatus(messges.CLEAR);
                    // remove icons, buttons, copy
                    content.querySelectorAll(constValues.classesToRemove).forEach(el => el.remove());
                    setStatus(messges.DOWNLOADING)

                    const opt = {
                        margin: 1,
                        filename: `${g_FileName}.pdf`,
                        image: { type: 'jpeg', quality: 0.95 },
                        html2canvas: { scale: 2 },
                        enableLinks: true,
                        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
                        pagebreak: { mode: 'avoid-all', before: '#page2el' }
                    }

                    html2pdf().set(opt).from(content).save();

                    reset();
                }
            }
        );
    }
});