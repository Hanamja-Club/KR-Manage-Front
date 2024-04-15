import {isEmpty} from "lodash";

export default {
    install: (app, {}) => {
        const ui = {
            alert : val => {
                // console.log("alert val : " + val)
                const modalDiv = document.createElement("div")
                modalDiv.innerHTML = `<div class="modal">
                                        <div class="modal-content">
                                            <h2>오류</h2>
                                                <p>${val}</p>
                                            <div class="modal-close">
                                                <p>확인</p>
                                            </div>
                                        </div>
                                    </div>`
                document.querySelector("#main_article").append(modalDiv)

                document.querySelector(".modal").style.display = "flex";

                const modalCloseButton = document.querySelector(".modal-close");
                modalCloseButton.addEventListener("click", function() {
                    document.querySelector(".modal").style.display = "none";
                });
            }
        }
        app.config.globalProperties.$ui = ui
        app.provide('$ui', ui)
    },
}