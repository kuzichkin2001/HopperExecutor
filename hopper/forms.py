from django import forms

class CodeForm(forms.Form):
	fixed_step_button = forms.Button(title='Фиксированный шаг')
	any_step_button = forms.Button(title='Произвольный шаг')
	code_input = forms.Textarea(label='Напишите код программы', name=form_name)
