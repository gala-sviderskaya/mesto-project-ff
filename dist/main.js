(()=>{"use strict";var e=document.querySelector("#card-template").content;function t(e){e.remove()}function n(e){e.classList.toggle("card__like-button_is-active")}function o(t,n,o,r){var c=e.querySelector(".places__item").cloneNode(!0),p=c.querySelector(".card__image");p.src=t.link,p.alt=t.name,c.querySelector(".card__title").textContent=t.name;var u=c.querySelector(".card__delete-button"),s=c.querySelector(".card__like-button");return u.addEventListener("click",(function(){n(c)})),s.addEventListener("click",(function(){o(s)})),p.addEventListener("click",(function(){r(t)})),c}function r(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&t.classList.remove("popup_is-opened")}}function c(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",r)}function p(e){e.target.closest(".popup")&&e.target.classList.contains("popup_is-opened")&&e.target.classList.remove("popup_is-opened")}function u(e){var t=e.target.closest(".popup");(t||"submit"===e.type)&&(t.classList.remove("popup_is-opened"),document.removeEventListener("keydown",r))}var s=document.querySelectorAll(".popup"),a=document.querySelector(".popup_type_edit"),i=document.querySelector(".profile__edit-button"),d=document.querySelector(".profile__add-button"),l=document.forms["edit-profile"],m=document.querySelector(".profile__title"),_=document.querySelector(".profile__description"),v=document.querySelector(".popup_type_new-card"),y=document.querySelectorAll(".popup__close"),f=document.querySelector(".places__list"),k=document.querySelector(".popup_type_image"),q=k.querySelector(".popup__image"),S=k.querySelector(".popup__caption"),L=document.querySelector('[name="new-place"]'),g=document.querySelector(".popup__input_type_card-name"),E=document.querySelector(".popup__input_type_url");function h(e){q.src=e.link,q.alt=e.name,S.textContent=e.name,c(k)}[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){var r=o(e,t,n,h);f.append(r)})),s.forEach((function(e){e.addEventListener("click",p)})),i.addEventListener("click",(function(){c(a),l.elements.name.value=m.textContent,l.elements.description.value=_.textContent})),d.addEventListener("click",(function(){c(v)})),y.forEach((function(e){e.addEventListener("click",u)})),l.addEventListener("submit",(function(e){e.preventDefault(),m.textContent=l.elements.name.value,_.textContent=l.elements.description.value,u(e)})),L.addEventListener("submit",(function(e){e.preventDefault();var r=o({name:g.value,link:E.value},t,n,h);f.prepend(r),L.reset(),u(e)}))})();