Vamos a usar App.js para alojar dos componentes:
- Form y resultado que está siempre visible
- PopupForm que aparece cuando App.js sabe que ya se validó el primer componente

Lo sabemos mediante un callback del onSubmit de cada form dentro de cada componente.
Popupform debe de entrar con un loader que tarde tiempo como si pensara. 
El onSubmit del Popup Form se lleva la data al CRM. 