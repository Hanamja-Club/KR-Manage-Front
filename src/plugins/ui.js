import {isEmpty} from "lodash";

export default {
    install: (app, {}) => {
        const ui = {
            alert : val => {
                // console.log("alert val : " + val)
                const modalDiv = document.createElement("div")
                modalDiv.className += 'modal_div'
                modalDiv.innerHTML = `<div class="modal">
                                        <div class="modal-content">
                                            <h2>${val.title}</h2>
                                                <p>${val.content}</p>
                                            <div class="modal-close">
                                                <p>확인</p>
                                            </div>
                                        </div>
                                    </div>`
                document.querySelector("body").append(modalDiv)

                document.querySelector(".modal").style.display = "flex";

                const modalCloseButton = document.querySelector(".modal-close");
                modalCloseButton.addEventListener("click", function() {
                    document.querySelector(".modal").style.display = "none";
                    document.querySelector(".modal_div").remove()
                });
            }
        }
        app.config.globalProperties.$ui = ui
        app.provide('$ui', ui)
    },
}