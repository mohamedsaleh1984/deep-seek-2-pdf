const messges = {
    "NO_SELECTION": "Please select questions and press Download.",
    "SUCCESSFUL": "PDF has been compiled successfully.",
    "DOWNLOADING": "PDF file is downloaded shortly.",
    "CLEAR": "",
    "FAILED_FETCH": "Failed to read DeepSeek chat, please refresh the page and try again."
};


document.addEventListener('DOMContentLoaded', () => {


    let fetchBtn = document.getElementById('fetchButton');
    let downloadButton = document.getElementById('downloadButton');
    let debug = document.getElementById('debugButton');
    let checkBoxContainer = document.getElementById('gen-selection');
    let message = document.getElementById('notify-user');
    let g_TabID = -1;
    let g_FileName = "";

    function reset() {
        g_TabID = -1;
        g_FileName = "";
        // remove children
        checkBoxContainer.innerHTML = '';

    }
    function setStatus(key) {
        message.innerText = messges[key]
    }

    function extractElements() {
        const userMessages = document.querySelectorAll('div[class="fbb737a4"]');
        const assistantMessages = document.querySelectorAll('div[class="ds-markdown ds-markdown--block"]');
        let conversation = [];

        userMessages.forEach((message, index) => {
            const question = message.innerHTML;
            const answer = assistantMessages[index] ? assistantMessages[index].innerHTML : '';

            conversation.push({
                question: question.trim(),
                answer: answer.trim()
            });
        });

        return conversation;
    }

    function first50Letters(str) {
        return str.length > 50 ? str.substring(0, 47) + "..." : str.substring(0, 50);
    }

    fetchBtn.addEventListener('click', () => {
        // Clear messages
        setStatus("CLEAR");

        // remove children
        checkBoxContainer.innerHTML = '';

        // start traverse the page content and get the elments
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const deepSeek = "https://chat.deepseek.com/"

            if (tabs && tabs.length > 0) {

                const tabObj = tabs[0];

                const tabId = tabObj.id;
                const tabUrl = tabObj.url;

                g_TabID = tabId;

                if (tabUrl.substring(0, deepSeek.length) == deepSeek) {
                    g_FileName = first50Letters(tabObj.title);
                    fetchChat(g_TabID)
                } else {

                }
            } else {
                // not deepseek
            }
        });

        function fetchChat(tabId) {
            let conversation = [];

            chrome.scripting.executeScript(
                {
                    target: { tabId: tabId },
                    function: extractElements
                },
                (results) => {
                    if (chrome.runtime.lastError) {
                        message.innerText = messges["FAILED_FETCH"]
                        return;
                    } else {

                    }

                    g_TabID = tabId;

                    if (results && results[0].result) {
                        conversation = results[0].result;

                        conversation.forEach((item, index) => {
                            const div = document.createElement('div');
                            div.innerHTML = `<input type="checkbox" id="chk${index}" name="chk${index}"  /><label for="chk${index}">${first50Letters(item.question)}</label> `;
                            checkBoxContainer.appendChild(div);
                        });

                    } else {

                    }
                }
            );
        }
    });


    downloadButton.addEventListener('click', () => {
        // Clear messages
        setStatus("CLEAR");

        // Check Selection
        const checked = document.querySelectorAll('input[type="checkbox"]:checked');
        if (checked.length == 0) {
            message.innerText = messges["NO_SELECTION"]
            return;
        } else {
            generatePdf(checked);
        }
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
                    message.innerText = messges["FAILED_FETCH"]
                    return;
                }

                let content = document.createElement('div')
                let cssClassQuery = "chat-query";
                let cssClassAnswer = "chat-answer";

                if (results && results[0].result) {
                    conversation = results[0].result;


                    conversation.forEach((item, index) => {
                        if (ids.includes(index)) {


                            let rawData = '';
                            if (item.question) {
                                rawData += `<div class=${cssClassQuery}>${item.question}</div>`

                            }
                            if (item.answer) {
                                rawData += `<div class=${cssClassAnswer}>${item.answer}</div>`;
                            }

                            const tempDiv = document.createElement('div');
                            tempDiv.innerHTML = rawData;

                            content.appendChild(tempDiv);
                        }
                    });
                    setStatus("CLEAR");
                    // remove icons, buttons, copy
                    content.querySelectorAll('input[type="checkbox"], button, svg, .md-code-block-banner').forEach(el => el.remove());
                    setStatus("DOWNLOADING")

                    const opt = {
                        margin: 1,
                        filename: `${g_FileName}.pdf`,
                        image: { type: 'jpeg', quality: 0.95 },
                        html2canvas: { scale: 2 },
                        enableLinks:true,
                        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
                        pagebreak: { mode: 'avoid-all', before: '#page2el' }
                    }

                    html2pdf().set(opt).from(content).save();

                    reset();
                }
            }
        );
    }
})
