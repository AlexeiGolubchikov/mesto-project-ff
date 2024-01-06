(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};function t(e){e.target.classList.toggle("element__like_active")}function n(e){e.querySelector(".element__like").addEventListener("click",t)}function o(e){e.target.closest(".element").remove()}function r(e){e.querySelector(".element__delete").addEventListener("click",o)}function c(e,t,n,o){var r=document.querySelector("#element-template").content.querySelector(".element").cloneNode(!0),c=r.querySelector(".element__image");return r.querySelector(".element__title").textContent=e.name,c.src=e.link,c.alt=e.name,b.prepend(r),n(r),t(r),c.addEventListener("click",(function(){o(e.name,e.link)})),r}function a(e){"Escape"===e.key&&u(document.querySelector(".popup_opened"))}function i(e){e.classList.add("popup_opened"),document.addEventListener("keydown",a)}function u(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",a)}e.d({},{_:()=>b});var s,l=function(e,t){e.disabled=!0,e.classList.add(t.inactiveButtonClass)},d=function(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?function(e,t){e.disabled=!1,e.classList.remove(t.inactiveButtonClass)}(t,n):l(t,n)},m={baseUrl:"https://nomoreparties.co/v1/wff-cohort-3",headers:{authorization:"dafd8395-e270-4f3d-a82a-91f90e632799","Content-Type":"application/json"}},p=document.querySelector(".profile__edit-button"),f=document.querySelector(".profile__add-button"),v=document.querySelector(".profile__avatar"),_=document.querySelector(".popup_type_edit"),y=document.querySelector(".popup_type_add"),S=document.querySelector(".popup_type_edit-avatar"),L=document.querySelector(".popup_type_image"),q=document.querySelector(".popup__caption"),C=document.querySelector(".popup__image"),E=document.querySelector(".profile__name"),h=document.querySelector(".profile__job"),b=document.querySelector(".elements"),k=document.forms.editProfile,g=document.forms.addCard,x=document.forms.editAvatar,j=x.elements.addLinkAvatar,A=k.elements.name,B=k.elements.job,P=g.elements.addTitleCard,w=g.elements.addLinkCard;function D(e,t){q.textContent=e,C.src=t,C.alt=e,i(L)}document.querySelectorAll(".popup").forEach((function(e){e.addEventListener("mouseup",(function(e){!function(e){(e.target.classList.contains("popup_opened")||e.target.classList.contains("popup__close"))&&u(e.currentTarget)}(e)}))})),p.addEventListener("click",(function(){i(_),A.value=E.textContent,B.value=h.textContent})),f.addEventListener("click",(function(){i(y)})),v.addEventListener("click",(function(){i(S)})),x.addEventListener("submit",(function(e){e.preventDefault(),document.querySelector(".profile__avatar").src=j.value,u(S),x.reset()})),k.addEventListener("submit",(function(e){e.preventDefault(),E.textContent=A.value,h.textContent=B.value,u(_)})),g.addEventListener("submit",(function(e){e.preventDefault(),c({name:P.value,link:w.value},r,n,D),u(y),g.reset()})),s={formSelector:".form",inputSelector:".form__field",submitButtonSelector:".form__button",inactiveButtonClass:"form__button_inactive",inputErrorClass:"form__field_type_error",errorClass:"input-error_active"},Array.from(document.querySelectorAll(s.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=e.querySelector(t.submitButtonSelector),o=Array.from(e.querySelectorAll(t.inputSelector));o.forEach((function(r){r.addEventListener("input",(function(){d(o,n,t),function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?function(e,t,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),o.classList.remove(n.ErrorClass),o.textContent=""}(e,t,n):function(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.add(n.inputErrorClass),r.classList.add(n.ErrorClass),r.textContent=o}(e,t,n,t.validationMessage)}(e,r,t)}))})),d(o,n,t),e.addEventListener("reset",(function(){l(n,t)}))}(e,s)})),fetch("".concat(m.baseUrl,"/users/me"),{headers:m.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(e){v.src=e.avatar,E.textContent=e.name,h.textContent=e.about})).catch((function(e){console.log(e)})),fetch("".concat(m.baseUrl,"/cards"),{headers:m.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(e){e.forEach((function(e){var t=c(e,r,n,D);b.append(t)}))})).catch((function(e){console.log(e)}))})();