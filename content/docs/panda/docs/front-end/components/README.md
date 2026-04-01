# Components

## Modal

__Requires__

`/public/scripts/modal.js`

__Pug Structure__

```pug
div.modal#sample-modal
	div.card
		span.close(onclick="closeModal('modal')")
			i.fas.fa-times-circle
		//- modal content here
```

__Calling__

```javascript
showModal("sample-modal") // open modal
closeModal("sample-modal") // close modal
```
