from django.urls import path
from . import views

urlpatterns = [
	path('', views.index, name='index'),
	path('session/<int:session_id>', views.session, name="current_session"),
	path('delete_session/<int:session_id>', views.delete_session, name="delete_session"),
	path('new_session', views.new_session, name="new_session"),
	path('save_session', views.save_session, name="save_session"),
	path('rules', views.rules, name="rules"),
]