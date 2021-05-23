from django.forms import ModelForm, Textarea, TextInput
from hopper.models import WorkSpace


class CodeForm(ModelForm):
	class Meta:
		model = WorkSpace
		fields = ['fixed_jumps', 'random_jumps', 'code_input']

		widgets = {
			"fixed_jumps": TextInput(attrs={
				'class': 'hopper-commands__action-btn',
				'type': 'button',
			}),
			"random_jumps": TextInput(attrs={
				'class': 'hopper-commands__action-btn',
				'type': 'button',
			}),
			"code_input": Textarea(attrs={
				'class': 'hopper-commands__input',
				'id': 'command-input',
				'placeholder': 'Писать код сюда...',
				'rows': '8',
			})
		}
