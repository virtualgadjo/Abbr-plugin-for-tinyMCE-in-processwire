tinymce.PluginManager.add('abbr', (editor, url) => {
	const openDialog = () => editor.windowManager.open({
		title: 'abbr plugin',
		body: {
			type: 'panel',
			items: [
				{
					type: 'input',
					name: 'fulltxt',
					label: 'full definition'
				}
			]
		},
		buttons: [
			{
				type: 'cancel',
				text: 'Close'
			},
			{
				type: 'submit',
				text: 'Save',
				buttonType: 'primary'
			}
		],
		onSubmit: (api) => {
			const data = api.getData();
			let cnt = editor.selection.getContent({format: 'html'});
			// add a title attribute if the input is not empty
			if(data.fulltxt != '') {
				editor.insertContent(`<abbr title="${data.fulltxt}">${cnt}</abbr>`);
			}
			// else just wrap the selected text with abbr tag
			else {
				editor.insertContent(`<abbr>${cnt}</abbr>`);
			}
			api.close();
		}
	});
	// open the dialog with the button
	editor.ui.registry.addButton('abbr', {
		text: 'Abbr',
		onAction: () => {
			openDialog();
		}
	});
	// metadata
	return {
		getMetadata: () => ({ name: 'Abbr' })
	};
});
