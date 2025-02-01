document.addEventListener('DOMContentLoaded', () => {
    const messges = {
        "NO_SELECTION": "Please select questions and press Download.",
        "SUCCESSFUL": "PDF has been compiled successfully.",
        "DOWNLOAD": "PDF file is downloading",
        "CLEAR": ""
    };

    let fetchBtn = document.getElementById('fetchButton');
    let downloadButton = document.getElementById('downloadButton');
    let debug = document.getElementById('debugButton');
    let checkBoxContainer = document.getElementById('gen-selection');
    let message = document.getElementById('notify-user');
    let content = [];

    fetchBtn.addEventListener('click', () => {
        // Clear messages
        message.innerText = messges["CLEAR"]

        // remove children
        checkBoxContainer.innerHTML = '';
        let list = ["Item1", "item2", "item3", "Item4", "item5", "item6", "Item7", "item8", "item9", "Item10", "item11", "item12", "item6", "Item7", "item8", "item9", "Item10", "item11", "item12", "item3", "Item4", "item5", "item6", "Item7", "item8", "item9", "Item10", "item11", "item12", "item6", "Item7", "item8", "item9", "Item10", "item11", "item12"];
        let itemID = 1;
        for (const item in list) {
            const div = document.createElement('div');
            div.innerHTML = `<input type="checkbox" id="chk${itemID}" name="chk${itemID}"  /><label for="chk${itemID}">${item}</label> `;
            checkBoxContainer.appendChild(div);
            itemID++;
        }

    });


    downloadButton.addEventListener('click', () => {
        // Clear messages
        message.innerText = messges["CLEAR"]

        // Check Selection
        const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        if (checkboxes.length == 0) {
            message.innerText = messges["NO_SELECTION"]
            return;
        }

        // start 


    });

    // debug.addEventListener('click', () => {
    //     const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    //     if (checkboxes.length == 0) {
    //         message.innerText = messges["NO_SELECTION"]
    //         return;
    //     }

    //     console.log(checkboxes.length)

    // });



})
